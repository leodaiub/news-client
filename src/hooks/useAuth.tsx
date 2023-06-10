import useSWR from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/services";
import { useToast } from "@chakra-ui/react";
import { shallow } from "zustand/shallow";
import { useStore } from "@/store";

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: {
  middleware?: any;
  redirectIfAuthenticated?: string;
}) => {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [updateCategories, updateSources] = useStore(
    (state) => [state.updateCategories, state.updateSources],
    shallow
  );

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/user", () =>
    axiosInstance
      .get("/api/user")
      .then((res) => {
        updateCategories(res.data.preferences?.categories.split(","));
        updateSources(res.data.preferences?.sources.split(","));
        return res.data;
      })
      .catch((error) => {
        if (error.response?.status !== 409) throw error;
      })
  );

  const csrf = () => axiosInstance.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }: any) => {
    setLoading(true);
    await csrf();

    setErrors([]);

    axiosInstance
      .post("/register", props)
      .then(() => {
        mutate();
        router.push("/");
      })
      .catch((error) => {
        if (error.response?.status !== 422)
          toast({
            description: error.response.data.message,
            status: "error",
          });

        setErrors(error.response.data.errors);
      })
      .finally(() => setLoading(false));
  };

  const login = async ({ setErrors, ...props }: any) => {
    setLoading(true);
    await csrf();

    setErrors([]);

    axiosInstance
      .post("/login", props)
      .then(() => {
        mutate();
        router.push("/");
      })
      .catch((error) => {
        if (error.response?.status !== 422)
          toast({
            description: error.response.data.message,
            status: "error",
          });

        setErrors(error.response.data.errors);
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    if (!error) {
      await axiosInstance.post("/logout").then(() => mutate());
    }
    window.location.pathname = "/login";
  };

  const updateUserPreferences = async ({ setErrors, ...props }: any) => {
    setLoading(true);
    await csrf();

    setErrors([]);

    axiosInstance
      .post("/api/user/preferences", props)
      .then(() => {
        mutate();
        toast({
          description: "Preferences saved",
          status: "success",
        });
      })
      .catch((error) => {
        if (error.response?.status !== 422)
          toast({
            description: error.response.data.message,
            status: "error",
          });

        setErrors(error.response.data.errors);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error]);

  return {
    user,
    register,
    login,
    updateUserPreferences,
    logout,
    userLoading: isLoading,
    loading,
  };
};

export default useAuth;
