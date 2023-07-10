<template>
  <div :class="$style.wrapper">
    <Tablet width="53.2rem" height="77.9rem" profBottom="3rem" profRight="-1.4rem" :class="$style.tablet">
      <p :class="$style.text">Привет!</p>
      <p :class="$style.text">Я Менделеев – искусственный интеллект, изучающий химию.</p>
      <p :class="$style.text">Можно назвать меня хемоинформатиком, поскольку я применяю методы информатики для изучения химии.</p>
      <p :class="$style.text">Чтобы я смог научиться предсказывать свойства веществ по их структуре и подбирать вещество под свойства, которые нужны, мне понадобится твоя помощь.</p>
      <v-btn @click="$emit('success')" :class="$style.btn">Начать</v-btn>
    </Tablet>
  </div>
</template>

<script>
import Tablet from '../../../../components/@ui/tablet/Tablet.vue'

export default {
  name: 'trainerH1',
  components: {
    Tablet,
  },
  methods: {
  },
}
</script>

<style lang="scss" module src="./trainerH1.scss"></style>
