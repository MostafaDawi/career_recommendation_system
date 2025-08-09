# Use official Python image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY ./requirements.txt /app/
RUN pip install --upgrade pip

# Install torch separately to avoid conflicts (important)
RUN pip install torch==2.2.0+cpu --index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir numpy==1.24.4

# Now install remaining packages
RUN pip install --no-cache-dir -r requirements.txt

# Preload model (download once at build time)
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

# Copy rest of the application
COPY . /app

# Expose port
EXPOSE 8006

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8006", "--log-level", "info"]