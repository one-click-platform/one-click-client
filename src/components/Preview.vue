<template>
  <div class="preview">
    <img
      v-if="!isButtonShown"
      @click="logInWithMetamask"
      class="preview__img"
      src="@/assets/eth.png"
    />
    <button v-if="isButtonShown" class="preview__btn btn btn-primary">
      Sign In
    </button>
  </div>
</template>

<script>
export default {
  name: 'preview',
  data: () => ({
    isButtonShown: false,
  }),
  methods: {
    logInWithMetamask() {
      this.isButtonShown = true
    },
  },
}
</script>

<style lang="scss">
.preview {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: no-repeat border-box center/100% #d3d3d3;

  &__btn {
    z-index: 5;
    transition: all 0.1s ease-out;
  }

  &__img {
    position: absolute;
    z-index: 1;
    transition: all 0.5s ease-out;

    &:hover {
      box-shadow: 0 0 10px #000;
    }
  }
}
</style>
