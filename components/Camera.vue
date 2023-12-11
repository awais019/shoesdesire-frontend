<script setup lang="ts">
  const modalController = useModal();

  const goNext = ref(0);
  const video = ref<HTMLVideoElement | null>(null);

  function handleCapture() {
    goNext.value = 1;
  }
</script>

<template>
  <div class="mt-4 text-sm text-gray-700">
    <p>Use our AI-Enhanced camera to estimate you shoe size.</p>
    <button
      @click="modalController.open"
      class="bg-indigo-600 px-4 py-2 text-white font-medium rounded-md mt-2"
    >
      Open Camera
    </button>
  </div>
  <SharedModal :controller="modalController">
    <div
      class="bg-white p-4 rounded-lg max-w-2xl flex items-center justify-center"
    >
      <Instructions @capture="handleCapture" v-if="goNext == 0" />
      <Video v-else-if="goNext == 1" />
    </div>
  </SharedModal>
</template>

<style scoped></style>
