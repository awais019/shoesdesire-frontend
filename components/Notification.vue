<script lang="ts" setup>
  const props = defineProps<{
    notification: {
      id: string;
      type: string;
      message: string;
      duration: number;
    };
  }>();

  const emits = defineEmits<{
    (
      e: "removeNotification",
      notification: {
        id: string;
        type: string;
        message: string;
        duration: number;
      }
    ): void;
  }>();

  setTimeout(() => {
    emits("removeNotification", props.notification);
  }, props.notification.duration + 500);
</script>

<template>
  <div
    :key="notification.id"
    class="flex justify-between items-center w-72 px-4 py-3 mb-4 bg-white rounded-md shadow-md notification active"
    :style="{
      '--duration': notification.duration + 'ms',
    }"
  >
    <div class="flex items-center">
      <div class="mr-4">
        <div
          v-if="notification.type === 'success'"
          class="w-6 h-6 bg-green-500 rounded-full"
        ></div>
        <div
          v-else-if="notification.type === 'error'"
          class="w-6 h-6 bg-red-500 rounded-full"
        ></div>
        <div
          v-else-if="notification.type === 'warning'"
          class="w-6 h-6 bg-yellow-500 rounded-full"
        ></div>
        <div
          v-else-if="notification.type === 'info'"
          class="w-6 h-6 bg-blue-500 rounded-full"
        ></div>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-900">
          {{ notification.message }}
        </p>
      </div>
    </div>
    <div>
      <button
        @click="$emit('removeNotification', notification)"
        class="text-gray-400 hover:text-gray-500"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10.707 9.293a1 1 0 010 1.414L9.414 12l1.293 1.293a1 1 0 11-1.414 1.414L8 13.414l-1.293 1.293a1 1 0 11-1.414-1.414L6.586 12 5.293 10.707a1 1 0 111.414-1.414L8 10.586l1.293-1.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
  .notification {
    visibility: hidden;
    transform: translateX(100%);

    --duration: 5s;
  }

  .notification.active {
    visibility: visible;
    animation: slideIn 0.5s forwards,
      slideOut 0.5s var(--duration, 2.5s) forwards;
  }
</style>
