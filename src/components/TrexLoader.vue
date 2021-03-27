<template>
  <div class="trex-loader">
    <div class="trex-loader__loader-wrp">
      <loader />
    </div>
    <div class="trex-loader__gif-wrp">
      <img class="trex-loader__gif" src="@/assets/trex.gif" />
    </div>
    <h1 class="trex-loader__title display-6">Viktor is Deploying</h1>
  </div>
</template>

<script>
import Loader from './Loader'

export default {
  name: 'trex-loader',
  components: { Loader },
}
</script>

<style lang="scss">
.trex-loader {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__loader-wrp {
    position: absolute;
    top: 6rem;
    z-index: 5;
  }

  &__gif {
    -webkit-filter: contrast(200%);
  }
}
</style>
