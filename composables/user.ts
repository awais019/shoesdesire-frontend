type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
};

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
    return $fetch<{
      message: string;
      token: string;
    }>("/auth/signin", {
      method: "POST",
      baseURL,
      body: {
        email,
        password,
      },
    });
  }

  return {
    create,
    verifyEmail,
    signIn,
  };
};
