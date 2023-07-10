<template>
  <div :class="$style.wrapper">
    <Tablet width="66.6rem" height="97.5rem" profBottom="-3rem" profRight="-0.4rem" :class="$style.tablet">
      <div :class="$style.inner">
        <Transition mode="out-in">
          <dnd-list v-if="currentQuestionData.type === 'dnd-list'" :currentQuestion="currentQuestion" @next="onNext"></dnd-list>
          <classic v-if="currentQuestionData.type === 'classic'" :currentQuestion="currentQuestion" @next="onNext"></classic>
          <dndCompare v-if="currentQuestionData.type === 'dnd-compare'" :currentQuestion="currentQuestion" @next="onNext"></dndCompare>
        </Transition>
      </div>
    </Tablet>
  </div>
</template>

<script>
import {
  ref, computed,
} from 'vue'

import Tablet from '../../../../components/@ui/tablet/Tablet.vue'
import dndList from './dnd-list/dndList.vue'
import classic from './classic/classic.vue'
import dndCompare from './dnd-compare/dndCompare.vue'
import questions from './questions'

export default {
  name: 'trainerH4',
  emits: ['success'],
  components: {
    Tablet,
    dndList,
    classic,
    dndCompare,
  },
  setup(props, { emit }) {
    const currentQuestion = ref(0)

    const currentQuestionData = computed(() => questions[currentQuestion.value])

    const onNext = () => {
      if (questions[currentQuestion.value + 1] !== undefined) {
        currentQuestion.value += 1
        return false
      }
      emit('success')
      return false
    }

    return {
      questions,
      currentQuestion,
      currentQuestionData,
      onNext,
    }
  },
}
</script>

<style lang="scss">
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>

<style lang="scss" module src="./trainerH4.scss"></style>
