export function setToken(token: string | undefined) {
  if (token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
}

export function clearToken() {
  localStorage.removeItem("access_token");
}
