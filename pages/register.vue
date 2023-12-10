<script lang="ts" setup>
  import { reset } from "@formkit/core";
  import useUserStore from "~/stores/user";
  import useNotificationStore from "~/stores/notification";

  definePageMeta({
    middleware: ["auth"],
  });

  const formId = ref<string>("register-form");
  const userStore = useUserStore();
  const notificationStore = useNotificationStore();

  async function handleSubmit(values: any) {
    const { error } = await userStore.register(values);
    if (error.value) {
      notificationStore.addNotification({
        id: "register-error",
        type: "error",
        message: error.value.data.message,
        duration: 2000,
      });
    } else {
      notificationStore.addNotification({
        id: "register-success",
        type: "success",
        message: "Registration successful. Check your email to verify.",
        duration: 2000,
      });
    }
    reset(formId.value);
  }

  function handleCancel() {
    reset(formId.value);
  }
</script>

<template>
  <FormKit
    type="form"
    :actions="false"
    :id="formId"
    form-class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8"
    @submit="handleSubmit"
  >
    <div class="space-y-12 sm:space-y-16">
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div
          class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
        >
          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              for="firstName"
              class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >First name</label
            >
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <FormKit
                type="text"
                name="firstName"
                id="first-name"
                autocomplete="given-name"
                input-class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                placeholder="John"
                validation="required|length:3"
                :validation-messages="{
                  required: 'First name is required',
                  length: 'First name must be at least 3 characters',
                }"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              for="lastName"
              class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >Last name</label
            >
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <FormKit
                type="text"
                name="lastName"
                id="last-name"
                autocomplete="family-name"
                input-class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                placeholder="Doe"
                validation="required|length:3"
                :validation-messages="{
                  required: 'Last name is required',
                  length: 'Last name must be at least 3 characters',
                }"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >Email address</label
            >
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <FormKit
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                input-class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                placeholder="johndoe@gmail.com"
                validation="required|email"
                :validation-messages="{
                  required: 'Email is required',
                  email: 'Email must be valid',
                }"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >Password</label
            >
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <FormKit
                id="password"
                name="password"
                type="password"
                autocomplete="password"
                input-class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                placeholder="*********"
                validation="required|length:8"
                :validation-messages="{
                  required: 'Password is required',
                  length: 'Password must be at least 8 characters',
                }"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              for="street-address"
              class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >Street address</label
            >
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <FormKit
                type="text"
                name="address"
                id="street-address"
                autocomplete="street-address"
                input-class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                placeholder="123 Main St"
                validation="required"
                :validation-messages="{
                  required: 'Address is required',
                }"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              for="city"
              class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >City</label
            >
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <FormKit
                type="text"
                name="city"
                id="city"
                autocomplete="address-level2"
                input-class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                placeholder="Lahore"
                validation="required"
                :validation-messages="{
                  required: 'City is required',
                }"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              for="region"
              class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >State / Province</label
            >
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <FormKit
                type="text"
                name="state"
                id="region"
                autocomplete="address-level1"
                input-class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                placeholder="Punjab"
                validation="required"
                :validation-messages="{
                  required: 'State is required',
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 flex items-center justify-end gap-x-6">
      <FormKit
        type="button"
        input-class="text-sm font-semibold leading-6 text-gray-900"
        @click.prevent="handleCancel"
      >
        Cancel
      </FormKit>
      <FormKit
        type="submit"
        input-class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Register
      </FormKit>
    </div>
  </FormKit>
</template>

<style lang="postcss">
  .formkit-message {
    @apply text-sm font-medium text-red-500;
  }
</style>
