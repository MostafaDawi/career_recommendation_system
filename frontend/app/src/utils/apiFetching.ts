import { getToken } from "./auth.js";
import { handleRequest } from "./api.js";

let api_url: string = null;

if (import.meta.env.ENV === "Development") {
  api_url = "http://localhost:8000";
} else {
  api_url = import.meta.env.VITE_API_GATEWAY_URL;
}

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

export async function fetchRecommendations(): Promise<JobList | []> {
  console.log("API URL: ", api_url);
  const token = getToken();
  return handleRequest<JobList | []>(`${api_url}/recommend/me`, "GET", token);
}
