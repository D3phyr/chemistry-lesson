<template>
  <div>
    <p :class="$style.text">{{questions[$props.currentQuestion].title}}</p>
    <ul :class="$style.classicList">
      <li v-for="(answer, index) in questions[$props.currentQuestion].answers" :key="index" :class="[$style.classicItem, isWrong && radio === index + 1 && 'wrong']">
        <div class="radio">
          <input type="radio" name="answer" :id="index" :value="index + 1" :class="$style.radio" v-model="radio" class="input-radio" />
          <label :for="index" class="radio-label">{{answer}}</label>
        </div>
      </li>
    </ul>
    <v-btn @click="checkAnswer" :class="$style.btn">Проверить</v-btn>
  </div>
</template>

<script>
import {
  ref, watch,
} from 'vue'
import questions from '../questions'

export default {
  name: 'classic',
  emits: ['next'],
  props: {
    currentQuestion: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const isWrong = ref(false)
    const radio = ref(null)

    watch(radio, () => {
      isWrong.value = false
    })

    const checkAnswer = () => {
      isWrong.value = radio.value !== questions[props.currentQuestion].rightAnswer
      if (isWrong.value) return false
      emit('next')
      return false
    }

    return {
      questions,
      checkAnswer,
      isWrong,
      radio,
    }
  },
}
</script>

<style lang="scss">
.radio {
  display: flex;
  align-items: center;
  position: relative;

  .input-radio {
    display: none;
    + .radio-label {
      &:before {
        content: '';
        background: #fff;
        border-radius: 100%;
        border: 2px solid #fff;
        display: inline-block;
        width: 3.5rem;
        height: 3.5rem;
        position: absolute;
        top: 1rem;
        left: -0.3rem;
        cursor: pointer;
        text-align: center;
      }
    }
    &:checked {
      + .radio-label {
        &:before {
          background-color: #00F7EA;
        }
      }
    }
    &:focus {
      + .radio-label {
        &:before {
          outline: none;
          border-color: #00F7EA;
        }
      }
    }
    &:disabled {
      + .radio-label {
        &:before {
          border-color: darken(#fff, 25%);
          background: darken(#fff, 25%);
        }
      }
    }
    + .radio-label {
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
}

.radio-label {
  max-width: 48.2rem;
  margin-left: 5rem;
  margin-top: 0.5rem;
  &:hover {
    cursor: pointer;
  }
}

.wrong {
  & .input-radio:checked {
    + .radio-label {
      &:before {
        background-color: rgb(254, 4, 74) !important;
      }
    }
  }
  & label {
    color: rgb(254, 4, 74) !important;
  }
}
</style>

<style lang="scss" module src="./classic.scss"></style>
