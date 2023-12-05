export const useSizeColor = () => {
  const { baseURL } = useRuntimeConfig().public;

  function getSizes() {
    return useFetch<{
      data: { id: string; size: number }[];
      message: string;
    }>("/size", {
      baseURL,
    });
  }

  function getColors() {
    return useFetch<{
      data: { id: string; name: string; hex: string }[];
      message: string;
    }>("/color", {
      baseURL,
    });
  }

  return { getSizes, getColors };
};
