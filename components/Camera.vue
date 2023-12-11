<script setup lang="ts">
  const modalController = useModal();

  const goNext = ref(0);
  const footLength = ref(0);
  const gender = ref("male");
  const shoeSize = ref(0);

  function handleCapture() {
    goNext.value = 1;
  }

  function handleEstimated(value: number) {
    footLength.value = value;
    goNext.value = 2;
  }

  function handleChage(value: Event) {
    gender.value = (value.target as HTMLInputElement).value;
    if (gender.value == "male") {
      shoeSize.value = Math.round(footLength.value / 0.66);
    } else {
      shoeSize.value = Math.round(footLength.value / 0.66) - 1;
    }
  }

  function handleClose() {
    goNext.value = 0;
    modalController.close();
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
      class="bg-white absolute inset-0 sm:static sm:rounded-lg sm:max-w-2xl sm:flex sm:items-center sm:justify-center"
    >
      <Instructions @capture="handleCapture" v-if="goNext == 0" />
      <Video v-else-if="goNext == 1" @estimated="handleEstimated" />
      <div v-else class="p-4">
        <div class="text-gray-700 flex gap-2 items-center">
          Choose your gender:
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            @change="(value) => handleChage(value)"
          />
          <label for="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            @change="(value) => handleChage(value)"
          />
          <label for="female">Female</label>

          <p class="text-gray-500">Estimated shoe size: {{ shoeSize }}</p>
        </div>
        <button
          class="bg-indigo-600 text-white font-medium px-4 py-2 rounded-md mt-2"
          @click="handleClose"
        >
          Close
        </button>
      </div>
    </div>
  </SharedModal>
</template>

<style scoped></style>
