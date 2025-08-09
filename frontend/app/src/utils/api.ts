import { setToken } from "./auth.js";

export async function handleRequest<T>(
  url: string,
  method: string = "GET",
  token?: string | null,
  body?: any
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

    const json = await response.json();

    if (!response.ok) {
      // Throwing error here is crucial for React Query to catch it
      throw new Error(json?.error || json.statusText || "Request failed");
    }

    return json;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}
