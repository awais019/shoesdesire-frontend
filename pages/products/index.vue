<template>
  <div class="bg-white">
    <LazyMobileFilters
      :filters="filters"
      :mobile-filters-open="mobileFiltersOpen"
      @update:mobile-filters-open="mobileFiltersOpen = $event"
    />
    <main class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
      <div class="border-b border-gray-200 pb-10 pt-24">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">
          Our Products
        </h1>
        <p class="mt-4 text-base text-gray-500">
          Checkout out our different categories. We've got everything you need
          for your shoes.
        </p>
      </div>
      <ClientOnly>
        <Camera />
      </ClientOnly>
      <div class="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <LazyFilters
          :filters="filters"
          :mobile-filters-open="mobileFiltersOpen"
          @update:mobile-filters-open="mobileFiltersOpen = $event"
        />
        <ProductList />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import useProductStore from "~/stores/product";

  const route = useRoute();

  const { data: sizes } = await useSizeColor().getSizes();
  const { data: colors } = await useSizeColor().getColors();
  const { data: categories } = await useCategory().getAll();

  const filters: {
    id: string;
    name: string;
    options:
      | {
          value: string;
          label: string | number;
        }[]
      | undefined;
  }[] = [
    {
      id: "color",
      name: "Color",
      options: colors.value?.data?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    },
    {
      id: "category",
      name: "Category",
      options: categories.value?.data?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    },
    {
      id: "sizes",
      name: "Sizes",
      options: sizes.value?.data?.map((item) => ({
        value: item.id,
        label: item.size,
      })),
    },
  ];

  const mobileFiltersOpen = ref(false);

  const { category, color, size, q } = route.query as {
    category: string | undefined;
    color: string | undefined;
    size: string | undefined;
    q: string | undefined;
  };

  await useProductStore().getProducts(category, color, size, q);
</script>
