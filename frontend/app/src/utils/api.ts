import { setToken } from "./auth.js";

export async function handleRequest<T>(
  url: string,
  method: string = "GET",
  token?: string | null,
  body?: any | null
): Promise<T> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      // Throwing error here is crucial for React Query to catch it
      const errorString = await response.json();
      const error = JSON.parse(errorString?.detail);
      console.log("Json error: ", error.detail);
      throw new Error(error.detail || "Request failed");
    }

    const data: T = await response.json();
    console.log("returned data from handleRequest: ", data);
    return data;
  } catch (error) {
    console.error("Error: ", error?.message);
    throw error;
  }
}
