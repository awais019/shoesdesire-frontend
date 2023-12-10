<script lang="ts" setup>
  const query = ref("");

  const emits = defineEmits<{
    (e: "close"): void;
  }>();

  function handleSubmit() {
    if (query.value) {
      emits("close");
      navigateTo(`/products/?q=${query.value}`);
    }
  }
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white shadow-md">
    <div class="relative">
      <input
        class="block w-full appearance-none bg-transparent p-4 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-lg sm:leading-6 focus:ring-0 focus:border-none border-none"
        placeholder="Find shoes..."
        aria-label="Search products"
        v-model="query"
        style="caret-color: rgb(107, 114, 128)"
        tabindex="0"
        autocomplete="off"
      />
      <button
        type="submit"
        class="absolute right-4 top-4 h-6 w-6"
        @click.prevent="handleSubmit"
      >
        <svg
          class="pointer-events-none h-6 w-6 fill-slate-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
