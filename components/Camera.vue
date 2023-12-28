<script setup lang="ts">
  const modalController = useModal();

  const goNext = ref(0);
  const footLength = ref(0);
  const gender = ref("male");
  const region = ref("pakistan");
  const shoeSize = ref(0);

  function handleCapture() {
    goNext.value = 1;
  }

  function handleEstimated(value: number) {
    footLength.value = value;
    goNext.value = 2;
  }

  function handleGenderChange(value: Event) {
    gender.value = (value.target as HTMLInputElement).value;
    calculateShoeSize();
  }

  function handleRegionChange(value: Event) {
    region.value = (value.target as HTMLInputElement).value;
    calculateShoeSize();
  }

  function handleApplyFilter() {
    modalController.close();
    if (shoeSize.value > 14) {
      region.value = "pakistan";
    }
    calculateShoeSize();
    return navigateTo(`/products/?size=${shoeSize.value}`);
  }

  function handleClose() {
    goNext.value = 0;
    modalController.close();
  }

  function calculateShoeSize() {
    if (region.value == "uk" || region.value == "pakistan") {
      if (gender.value == "male") {
        shoeSize.value = 3 * footLength.value - 25;
      } else {
        shoeSize.value = 3 * footLength.value - 25.5;
      }
    } else if (region.value == "europe") {
      shoeSize.value = footLength.value * 2.54 * 1.5 + 2;
    } else {
      if (gender.value == "male") {
        shoeSize.value = footLength.value * 3 - 22;
      } else {
        shoeSize.value = footLength.value * 3 - 21;
      }
    }
    shoeSize.value = Math.round(shoeSize.value);
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
            @change="(value) => handleGenderChange(value)"
          />
          <label for="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            @change="(value) => handleGenderChange(value)"
          />
          <label for="female">Female</label>
        </div>
        <div class="text-gray-700 flex gap-2 items-center">
          Select your region:
          <input
            type="radio"
            id="uk"
            name="region"
            value="uk"
            @change="(value) => handleRegionChange(value)"
          />
          <label for="uk">UK</label>
          <input
            type="radio"
            id="usa"
            name="region"
            value="usa"
            @change="(value) => handleRegionChange(value)"
          />
          <label for="usa">Usa</label>
          <input
            type="radio"
            id="europe"
            name="region"
            value="europe"
            @change="(value) => handleRegionChange(value)"
          />
          <label for="europe">Europe</label>

          <input
            type="radio"
            id="usa"
            name="region"
            value="usa"
            @change="(value) => handleRegionChange(value)"
          />
          <label for="usa">Usa</label>
          <input
            type="radio"
            id="pakistan"
            name="region"
            value="pakistan"
            @change="(value) => handleRegionChange(value)"
          />
          <label for="pakistan">Pakistan</label>
        </div>
        <p class="text-gray-500">Estimated shoe size: {{ shoeSize }}</p>

        <button
          class="bg-red-600 text-white font-medium px-4 py-2 rounded-md mt-2"
          @click="handleClose"
        >
          Close
        </button>
        <button
          class="bg-indigo-600 text-white font-medium px-4 py-2 rounded-md mt-2 ml-2"
          @click="handleApplyFilter"
        >
          Apply Filter
        </button>
      </div>
    </div>
  </SharedModal>
</template>

<style scoped></style>
