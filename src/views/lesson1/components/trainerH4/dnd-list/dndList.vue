<template>
  <div>
    <p :class="$style.text">{{questions[$props.currentQuestion].title}}</p>
    <div :class="$style.wrapper">
      <div :class="$style.counters">
        <p :class="$style.counter">1)</p>
        <p :class="$style.counter">2)</p>
        <p :class="$style.counter">3)</p>
      </div>
      <draggable :class="$style.dndList" tag="ol" v-model="dndList" :ghostClass="$style.ghost" :move="onMove">
      <transition-group type="transition" :moveClass="$style.flipListMove">
        <li v-for="answer in dndList" :key="answer.order">
          <p aria-hidden="true">{{answer.name}}</p>
        </li>
      </transition-group>
    </draggable>
    </div>
    <v-btn @click="checkAnswer" :class="$style.btn">Проверить</v-btn>
    <p v-if="isWrong" :class="$style.wrong">Неверный ответ!</p>
  </div>
</template>

<script>
import {
  ref,
} from 'vue'
import draggable from 'vuedraggable'
import questions from '../questions'

export default {
  name: 'dnd-list',
  emits: ['next'],
  props: {
    currentQuestion: {
      type: Number,
    },
  },
  components: {
    draggable,
  },
  setup(props, { emit }) {
    const dndList = ref({})
    const isWrong = ref(false)

    dndList.value = questions[props.currentQuestion].answers.map((name, index) => ({ name, order: index + 1 }))

    const onMove = () => {
      isWrong.value = false
    }

    const checkAnswer = () => {
      isWrong.value = dndList.value.map(el => el.order).join('') !== questions[props.currentQuestion].rightAnswer
      if (isWrong.value) return false
      emit('next')
      return false
    }

    return {
      questions,
      dndList,
      checkAnswer,
      onMove,
      draggable,
      isWrong,
    }
  },
}
</script>

<style lang="scss" module src="./dndList.scss"></style>
