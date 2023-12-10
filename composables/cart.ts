type Cart = {
  id: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  CartItem: CartItem[];
};

type CartItem = {
  quantity: number;
  Product: {
    name: string;
    price: number;
    Images: { url: string }[];
  };
  Size: {
    size: number;
  };
  Color: {
    name: string;
    hex: string;
  };
};

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

  function addToCart(
    cartId: string,
    productId: string,
    quantity: number,
    sizeId: string,
    colorId: string
  ) {
    return useFetch(`/cart/${cartId}`, {
      method: "PUT",
      baseURL,
      body: {
        productId,
        quantity,
        sizeId,
        colorId,
      },
    });
  }

  function get(cartId: string) {
    return useFetch<{
      message: string;
      data: Cart;
    }>(`/cart/${cartId}`, {
      baseURL,
    });
  }

  return {
    create,
    addToCart,
    get,
  };
};
