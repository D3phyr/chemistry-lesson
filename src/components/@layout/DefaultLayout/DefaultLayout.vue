<template>
  <div :class="$style.wrapper">
    <slot />
    <dummy />
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import dummy from '../MobilePortraitDummy/MobilePortraitDummy.vue'

export default {
  name: 'DefaultLayout',
  components: { dummy },
  setup() {
    const scaleFactorX = ref(null)
    const scaleFactorY = ref(null)

    const updateFactors = () => {
      const { clientHeight, clientWidth } = document.body
      scaleFactorX.value = 10 * clientWidth / 1512
      scaleFactorY.value = 10 * clientHeight / 800
      document.documentElement.style.fontSize = `${scaleFactorX.value > scaleFactorY.value ? scaleFactorY.value : scaleFactorX.value}px`
    }

    onMounted(() => {
      updateFactors()
      window.addEventListener('resize', updateFactors)
    })
  },
}
</script>
<style lang="scss" module>
@import './DefaultLayout.scss';
</style>
