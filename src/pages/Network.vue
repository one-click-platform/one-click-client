<template>
  <div class="network">
    <create-net-form />
  </div>
</template>

<script>
import CreateNetForm from '@/components/CreateNetForm'

export default {
  name: 'network',
  components: {
    CreateNetForm,
  },
}
</script>

<style lang="scss">
.network {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: no-repeat border-box center/100% url(../assets/wallpaper.png);
  background-size: cover;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    z-index: -1;
  }
}
</style>
