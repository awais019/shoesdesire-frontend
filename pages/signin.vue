<script lang="ts" setup>
  import useUserStore from "~/stores/user";
  import useNotificationStore from "~/stores/notification";

  definePageMeta({
    middleware: ["auth"],
  });

  const userStore = useUserStore();
  const notificationStore = useNotificationStore();

  const route = useRoute();

  async function handleSubmit(values: any) {
    const { error } = await userStore.signIn(values.email, values.password);
    if (error && error.value) {
      notificationStore.addNotification({
        id: `${Math.random()}`,
        type: "error",
        message: error.value.message,
        duration: 3000,
      });
      return;
    }
    notificationStore.addNotification({
      id: `${Math.random()}`,
      type: "success",
      message: "You have successfully signed in.",
      duration: 3000,
    });

    const redirect = route.query.redirect as string;
    if (redirect) {
      navigateTo(redirect);
    } else {
      navigateTo("/");
    }
  }
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <FormKit
        type="form"
        form-class="space-y-6"
        :actions="false"
        @submit="handleSubmit"
      >
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <FormKit
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              input-class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              validation="required|email"
              :validation-messages="{
                required: 'Email is required.',
                email: 'Email is invalid.',
              }"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <FormKit
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              input-class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              validation="required"
              :validation-messages="{
                required: 'Password is required.',
              }"
            />
          </div>
        </div>

        <div>
          <FormKit
            type="submit"
            input-class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </FormKit>
        </div>
      </FormKit>

      <p class="mt-10 text-center text-sm text-gray-500">
        Don't have an account?
        {{ " " }}
        <nuxt-link
          to="/register"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Register</nuxt-link
        >
      </p>
    </div>
  </div>
</template>
