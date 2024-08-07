<template>
  <div class="spinner-overlay">
    <div class="spinner" />
  </div>
</template>

<style scoped>
body,
html {
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
}

.spinner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 10vw;
  height: 10vw;
  border: 10px solid var(--color-border);
  border-top: 10px solid var(--color-brat);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
