# Use official Python image
FROM python:3.10.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create working directory
WORKDIR /app

# Install dependencies
COPY ./requirements.txt /app/
RUN pip install --upgrade pip \
 && pip install -r requirements.txt

# Copy the rest of the application code
COPY . /app

# Expose port (match Docker Compose)
EXPOSE 8001

# Start FastAPI app with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
