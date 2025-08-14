import { getToken } from "./auth.js";
import { handleRequest } from "./api.js";

interface userInfo {
  id: number;
  name: string;
  email: string;
  skills: Array<string>;
  interests: Array<string>;
  description: string;
  personality: Record<string, any>;
}

interface JobModel {
  id: any;
  job_title: string;
  company: string;
  location: string;
  score: number;
  tags: Array<string>;
}

interface JobList {
  data: JobModel[];
  status_code: number;
}

export async function fetchRecommendations(): Promise<JobList> {
  const token = getToken();
  return handleRequest<JobList>(
    "http://localhost:8000/recommend/me",
    "GET",
    token
  );
}
