import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleRequest } from "./api.js";
import { clearToken, getToken, setToken } from "./auth.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    access_token: string;
    token_type: string;
  };
}

interface RegisterResponse {
  data: {
    message: string;
  };
}

interface UserResponse {
  data: object;
  status_code: number;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      console.log(response);
      const token = response?.data?.access_token;
      if (token) {
        setToken(token);
        queryClient.invalidateQueries({ queryKey: ["me"] });
        toast.success("Logged in Successfully!", { autoClose: 5000 });
        navigate("/"); // redirect only if token set
      } else {
        toast.error("Login failed: No token received.", { autoClose: 5000 });
      }
    },
    onError: (error: any) => {
      toast.error(`Login failed: ${error.message}`, { autoClose: 5000 });
    },
  });

  // Register
  const registerMutation = useMutation({
    mutationFn: (user_input: RegisterInput) =>
      handleRequest<RegisterResponse>(
        "http://localhost:8000/auth/register",
        "POST",
        undefined,
        user_input
      ),
    onSuccess: (response) => {
      toast.success("Registered Successfully!", { autoClose: 5000 });
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(`Registration failed: ${error?.detail}`, {
        autoClose: 5000,
      });
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
    toast.info("Logged out", { autoClose: 3000 });
    navigate("/");
  };

  return {
    user: userQuery.data?.data,
    isLoading: userQuery.isLoading,
    login: loginMutation.mutate,
    loginError: loginMutation.error,
    logout,
    register: registerMutation.mutate,
    registerError: registerMutation.error,
    isAuthenticated: !!userQuery.data,
  };
}
