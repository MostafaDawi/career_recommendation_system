from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.models import Job
from app.schemas import JobCreate, JobOut
from app.database import get_db
from app.services.embedding import send_to_embedding_service
from app.utils.csv_parser import parse_csv
from typing import List
import json

router = APIRouter()

@router.post("/upload")
async def upload_jobs(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        if file.content_type == "text/csv":
            jobs_data = parse_csv(await file.read())  # Returns list[dict]
        elif file.content_type == "application/json":
            body = await file.read()
            jobs_data = json.loads(body)  # Safe parsing

            # If wrapped in {"jobs": [...]}, unwrap it
            if isinstance(jobs_data, dict) and "jobs" in jobs_data:
                jobs_data = jobs_data["jobs"]
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        created_jobs = []

        for job_dict in jobs_data:
            job_data = JobCreate(**job_dict)  # Validate input
            job = Job(**job_data.model_dump())
            db.add(job)
            db.commit()
            db.refresh(job)

            await send_to_embedding_service(job)
            created_jobs.append(str(job.id))

        return {"message": f"{len(created_jobs)} jobs uploaded", "job_ids": created_jobs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[JobOut])
async def get_jobs(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    try:
        offset = (page - 1) * limit
        jobs = db.query(Job).offset(offset).limit(limit).all()
        return jobs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))