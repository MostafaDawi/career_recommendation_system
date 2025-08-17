import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleRequest } from "./api.js";
import { clearToken, getToken, setToken } from "./auth.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let api_url: string = null;

if (import.meta.env.ENV === "Development") {
  api_url = "http://localhost:8000";
} else {
  api_url = import.meta.env.VITE_API_GATEWAY_URL;
}

interface LoginInput {
  email: string;
  password: string;
}

interface PasswordInput {
  oldPassword: string;
  newPassword: string;
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
  status_code: number;
}

interface RegisterResponse {
  data: {
    message: string;
  };
  status_code: number;
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

interface JobInput {
  title: string;
  description: string;
  salary: number;
  location: string;
  tags: Array<string>;
  jobType: string;
  companyName: string;
  contactEmail: string;
}

interface UserResponse {
  data: userInfo;
  statuse_code: number;
}

interface JobModel extends JobInput {
  id: any;
}

interface JobList {
  data: JobModel[];
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
        `${api_url}/auth/login`,
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
        `${api_url}/auth/register`,
        "POST",
        undefined,
        user_input
      ),
    onSuccess: (response) => {
      toast.success("Registered Successfully!", { autoClose: 5000 });
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(`Registration failed: ${error}`, {
        autoClose: 5000,
      });
    },
  });

  // Fetch authenticated user
  const userQuery = useQuery<UserResponse>({
    queryKey: ["me"],
    queryFn: () =>
      handleRequest<UserResponse>(`${api_url}/auth/me`, "GET", getToken()),
    enabled: !!getToken(),
  });

  // Update user profile
  const updateProfileMutation = useMutation({
    mutationFn: (user_input: UserProfileInput | null) =>
      handleRequest<UserResponse>(
        `${api_url}/user/me`,
        "PUT",
        getToken(),
        user_input
      ),
    onSuccess: (response: UserResponse) => {
      console.log(response);
      toast.success("User profile was updated successfully!", {
        autoClose: 5000,
      });
    },
    onError: (error: any) => {
      toast.error(`User profile update failed: ${error?.message}`, {
        autoClose: 5000,
      });
    },
  });

  // Update user password
  const updatePassword = useMutation({
    mutationFn: (user_input: PasswordInput | null) =>
      handleRequest<UserResponse>(
        `${api_url}/user/change_password`,
        "PUT",
        getToken(),
        user_input
      ),
    onSuccess: (response: UserResponse) => {
      console.log(response);
      toast.success("User password was updated successfully!", {
        autoClose: 5000,
      });
    },
    onError: (error: any) => {
      toast.error(`${error?.message}`, {
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
    loginLoading: loginMutation.isPending,
    updatePass: updatePassword.mutate,
    updatePassError: updatePassword.error,
    isPendingPass: updatePassword.isPending,
    logout,
    register: registerMutation.mutate,
    registerError: registerMutation.error,
    registerLoading: registerMutation.isPending,
    updateUser: updateProfileMutation.mutate,
    updateUserError: updateProfileMutation.error,
    isAuthenticated: !!userQuery.data,
  };
}

export function useJobs() {
  // Fetch authenticated user
  const jobQuery = useQuery<JobList>({
    queryKey: ["jobs"],
    queryFn: () =>
      handleRequest<JobList>(
        `${api_url}/jobs/available_jobs`,
        "GET",
        undefined,
        null
      ),
  });

  // Register
  const createJobMutation = useMutation({
    mutationFn: (job_input: JobInput) =>
      handleRequest<JobModel>(
        `${api_url}/jobs/create`,
        "POST",
        getToken(),
        job_input
      ),
    onSuccess: (response) => {
      toast.success("New Job Added Successfully!", { autoClose: 5000 });
    },
    onError: (error: any) => {
      toast.error(`Job Insertion failed: ${error}`, {
        autoClose: 5000,
      });
    },
  });

  return {
    jobs: jobQuery.data?.data,
    jobsError: jobQuery.error,
    isLoadingJobs: jobQuery.isLoading,
    createJob: createJobMutation.mutate,
    createJobError: createJobMutation.error,
  };
}
