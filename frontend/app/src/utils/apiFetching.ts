import { getToken } from "./auth";
import { handleRequest } from "./api";

export async function fetchRecommendations(skills, interests, personality, description) {
  const token = getToken();
  const body = {
    skills,
    interests,
    personality,
    description
  };

  return handleRequest(
    "http://localhost:8000/recommend/me",
    "GET",
    token
  );
}
