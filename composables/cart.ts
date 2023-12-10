export const useCart = () => {
  const { baseURL } = useRuntimeConfig().public;

  function create() {
    return useFetch<{
      message: string;
      data: {
        id: string;
      };
    }>("/cart", {
      method: "POST",
      baseURL,
    });
  }

  return {
    create,
  };
};
