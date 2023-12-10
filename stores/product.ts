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

export default defineStore("product", () => {
  const products = ref<ProductAll[]>([]);

  async function getProducts(
    category?: string,
    color?: string,
    size?: string,
    q?: string
  ) {
    const { data } = await useProduct().getAll(category, color, size, q);
    products.value = data.value?.data ?? [];
  }

  return {
    products: computed(() =>
      products.value.map((product) => {
        return {
          id: product.id,
          name: product.name,
          href: `/products/${product.id}`,
          price: product.price,
          description: product.description,
          imageSrc: product.images[0],
          imageAlt: product.name,
          options: `${product.colorsAvailable} colors, ${product.sizesAvailable} sizes`,
        };
      })
    ),
    getProducts,
  };
});
