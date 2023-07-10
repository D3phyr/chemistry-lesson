<template>
  <div>
    <p :class="$style.text">{{questions[$props.currentQuestion].title}}</p>
    <ul :class="$style.dndCompareList">
      <div>
        <li v-for="(item, index) in questions[$props.currentQuestion].leftBlocks" :key="index" :class="[$style.dndCompareLeftItem, dndStyles[String(index + 1) + 'left']]">
          <p v-html="item"></p>
        </li>
      </div>
      <div>
        <li v-for="(item, index) in questions[$props.currentQuestion].rightBlocks" :key="index" :class="[$style.dndCompareRightItem, dndStyles[String(index + 1) + 'right']]">
          <p>{{item}}</p>
        </li>
      </div>
      <svg width="900" height="1080" viewBox="0 0 900 1080" :class="$style.svg">
        <circle cx="80" cy="-70" r="45" class="drag drag-1" fill="#000" fill-opacity="0" />
        <circle cx="80" cy="215" r="45" class="drag drag-2" fill="#000" fill-opacity="0" />
        <circle cx="80" cy="500" r="45" class="drag drag-3" fill="#000" fill-opacity="0" />
        <circle cx="80" cy="785" r="45" class="drag drag-4" fill="#000" fill-opacity="0" />
        <circle cx="80" cy="1070" r="45" class="drag drag-5" fill="#000" fill-opacity="0" />

        <line x1="120" y1="-70" x2="120" y2="-70" class="line line-1" :class="dndStyles['1left']" />
        <line x1="120" y1="215" x2="120" y2="215" class="line line-2" :class="dndStyles['2left']" />
        <line x1="120" y1="500" x2="120" y2="500" class="line line-3" :class="dndStyles['3left']" />
        <line x1="120" y1="785" x2="120" y2="785" class="line line-4" :class="dndStyles['4left']" />
        <line x1="120" y1="1070" x2="120" y2="1070" class="line line-5" :class="dndStyles['5left']" />
      </svg>
    </ul>
    <v-btn @click="checkAnswer" :class="$style.btn">Проверить</v-btn>
    <p v-if="isWrong" :class="$style.wrong">Неверный ответ!</p>
  </div>
</template>

<script>
import {
  ref, watch, onMounted,
} from 'vue'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import questions from '../questions'

gsap.registerPlugin(Draggable)

export default {
  name: 'dnd-compare',
  emits: ['next'],
  props: {
    currentQuestion: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const isWrong = ref(false)
    const dndCompareStatus = ref([[null, null], [null, null], [null, null], [null, null], [null, null]])
    const dndStyles = ref({})

    const updateLine = (selector, x, y) => {
      gsap.set(selector, {
        attr: {
          x2: x - 75,
          y2: y,
        },
      })
    }

    const reset = (drag, line, x, y) => {
      gsap.to(drag, {
        duration: 0.3,
        ease: 'power2.out',
        x: 0,
        y: 0,
      })
      gsap.to(line, {
        duration: 0.3,
        ease: 'power2.out',
        attr: {
          x2: x,
          y2: y,
        },
      })
    }

    onMounted(() => {
      Draggable.create('.drag-1', {
        onDrag() { updateLine('.line-1', this.x + 120, this.y - 70) },
        onRelease() {
          if (this.x === 715 && this.y === 855) {
            dndCompareStatus.value = [[1, 4], ...dndCompareStatus.value.slice(1)]
          } else if (this.x === 715 && this.y === 0) {
            dndCompareStatus.value = [[0, 1], ...dndCompareStatus.value.slice(1)]
          } else if (this.x === 715 && this.y === 285) {
            dndCompareStatus.value = [[0, 2], ...dndCompareStatus.value.slice(1)]
          } else if (this.x === 715 && this.y === 570) {
            dndCompareStatus.value = [[0, 3], ...dndCompareStatus.value.slice(1)]
          } else if (this.x === 715 && this.y === 1140) {
            dndCompareStatus.value = [[0, 5], ...dndCompareStatus.value.slice(1)]
          } else {
            dndCompareStatus.value = [[null, null], ...dndCompareStatus.value.slice(1)]
            reset('.drag-1', '.line-1', 70, -70)
            isWrong.value = false
          }
        },
        liveSnap: { points: [{ x: 715, y: 0 }, { x: 715, y: 285 }, { x: 715, y: 570 }, { x: 715, y: 855 }, { x: 715, y: 1140 }], radius: 150 },
      })

      Draggable.create('.drag-2', {
        onDrag() { updateLine('.line-2', this.x + 120, this.y + 215) },
        onRelease() {
          if (this.x === 715 && this.y === 285) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 1), [1, 3], ...dndCompareStatus.value.slice(2)]
          } else if (this.x === 715 && this.y === -285) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 1), [0, 1], ...dndCompareStatus.value.slice(2)]
          } else if (this.x === 715 && this.y === 0) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 1), [0, 2], ...dndCompareStatus.value.slice(2)]
          } else if (this.x === 715 && this.y === 570) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 1), [0, 4], ...dndCompareStatus.value.slice(2)]
          } else if (this.x === 715 && this.y === 855) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 1), [0, 5], ...dndCompareStatus.value.slice(2)]
          } else {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 1), [null, null], ...dndCompareStatus.value.slice(2)]
            reset('.drag-2', '.line-2', 60, 215)
            isWrong.value = false
          }
        },
        liveSnap: { points: [{ x: 715, y: -285 }, { x: 715, y: 0 }, { x: 715, y: 285 }, { x: 715, y: 570 }, { x: 715, y: 855 }], radius: 150 },
      })

      Draggable.create('.drag-3', {
        onDrag() { updateLine('.line-3', this.x + 120, this.y + 500) },
        onRelease() {
          if (this.x === 715 && this.y === -570) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 2), [1, 1], ...dndCompareStatus.value.slice(3)]
          } else if (this.x === 715 && this.y === -285) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 2), [0, 2], ...dndCompareStatus.value.slice(3)]
          } else if (this.x === 715 && this.y === 0) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 2), [0, 3], ...dndCompareStatus.value.slice(3)]
          } else if (this.x === 715 && this.y === 285) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 2), [0, 4], ...dndCompareStatus.value.slice(3)]
          } else if (this.x === 715 && this.y === 570) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 2), [0, 5], ...dndCompareStatus.value.slice(3)]
          } else {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 2), [null, null], ...dndCompareStatus.value.slice(3)]
            reset('.drag-3', '.line-3', 60, 500)
            isWrong.value = false
          }
        },
        liveSnap: { points: [{ x: 715, y: -570 }, { x: 715, y: -285 }, { x: 715, y: 0 }, { x: 715, y: 285 }, { x: 715, y: 570 }], radius: 150 },
      })

      Draggable.create('.drag-4', {
        onDrag() { updateLine('.line-4', this.x + 120, this.y + 785) },
        onRelease() {
          if (this.x === 715 && this.y === 285) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 3), [1, 5], ...dndCompareStatus.value.slice(4)]
          } else if (this.x === 715 && this.y === -855) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 3), [0, 1], ...dndCompareStatus.value.slice(4)]
          } else if (this.x === 715 && this.y === -570) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 3), [0, 2], ...dndCompareStatus.value.slice(4)]
          } else if (this.x === 715 && this.y === -285) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 3), [0, 3], ...dndCompareStatus.value.slice(4)]
          } else if (this.x === 715 && this.y === 0) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 3), [0, 4], ...dndCompareStatus.value.slice(4)]
          } else {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 3), [null, null], ...dndCompareStatus.value.slice(4)]
            reset('.drag-4', '.line-4', 60, 785)
            isWrong.value = false
          }
        },
        liveSnap: { points: [{ x: 715, y: -855 }, { x: 715, y: -570 }, { x: 715, y: -285 }, { x: 715, y: 0 }, { x: 715, y: 285 }], radius: 150 },
      })

      Draggable.create('.drag-5', {
        onDrag() { updateLine('.line-5', this.x + 120, this.y + 1070) },
        onRelease() {
          if (this.x === 715 && this.y === -855) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 4), [1, 2]]
          } else if (this.x === 715 && this.y === -1140) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 4), [0, 1]]
          } else if (this.x === 715 && this.y === -570) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 4), [0, 3]]
          } else if (this.x === 715 && this.y === -285) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 4), [0, 4]]
          } else if (this.x === 715 && this.y === 0) {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 4), [0, 5]]
          } else {
            dndCompareStatus.value = [...dndCompareStatus.value.slice(0, 4), [null, null]]
            reset('.drag-5', '.line-5', 60, 1070)
            isWrong.value = false
          }
        },
        liveSnap: { points: [{ x: 715, y: -1140 }, { x: 715, y: -855 }, { x: 715, y: -570 }, { x: 715, y: -285 }, { x: 715, y: 0 }], radius: 150 },
      })
    })

    watch(dndCompareStatus, () => {
      dndStyles.value = {
        '1left': {
          green: dndCompareStatus.value[0][0] === 1,
          red: dndCompareStatus.value[0][0] === 0,
        },
        '1right': {
          green: dndCompareStatus.value[2][0] === 1 && dndCompareStatus.value[2][1] === 1,
          red: dndCompareStatus.value.filter(el => el !== null && el[0] !== 1 && el[1] === 1).length > 0,
        },
        '2left': {
          green: dndCompareStatus.value[1][0] === 1,
          red: dndCompareStatus.value[1][0] === 0,
        },
        '2right': {
          green: dndCompareStatus.value[4][0] === 1 && dndCompareStatus.value[4][1] === 2,
          red: dndCompareStatus.value.filter(el => el !== null && el[0] !== 1 && el[1] === 2).length > 0,
        },
        '3left': {
          green: dndCompareStatus.value[2][0] === 1,
          red: dndCompareStatus.value[2][0] === 0,
        },
        '3right': {
          green: dndCompareStatus.value[1][0] === 1 && dndCompareStatus.value[1][1] === 3,
          red: dndCompareStatus.value.filter(el => el !== null && el[0] !== 1 && el[1] === 3).length > 0,
        },
        '4left': {
          green: dndCompareStatus.value[3][0] === 1,
          red: dndCompareStatus.value[3][0] === 0,
        },
        '4right': {
          green: dndCompareStatus.value[0][0] === 1 && dndCompareStatus.value[0][1] === 4,
          red: dndCompareStatus.value.filter(el => el !== null && el[0] !== 1 && el[1] === 4).length > 0,
        },
        '5left': {
          green: dndCompareStatus.value[4][0] === 1,
          red: dndCompareStatus.value[4][0] === 0,
        },
        '5right': {
          green: dndCompareStatus.value[3][0] === 1 && dndCompareStatus.value[3][1] === 5,
          red: dndCompareStatus.value.filter(el => el !== null && el[0] !== 1 && el[1] === 5).length > 0,
        },
      }
    })

    const checkAnswer = () => {
      isWrong.value = dndCompareStatus.value.filter(el => el[0] === 1).length < 5
      if (isWrong.value) return false
      emit('next')
      return false
    }

    return {
      questions,
      checkAnswer,
      isWrong,
      dndCompareStatus,
      dndStyles,
    }
  },
}
</script>

<style lang="scss">

.line {
  stroke-width: 15px;
  pointer-events: none;
  stroke: #fff;
  &.green {
    stroke: #00FF00;
  }
  &.red {
    stroke: #F53232;
  }
}

.green {
  border-color: #00FF00 !important;
  &::after {
    background-color: #00FF00 !important;
    border-color: #00FF00 !important;
  }
}

.red {
  border-color: #F53232 !important;
  &::after {
    background-color: #fff !important;
    border-color: #F53232 !important;
    background-image: url('../../../../../assets/wrong.svg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: .8rem .8rem;
  }
}
</style>

<style lang="scss" module src="./dndCompare.scss"></style>
