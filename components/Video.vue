<script lang="ts" setup>
  import useNotificationsStore from "~/stores/notification";

  const emits = defineEmits<{
    (e: "estimated", footLength: number): void;
  }>();

  const video = ref<HTMLVideoElement | null>(null);
  const canvas = ref<HTMLCanvasElement | null>(null);
  const image = ref("");
  const blob = ref<Blob | null>(null);
  const footLength = ref(0);

  const captured = ref(false);
  const { estimate } = useEstimateSize();

  const notificationStore = useNotificationsStore();

  function startStream() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          if (video.value) {
            video.value.srcObject = stream;
            video.value.play();
          }
        });
    }
  }

  startStream();

  function handleCapture() {
    captured.value = true;
    if (video.value && canvas.value) {
      const context = canvas.value.getContext("2d");

      context?.drawImage(video.value, 0, 0, 640, 480);
      image.value = canvas.value.toDataURL("image/jpeg");
      canvas.value.toBlob((b) => {
        blob.value = b;
      });
      releaseCamera();
    }
  }

  function releaseCamera() {
    if (video.value && video.value.srcObject) {
      video.value.pause();
      // @ts-ignore
      const tracks = video.value.srcObject.getVideoTracks();
      tracks.forEach((track: any) => track.stop());
      video.value.srcObject = null;
    }
  }

  function handleRetake() {
    captured.value = false;
    startStream();
  }

  async function handleEstimate() {
    const formData = new FormData();
    if (blob.value) {
      formData.append("image", blob.value, "image.jpg");

      const { data, error } = await estimate(formData);
      if (data.value) {
        footLength.value = data.value.foot_length_in || 0;
        emits("estimated", footLength.value);
      } else if (error.value) {
        notificationStore.addNotification({
          id: Date.now().toString(),
          type: "error",
          message: error.value.message,
          duration: 5000,
        });
      }
    }
  }
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <video
      v-if="!captured"
      ref="video"
      width="640"
      height="480"
      autoplay
    ></video>
    <button
      class="bg-indigo-600 text-white font-medium px-4 py-2 rounded-md absolute mb-2 bottom-2 sm:static"
      @click="handleCapture"
      v-if="!captured"
    >
      Capture
    </button>
    <canvas ref="canvas" width="640" height="480" v-show="false"></canvas>
    <div v-if="captured" class="p-4">
      <img :src="image" alt="Foot Image" class="" />
      <div class="flex gap-3 text-white font-medium mt-2">
        <button
          class="bg-indigo-600 px-4 py-2 rounded-lg"
          @click="handleEstimate"
        >
          Estimate size
        </button>
        <button class="bg-red-500 px-4 py-2 rounded-lg" @click="handleRetake">
          Retake
        </button>
      </div>
    </div>
  </div>
</template>
