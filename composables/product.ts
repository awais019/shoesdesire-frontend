type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  totalCategories: number;
  colorsAvailable: string[];
  sizesAvailable: number[];
};

export const useProduct = () => {
  const { baseURL } = useRuntimeConfig().public;

  function getAll() {
    return useFetch<{
      data: Product[];
      message: string;
    }>("/products", {
      baseURL,
    });
  }

  return {
    getAll,
  };
};
