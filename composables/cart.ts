type Cart = {
  id: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  CartItem: CartItem[];
};

type CartItem = {
  id: string;
  quantity: number;
  Product: {
    id: string;
    name: string;
    price: number;
    Images: { url: string }[];
  };
  Size: {
    id: string;
    size: number;
  };
  Color: {
    id: string;
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

  function removeCartItem(cartId: string, cartItemId: string) {
    return useFetch(`/cart/${cartId}/items/${cartItemId}`, {
      method: "DELETE",
      baseURL,
    });
  }

  return {
    create,
    addToCart,
    get,
    removeCartItem,
  };
};
