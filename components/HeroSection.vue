<script setup lang="ts"></script>

<template>
  <div class="relative bg-gray-900">
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
      <img
        src="https://source.unsplash.com/random/1920x1080/?shoes+redirect=True"
        alt=""
        class="h-full w-full object-cover object-center"
      />
    </div>
    <div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50" />
    <div
      class="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0"
    >
      <h1 class="text-4xl font-bold tracking-tight text-white lg:text-6xl">
        Shoes that fit your life.
      </h1>
      <p class="mt-4 text-xl text-white">
        Shoes desire to be worn. Find the perfect pair for your next adventure.
      </p>
      <nuxt-link
        to="/products"
        class="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
        >Shop Now
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped></style>
