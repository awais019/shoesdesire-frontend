type Notification = {
  id: string;
  type: string;
  message: string;
  duration: number;
};

export default defineStore("notification", () => {
  const notifications = ref<Notification[]>([]);

  function addNotification(notification: Notification) {
    notifications.value.push(notification);
  }

  function removeNotification(notification: Notification) {
    notifications.value = notifications.value.filter(
      (n) => n.id !== notification.id
    );
  }

  return {
    notifications: computed(() => notifications.value),
    addNotification,
    removeNotification,
  };
});
