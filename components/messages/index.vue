<script lang="ts" setup>
  import useMessageStore from "~/stores/message";
  import useUserStore from "~/stores/user";

  const messageStore = useMessageStore();
  const { messages, conversation } = storeToRefs(messageStore);
  const { user } = storeToRefs(useUserStore());

  const { $socket } = useNuxtApp();

  function isSender(message: any) {
    return message.sender === user.value?.id;
  }

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
    <div v-else class="flex flex-col gap-4">
      <div v-for="message in messages">
        <p
          class="max-w-fit px-5 py-3 rounded-md"
          :class="[
            isSender(message)
              ? 'bg-palatinate_blue  text-white float-right'
              : 'bg-anti_flash',
          ]"
        >
          {{ message.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
