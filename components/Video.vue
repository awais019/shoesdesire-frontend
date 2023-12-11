<script lang="ts" setup>
  const video = ref<HTMLVideoElement | null>(null);
  const canvas = ref<HTMLCanvasElement | null>(null);
  const image = ref("");

  const captured = ref(false);

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

      console.log(video.value.videoWidth, video.value.videoHeight);

      context?.drawImage(video.value, 0, 0, 640, 480);
      image.value = canvas.value?.toDataURL("image/png");
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
        <button class="bg-indigo-600 px-4 py-2 rounded-lg">
          Estimate size
        </button>
        <button class="bg-red-500 px-4 py-2 rounded-lg" @click="handleRetake">
          Retake
        </button>
      </div>
    </div>
  </div>
</template>
