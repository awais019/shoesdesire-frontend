<script lang="ts" setup>
  const route = useRoute();
  const { id } = route.params;
</script>

<template>
  <div>{{ id }}</div>
</template>

<style scoped></style>
