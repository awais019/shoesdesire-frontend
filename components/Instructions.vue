<script lang="ts" setup>
  defineEmits<{
    (e: "capture"): void;
  }>();
</script>

<template>
  <div class="text-md text-gray-700 flex flex-col gap-4 items-center p-4">
    <p>
      Pleas take a clear picture of your foot and we will estimate your shoe
      size. Make sure to place your foot on a white background.
    </p>
    <button
      class="bg-indigo-600 text-white font-medium px-4 py-2 rounded-md"
      @click="$emit('capture')"
    >
      Capture
    </button>
  </div>
</template>
