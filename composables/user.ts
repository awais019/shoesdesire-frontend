type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
};

import useUserStore from "~/stores/user";

export const useUser = () => {
  const { baseURL } = useRuntimeConfig().public;

  function create(user: User) {
    return useFetch<{
      message: string;
    }>("/user", {
      method: "POST",
      baseURL,
      body: user,
    });
  }

  function verifyEmail(token: string) {
    return $fetch<{ message: string }>(`/user/verify/?token=${token}`, {
      method: "POST",
      baseURL,
    });
  }

  function signIn(email: string, password: string) {
    return useFetch<{
      message: string;
      data: {
        token: string;
      };
    }>("/auth/signin", {
      method: "POST",
      baseURL,
      body: {
        email,
        password,
      },
    });
  }

  function me() {
    const token = useUserStore().token;
    return useFetch<{
      message: string;
      data: { id: string; firstName: string; lastName: string; email: string };
    }>("/auth/me", {
      headers: {
        "x-auth-token": token || "",
      },
      baseURL,
    });
  }

  return {
    create,
    verifyEmail,
    signIn,
    me,
  };
};
