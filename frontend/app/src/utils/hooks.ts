import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleRequest } from "./api.js";
import { clearToken, getToken, setToken } from "./auth.js";

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    access_token: string;
    token_type: string;
  };
  status_code: number;
}

interface UserResponse {
  data: object;
  status_code: number;
}

export function useAuth() {
  const queryClient = useQueryClient();

  // Login
  const loginMutation = useMutation({
    mutationFn: (user_input: LoginInput) =>
      handleRequest<LoginResponse>(
        "http://localhost:8000/auth/login",
        "POST",
        undefined,
        user_input
      ),
    onSuccess: (response) => {
      const token = response?.data.access_token;
      setToken(token);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  // Fetch authenticated user
  const userQuery = useQuery<UserResponse>({
    queryKey: ["me"],
    queryFn: () =>
      handleRequest<UserResponse>(
        "http://localhost:8000/auth/me",
        "GET",
        getToken()
      ),
    enabled: !!getToken(),
  });

  // Logs user out
  const logout = () => {
    clearToken();
    queryClient.clear();
  };

  return {
    user: userQuery.data?.data,
    isLoading: userQuery.isLoading,
    login: loginMutation.mutate,
    loginError: loginMutation.error,
    logout,
    isAuthenticated: !!userQuery.data,
  };
}
