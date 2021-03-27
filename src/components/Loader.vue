<template>
  <div class="loader__app">
    <span>4&nbsp;</span>
    <span>+&nbsp;</span>
    <span>2</span>
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    messageId: { type: String, default: '' },
    positionCenter: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss">
$str: 'franklin gothic medium';

.loader__app {
  perspective: 70rem;
  color: #202020;
}
.loader__app > span {
  font-size: 4rem;
  font-family: $str, sans-serif;
  display: inline-block;
  animation: flip 2.6s infinite linear;
  transform-origin: 0 70%;
  transform-style: preserve-3d;
}
@keyframes flip {
  35% {
    transform: rotateX(360deg);
  }
  100% {
    transform: rotateX(360deg);
  }
}
.loader__app > span:nth-child(2) {
  animation-delay: 0.3s;
}
.loader__app > span:nth-child(3) {
  animation-delay: 0.6s;
}
/* stylelint-enable no-descending-specificity */
</style>
