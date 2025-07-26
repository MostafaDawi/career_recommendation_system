import pandas as pd
import io

REQUIRED_COLUMNS = {"title", "description", "salary", "location", "tags"}

def parse_csv(file_content: bytes):
    # Decode bytes and load into DataFrame
    csv_data = file_content.decode("utf-8")
    df = pd.read_csv(io.StringIO(csv_data))

    # Strip column names and lower them
    df.columns = [col.strip() for col in df.columns]

    # Check for required columns
    if not REQUIRED_COLUMNS.issubset(set(df.columns)):
        raise ValueError(f"CSV is missing one or more required columns: {REQUIRED_COLUMNS}")

    # Clean and transform each row
    jobs = []
    for _, row in df.iterrows():
        job = {
            "title": str(row["title"]).strip(),
            "description": str(row["description"]).strip(),
            "salary": int(row["salary"]),
            "location": str(row["location"]).strip(),
            "tags": [tag.strip() for tag in str(row["tags"]).split(",") if tag.strip()]
        }
        jobs.append(job)

    return jobs