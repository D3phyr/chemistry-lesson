<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
    <portal-target name="popup" multiple />
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: 'Главная',
    titleTemplate: 'Урок химии',
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'default-layout'
    },
  },
}
</script>
<style lang="scss">
  @import './styles/main.scss';
</style>
