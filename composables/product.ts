type ProductAll = {
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

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: {
    id: string;
    url: string;
  }[];
  sizes: {
    id: string;
    size: number;
  }[];
  colors: {
    id: string;
    name: string;
    hex: string;
  }[];
};

export const useProduct = () => {
  const { baseURL } = useRuntimeConfig().public;

  function getAll(category?: string, color?: string, size?: string) {
    return useFetch<{
      data: ProductAll[];
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

  function getById(id: string) {
    return useFetch<{
      data: Product;
      message: string;
    }>(`/products/${id}`, {
      baseURL,
    });
  }

  return {
    getAll,
    getById,
  };
};
