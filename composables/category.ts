export const useCategory = () => {
  const { baseURL } = useRuntimeConfig().public;

  function getMenWomenCategories() {
    return useFetch<{
      data: {
        name: string;
        featured: {
          id: string;
          name: string;
          slug: string;
          description: string;
          imageUrl: string;
        }[];
      }[];
      message: string;
    }>("/categories/men_women", {
      baseURL,
    });
  }

  function getAll() {
    return useFetch<{
      data: {
        id: string;
        name: string;
        slug: string;
        description: string;
        imageUrl: string;
      }[];
      message: string;
    }>("/categories", {
      baseURL,
    });
  }

  return {
    getMenWomenCategories,
    getAll,
  };
};
