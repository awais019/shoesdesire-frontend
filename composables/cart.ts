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

  return {
    create,
    addToCart,
  };
};
