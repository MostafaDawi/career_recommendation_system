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
  title: string;
  company: string;
  location: string;
  score: number;
}

interface JobList {
  data: JobModel[];
}

export async function fetchRecommendations(
  user: userInfo
): Promise<JobList | null> {
  const token = getToken();
  if (
    user?.description &&
    user?.interests &&
    user?.personality &&
    user?.skills
  ) {
    return handleRequest<JobList>(
      "http://localhost:8000/recommend/me",
      "POST",
      token,
      user
    );
  } else {
    return null;
  }
}
