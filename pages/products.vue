<template>
  <div class="bg-white">
    <div>
      <LazyMobileFilters />
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
          <LazyFilters />
          <section
            aria-labelledby="product-heading"
            class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
          >
            <h2 id="product-heading" class="sr-only">Products</h2>

            <div
              class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3"
            >
              <div
                v-for="product in products"
                :key="product.id"
                class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div
                  class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96"
                >
                  <img
                    :src="product.imageSrc"
                    :alt="product.imageAlt"
                    class="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div class="flex flex-1 flex-col space-y-2 p-4">
                  <h3 class="text-sm font-medium text-gray-900">
                    <a :href="product.href">
                      <span aria-hidden="true" class="absolute inset-0" />
                      {{ product.name }}
                    </a>
                  </h3>
                  <p class="text-sm text-gray-500">{{ product.description }}</p>
                  <div class="flex flex-1 flex-col justify-end">
                    <p class="text-sm italic text-gray-500">
                      {{ product.options }}
                    </p>
                    <p class="text-base font-medium text-gray-900">
                      {{ product.price }}
                    </p>
                  </div>
                </div>
              </div>
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

  const filters = [
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
