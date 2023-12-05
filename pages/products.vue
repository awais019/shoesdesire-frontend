<template>
  <div class="bg-white">
    <div>
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

        <div
          class="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4"
        >
          <LazyFilters
            :filters="filters"
            :mobile-filters-open="mobileFiltersOpen"
            @update:mobile-filters-open="mobileFiltersOpen = $event"
          />
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
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
  const products = [
    {
      id: 1,
      name: "Basic Tee 8-Pack",
      href: "#",
      price: "$256",
      description:
        "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
      options: "8 colors",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
      imageAlt:
        "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
    },
    {
      id: 2,
      name: "Basic Tee",
      href: "#",
      price: "$32",
      description:
        "Look like a visionary CEO and wear the same black t-shirt every day.",
      options: "Black",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
      imageAlt: "Front of plain black t-shirt.",
    },
    {
      id: 2,
      name: "Basic Tee",
      href: "#",
      price: "$32",
      description:
        "Look like a visionary CEO and wear the same black t-shirt every day.",
      options: "Black",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
      imageAlt: "Front of plain black t-shirt.",
    },
  ];
</script>
