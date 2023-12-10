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

  return {
    create,
  };
};
