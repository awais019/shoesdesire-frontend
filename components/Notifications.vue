<script lang="ts" setup>
  import useNotificationStore from "~/stores/notification";

  const notificationStore = useNotificationStore();

  const { notifications } = storeToRefs(notificationStore);
</script>

<template>
  <div class="fixed top-28 right-5">
    <Notification
      v-for="notification in notifications"
      :notification="notification"
      :key="notification.id"
      @removeNotification="notificationStore.removeNotification(notification)"
    />
  </div>
</template>
