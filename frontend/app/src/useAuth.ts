import { useState, useEffect } from "react";
import { getToken } from "../utils/auth";

interface User {
  name: string;
  // خصائص أخرى حسب بياناتك
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      setUser({ name: "User Demo" }); // بدون خطأ الآن
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  return { isAuthenticated, user };
}

