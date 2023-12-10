import useUserStore from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (isLoggedIn.value) {
    return "/";
  }
});
