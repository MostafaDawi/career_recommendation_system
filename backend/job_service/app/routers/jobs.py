from fastapi import APIRouter, Body, Depends, HTTPException, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import Job
from app.schemas import JobCreate, JobOut, JobOutEmbedded
from app.database import get_db
from app.services import store_in_vectordb, embedding_service
from app.utils.csv_parser import parse_csv
from typing import List
import json

router = APIRouter( prefix="/jobs", tags=["jobs"])

@router.post("/upload")
async def upload_jobs(file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
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

            result = await embedding_service.send_to_embedding_service(job)
            created_jobs.append({"jobId": str(job.id), "embedding":result.get("embedding")})

        return {"message": f"{len(created_jobs)} jobs uploaded", "job_ids": created_jobs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/create_job")
async def upload_jobs_json(job: JobCreate, db: AsyncSession = Depends(get_db)):
    try:
        job_obj = Job(**job.model_dump())
        
        db.add(job_obj)
        await db.commit()
        await db.refresh(job_obj)

        print("HERE_-------------------")
        # Optionally call embedding service
        result = await embedding_service.send_to_embedding_service(job_obj)
        embedding = result.get("embedding")

        # Create the response dict manually
        job_dict = JobOut.model_validate(job_obj).model_dump()
        job_dict["embedding"] = embedding
        job_dict["id"] = str(job_dict["id"])
        # ===== TO BE ADDED WHEN VECTOR DB IS READY =====
        try:
            res = await store_in_vectordb.send_to_vectordb_service(job_dict)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

        return {"message":"Stored in Postgres and Vector DBs successfully!", "job":JobOutEmbedded(**job_dict)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[JobOut])
async def get_jobs(page: int = 1, limit: int = 10, db: AsyncSession = Depends(get_db)):
    try:
        offset = (page - 1) * limit
        result = await db.execute(select(Job).offset(offset).limit(limit))
        jobs = result.scalars().all()  # Correct way to get list of Job instances
        return jobs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))