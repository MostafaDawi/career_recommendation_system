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

interface userInfo {
  id: any;
  name: string;
  email: string;
  skills: Array<string>;
  interests: Array<string>;
  description: string;
  personality: Record<string, any>;
}

interface UserResponse {
  data: userInfo;
  status_code: number;
}

interface UserProfileInput {
  skills: Array<string>;
  interests: Array<string>;
  description: string;
  personality: Record<string, any>;
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

  // Update user profile
  const updateProfileMutation = useMutation({
    mutationFn: (user_input: UserProfileInput | null) =>
      handleRequest<UserResponse>(
        "http://localhost:8000/user/me",
        "PUT",
        getToken(),
        user_input
      ),
    onSuccess: (response: UserResponse) => {
      toast.success(
        `User profile was updated successfully! Data: ${response?.data?.email}`,
        {
          autoClose: 5000,
        }
      );
    },
    onError: (error: any) => {
      toast.error(`User profile update failed: ${error?.detail}`, {
        autoClose: 5000,
      });
    },
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
    updateUser: updateProfileMutation.mutate,
    updateUserError: updateProfileMutation.error,
    isAuthenticated: !!userQuery.data,
  };
}
