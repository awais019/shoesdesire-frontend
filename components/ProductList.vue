<script lang="ts" setup>
  const { data } = useProduct().getAll();

  const products = computed(() =>
    data.value?.data.map((product) => {
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
  );
</script>

<template>
  <section
    aria-labelledby="product-heading"
    class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
  >
    <h2 id="product-heading" class="sr-only">Products</h2>

    <div
      class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3"
    >
      <Product
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<style scoped></style>
