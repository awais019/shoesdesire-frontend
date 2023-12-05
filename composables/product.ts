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

  function getAll(category?: string, color?: string, size?: string) {
    return useFetch<{
      data: Product[];
      message: string;
    }>("/products", {
      baseURL,
      query: {
        ...(category && { category }),
        ...(color && { color }),
        ...(size && { size }),
      },
    });
  }

  return {
    getAll,
  };
};
