<script lang="ts" setup>
  const { data: _data } = await useCategory().getAll();

  const categories = _data.value?.data;
</script>

<template>
  <div class="bg-white">
    <main>
      <!-- Category section -->
      <section
        aria-labelledby="category-heading"
        class="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8 mb-12"
      >
        <div
          class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0"
        >
          <h2
            id="category-heading"
            class="text-2xl font-bold tracking-tight text-gray-900"
          >
            Shop by Category
          </h2>
        </div>

        <div class="mt-4">
          <div class="-my-2">
            <div class="box-content overflow-x-auto py-2 xl:overflow-visible">
              <div
                class="flex flex-col justify-center items-center gap-4 sm:flex-row sm:flex-wrap mx-auto px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0"
              >
                <nuxt-link
                  v-for="category in categories"
                  :key="category.name"
                  to="/"
                  class="relative flex h-80 w-56 -12 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                >
                  <span aria-hidden="true" class="absolute inset-0">
                    <img
                      :src="category.imageUrl"
                      :alt="category.slug"
                      class="h-full w-full object-cover object-center"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                  />
                  <span
                    class="relative mt-auto text-center text-xl font-bold text-white"
                    >{{ category.name }}</span
                  >
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
