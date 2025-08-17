# CareerCompassAI
![CareerCompassAI](documentation/main_page.png)
## Overview

CareerCompassAI is an AI-Powered Career Recommendation System to match students, fresh grads and freelancers to jobs according to their interests, skills, and personality.

## Why we built this platform 
Most students graduate from high school without knowing what to study at university. They consult family and friends and often choose a major according to external factors, not according to what aligns with their personality traits, skills, and motivation. For university students, many get stuck in a major they don’t feel passionate about, and find themselves lost after graduation, unsure about what career path to pursue and what suits them.
For these reasons, we created CareerCompassAI: a career guidance platform that uses artificial intelligence to provide personalized career recommendations tailored to individual personality traits, skills, and interests. By analyzing user inputs and matching them with comprehensive career data through advanced embedding techniques, CareerCompassAI aims to help users make informed decisions about their academic and professional futures.

## Key Features
- AI-powered career recommendations based on personality and skills 
- Job listings with descriptions and key skills required 
- High accuracy with embedding similarity  
- Interactive chatbot for FAQs  
- Responsive user interface  
- Editable user profile 

## Tech Stack
- Python 3.11, FastAPI
- Qdrant (vector DB)
- Postgres 16/17 
- React (19.1.0), Tailwind CSS (Vite application)
- Docker and Docker Compose 

## Prerequisites
- Docker & Docker Compose
- Node 18+ (if running frontend locally)
- Python 3.11+ (if running services without Docker)


## Repository structure
- /backend: contains all the backend code including a folder for each microservice
    - api_gateway
    - chatbot
    - embedding_service
    - job_service
    - recommendation_service
    - user_service
    - vectordb_service

- /frontend: contains all the frontend code written in React, including assets, components, layouts, and pages
- /initdb: contains the sql code to create the databases for the user service and the job service
- docker-compose.yml : to run everything together from one container

# Getting Started 

## Prerequisites
- Docker & Docker Compose
- Node 18+ (if running frontend locally)
- Python 3.11+ (if running services without Docker)


## Run with Docker 

```bash
docker compose up --build
```

After that, the services will be reachable locally at the ports listed in the table below.

## Run a single service example

```bash
# Run the user service directly (dev mode)
cd backend/user_service
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

## Services 
| Service | Local port | Purpose | Notes |
|---|---:|---|---|
| postgres | 5432 | Relational DB | image: postgres:16; envs: POSTGRES_USER=user, POSTGRES_PASSWORD=password; volume: backend_pgdata (external)
| qdrant | 6333 | Vector DB | image: qdrant/qdrant; volume: backend_qdrant_data (external)
| api_gateway | 8000 | API gateway | Uvicorn command in compose
| user_service | 8001 | Users CRUD | env: DATABASE_URL=postgresql+asyncpg://user:password@postgres:5432/user_service_db
| recommendation_service | 8002 | Recommendations | depends_on embedding_service & vectordb_service
| embedding_service | 8003 | Embedding generation | exposes port 8003
| job_service | 8004 | Jobs CRUD | env: DATABASE_URL=postgresql+asyncpg://user:password@postgres:5432/job_service_db
| vectordb_service | 8005 | Qdrant adapter | depends_on qdrant
| chatbot_service | 8006 | Chatbot | Uvicorn command in compose



## Documentation

For more details about system design, dataset, architecture, and team: [Full Project Documentation](/documentation/project_documentation)

### Contributors
![Contributors](documentation/contrib.png)
