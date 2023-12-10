<script setup lang="ts">
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  } from "@headlessui/vue";

  import useCartStore from "~/stores/cart";

  const route = useRoute();
  const cartStore = useCartStore();

  const { data } = await useProduct().getById(route.params.id as string);

  const product = {
    id: data.value?.data.id,
    name: data.value?.data.name,
    price: data.value?.data.price,
    description: data.value?.data.description,
    images: data.value?.data.images.map((img, idx) => {
      return {
        id: img.id,
        imageSrc: img.url,
        imageAlt: data.value?.data.name,
        primary: idx === 0 ? true : false,
      };
    }),
    colors: data.value?.data.colors.map((color) => {
      return {
        id: color.id,
        name: color.name,
        hex: color.hex,
      };
    }),

    sizes: data.value?.data.sizes.map((size) => {
      return {
        id: size.id,
        name: size.size,
        inStock: true,
      };
    }),
  };

  const selectedColor = ref(product.colors?.at(0));
  const selectedSize = ref(product.sizes?.at(0));
  const quantity = ref(1);

  function handleSubmit() {
    if (!product.id || !selectedSize.value?.id || !selectedColor.value?.id)
      return;

    cartStore.addProductToCart(
      product.id as string,
      quantity.value,
      selectedSize.value.id,
      selectedColor.value.id
    );
  }
</script>

<template>
  <div class="bg-white">
    <main
      class="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8"
    >
      <div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
        <div class="lg:col-span-5 lg:col-start-8">
          <div class="flex justify-between">
            <h1 class="text-xl font-medium text-gray-900">
              {{ product.name }}
            </h1>
            <p class="text-xl font-medium text-gray-900">
              Rs. {{ product.price }}
            </p>
          </div>
        </div>
        <!-- Image gallery -->
        <div
          class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0"
        >
          <h2 class="sr-only">Images</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
            <img
              v-for="image in product.images"
              :key="image.id"
              :src="image.imageSrc"
              :alt="image.imageAlt"
              :class="[
                image.primary
                  ? 'lg:col-span-2 lg:row-span-2'
                  : 'hidden lg:block',
                'rounded-lg',
              ]"
            />
          </div>
        </div>

        <div class="mt-8 lg:col-span-5">
          <FormKit type="form" @submit="handleSubmit" :actions="false">
            <!-- Color picker -->
            <div>
              <h2 class="text-sm font-medium text-gray-900">Color</h2>

              <RadioGroup v-model="selectedColor" class="mt-2">
                <RadioGroupLabel class="sr-only"
                  >Choose a color</RadioGroupLabel
                >
                <div class="flex items-center space-x-3">
                  <RadioGroupOption
                    as="template"
                    v-for="color in product.colors"
                    :key="color.name"
                    :value="color"
                    v-slot="{ active, checked }"
                  >
                    <div
                      :style="{
                        '--tw-ring-color': `${color.hex}`,
                      }"
                      :class="[
                        active && checked ? 'ring ring-offset-1' : '',
                        !active && checked ? 'ring-2' : '',
                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                      ]"
                    >
                      <RadioGroupLabel as="span" class="sr-only">{{
                        color.name
                      }}</RadioGroupLabel>
                      <span
                        aria-hidden="true"
                        :style="{ backgroundColor: color.hex }"
                        :class="[
                          'h-8 w-8 rounded-full border border-black border-opacity-10',
                        ]"
                      />
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
            </div>

            <!-- Size picker -->
            <div class="mt-8">
              <div class="flex items-center justify-between">
                <h2 class="text-sm font-medium text-gray-900">Size</h2>
              </div>

              <RadioGroup v-model="selectedSize" class="mt-2">
                <RadioGroupLabel class="sr-only">Choose a size</RadioGroupLabel>
                <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  <RadioGroupOption
                    as="template"
                    v-for="size in product.sizes"
                    :key="size.name"
                    :value="size"
                    :disabled="!size.inStock"
                    v-slot="{ active, checked }"
                  >
                    <div
                      :class="[
                        size.inStock
                          ? 'cursor-pointer focus:outline-none'
                          : 'cursor-not-allowed opacity-25',
                        active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                        checked
                          ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                        'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1',
                      ]"
                    >
                      <RadioGroupLabel as="span">{{
                        size.name
                      }}</RadioGroupLabel>
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
            </div>

            <div class="mt-8">
              <div class="flex items-center justify-between">
                <label for="quantity" class="text-sm font-medium text-gray-900"
                  >Quantity</label
                >
              </div>
              <div class="mt-1">
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  min="1"
                  max="10"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  v-model="quantity"
                />
              </div>
            </div>

            <button
              type="submit"
              class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to cart
            </button>
          </FormKit>

          <!-- Product details -->
          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">Description</h2>

            <div
              class="prose prose-sm mt-4 text-gray-500"
              v-html="product.description"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
