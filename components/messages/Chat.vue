<script lang="ts" setup>
  import useUserStore from "~/stores/user";

  const openChat = ref(false);

  const { isLoggedIn } = storeToRefs(useUserStore());

  function handleOpenChat() {
    if (!isLoggedIn.value) {
      return navigateTo("/signin");
    }
    openChat.value = true;
  }
</script>

<template>
  <div class="fixed bottom-2 right-2 flex flex-col items-end gap-5">
    <MessagesConversation v-if="openChat" />
    <button
      class="w-10 h-10 text-palatinate_blue"
      @click="handleOpenChat"
      v-if="!openChat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        id="message"
        fill="currentColor"
      >
        <g data-name="Layer 2">
          <g data-name="message-circle">
            <rect width="24" height="24" opacity="0"></rect>
            <path
              d="M19.07 4.93a10 10 0 0 0-16.28 11 1.06 1.06 0 0 1 .09.64L2 20.8a1 1 0 0 0 .27.91A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28zM8 13a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
            ></path>
          </g>
        </g>
      </svg>
    </button>
    <div v-else>
      <button
        @click="openChat = false"
        class="w-10 h-10 rounded-full bg-palatinate_blue shadow-chat flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="20"
          height="20"
          id="chevron"
          fill="#fff"
        >
          <path
            d="M17.418 6.109a.697.697 0 0 1 .979 0 .68.68 0 0 1 0 .969l-7.908 7.83a.697.697 0 0 1-.979 0l-7.908-7.83a.68.68 0 0 1 0-.969.697.697 0 0 1 .979 0L10 13.25l7.418-7.141z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
