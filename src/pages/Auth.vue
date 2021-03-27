<template>
  <div class="auth">
    <preview />
  </div>
</template>

<script>
import Preview from '@/components/Preview'

export default {
  name: 'auth',
  components: {
    Preview,
  },
}
</script>

<style lang="scss">
.auth {
  width: 100%;
  height: 100%;
}
</style>
