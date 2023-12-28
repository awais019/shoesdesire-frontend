<script lang="ts" setup>
  import useMessageStore from "~/stores/message";
  import useUserStore from "~/stores/user";

  const messageStore = useMessageStore();
  const { messages, conversation } = storeToRefs(messageStore);
  const { user } = storeToRefs(useUserStore());

  const { $socket } = useNuxtApp();

  onMounted(() => {
    $socket.emit("join", conversation.value?.id, user.value?.id);
    $socket.on("message", (message) => {
      messageStore.pushMessage(message);
    });
  });
</script>

<template>
  <div class="h-[512px] p-5">
    <p v-if="messages.length == 0" class="tex-sm text-gray-400">
      No messages yet.
    </p>
    <div v-else></div>
  </div>
</template>

<style scoped></style>
