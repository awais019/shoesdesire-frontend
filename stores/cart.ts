export default defineStore("cart", () => {
  const cartId = ref("");

  const { create, addToCart } = useCart();

  async function addProductToCart(
    productId: string,
    quantity: number,
    sizeId: string,
    colorId: string
  ) {
    if (!cartId.value) {
      const { data } = await create();
      cartId.value = data.value?.data.id ?? "";
      const { data: cart } = await addToCart(
        cartId.value,
        productId,
        quantity,
        sizeId,
        colorId
      );
      console.log(cart.value);
    } else if (cartId) {
      const { data: cart } = await addToCart(
        cartId.value,
        productId,
        quantity,
        sizeId,
        colorId
      );
      console.log(cart.value);
    }
  }

  return {
    cartId,
    addProductToCart,
  };
});
