export default defineStore("cart", () => {
  const cartId = ref("");

  const { create } = useCart();

  async function addProductToCart(
    productId: string,
    quantity: number,
    sizeId: string,
    colorId: string
  ) {
    if (!cartId.value) {
      const { data } = await create();
      cartId.value = data.value?.data.id ?? "";
    } else if (cartId) {
    }
  }

  return {
    cartId,
    addProductToCart,
  };
});
