<template>
    <div :class="$style.wrapper">
        <div v-if="stage === 0">
            <div :class="$style.textContainer">
                <template v-if="!experimentNumber">
                    <p>Помоги мне проанализировать вещества слева. Результаты появятся в карточках веществ сверху, когда мы закончим анализ.</p>
                    <p>Перенеси образец в i-микроскоп - он покажет тебе структуру вещества. </p>
                    <p>Для этого нажми на пробирку.</p>
                </template>
                <template v-else>
                    <p>Пробирка высохла.</p>
                    <p>Проведи эксперимент на другом веществе.</p>
                </template>
            </div>
        </div>
        <div v-if="stage === 1">
            <div :class="$style.textContainer">
                <p>Чтобы перенести образец вещества в i-микроскоп, возьми пробирку, и перемести ее к тому веществу, образец которого ты хочешь взять. </p>
                <p>После этого помести пробирку с образцом вещества в i-микроскоп.</p>
            </div>
        </div>
        <div v-if="stage === 2 && substage === 1">
            <div :class="$style.textContainer">
                <p>{{questionsData[0].title}}</p>
            </div>
            <div :class="$style.inputContainer" v-for="(answer, index) in questionsData[0].answers" :key="index">
                <div :class="[$style.inputItem, isWrong && radio === index + 1 && $style.wrong]">
                    <input v-model="radio" type="radio" :id="`radio${index}`" :value="index + 1">
                    <label :for="`radio${index}`" :class="$style.label" v-html="questionsData[0].answers[index]"></label>
                </div>
            </div>
            <v-btn @click="checkAnswer(0)" :class="$style.btn">Ответить</v-btn>
            <p v-if="isWrong && radio !== null" :class="$style.red" >Неверный ответ!</p>
        </div>
        <div v-if="stage === 2 && substage === 2">
            <div :class="$style.textContainer">
                <p>{{questionsData[1].title}}</p>
            </div>
            <div :class="$style.inputContainer" v-for="(answer, index) in questionsData[1].answers" :key="index">
                <div :class="$style.inputItem">
                    <input type="checkbox" :id="`checkbox${index}`" :value="index + 1" v-model="checkedArr">
                    <label :for="`checkbox${index}`" :class="$style.label">{{questionsData[1].answers[index]}}</label>
                </div>
            </div>
            <v-btn @click="checkAnswer(1)" :class="$style.btn">Ответить</v-btn>
            <p v-if="isWrong && checkedArr.length > 0" :class="$style.red" >Неверный ответ!</p>
        </div>
        <div v-if="stage === 3">
            <div :class="$style.textContainer">
                <template v-if="currentElement !== 4">
                    <p>Отлично!</p>
                    <p>Сохраняю информацию в базу данных.</p>
                    <p>Возьми пробирку, и перемести ее в штатив.</p>
                    <p>Добавь в нее воды и узнай растворимость вещества. Чтобы добавить воду, возьми промывалку и поднеси к пробирке.</p>
                </template>
                <template v-else>
                    <p>При разбавлении водой серная кислота сильно нагревается, поэтому мы не будем добавлять воду в пробирку. Перемести пробирку сразу в штатив.</p>
                </template>
            </div>
        </div>
        <div v-if="stage === 4">
            <div :class="$style.textContainer">
                <p>{{questionsData[2].title}}</p>
            </div>
            <div :class="$style.inputContainer" v-for="(answer, index) in questionsData[2].answers" :key="index">
                <div :class="[$style.inputItem, isWrong && radio === index + 1 && $style.wrong]">
                    <input v-model="radio" type="radio" :id="`radio${index}`" :value="index + 1">
                    <label :for="`radio${index}`" :class="$style.label">{{questionsData[2].answers[index]}}</label>
                </div>
            </div>
            <v-btn @click="checkAnswer(2)" :class="$style.btn">Ответить</v-btn>
            <p v-if="isWrong && radio !== null" :class="$style.red" >Неверный ответ!</p>
        </div>
        <div v-if="stage === 5">
            <div :class="$style.textContainer">
                <p>{{questionsData[3].title}}</p>
            </div>
            <div :class="$style.inputContainer" v-for="(answer, index) in questionsData[3].answers" :key="index">
                <div :class="[$style.inputItem, isWrong && radio === index + 1 && $style.wrong]">
                    <input v-model="radio" type="radio" :id="`radio${index}`" :value="index + 1">
                    <label :for="`radio${index}`" :class="$style.label">{{questionsData[3].answers[index]}}</label>
                </div>
            </div>
            <v-btn @click="checkAnswer(3)" :class="$style.btn">Ответить</v-btn>
            <p v-if="isWrong && radio !== null" :class="$style.red" >Неверный ответ!</p>
        </div>
        <div v-if="stage === 6">
            <div :class="$style.textContainer">
                <p>Отлично! Не забудь очистить пробирку!</p>
                <p>Чтобы вылить содержимое из пробирки, поднеси её к стакану.</p>
            </div>
        </div>
        <div v-if="stage === 7">
            <div :class="$style.textContainer">
                <p>Повесь пробирку на место, чтобы просушить.</p>
                <p v-if="!experimentNumber">Обрати внимание, что в карточке сверху появились результаты анализа вещества и формула вещества в кодировке SMILES.</p>
            </div>
        </div>
        <div v-if="stage === 8">
            <div :class="$style.textContainer">
                <p>Отлично! Перейдём к следующему веществу.</p>
            </div>
            <v-btn @click="$emit('changeStage', 8)" :class="$style.btn">Продолжить</v-btn>
        </div>
        <div v-if="stage === 9">
            <div :class="$style.textContainer">
                <p>Дальше я сам, спасибо!</p>
                <p :class="$style.animatedText">Анализирую миллионы веществ....</p>
                <p :class="$style.animatedText">Решаю уравнение зависимости структура-свойства.....</p>
                <p :class="$style.animatedText">Строю математическую модель......</p>
                <p :class="$style.animatedText">Корректирую результаты......</p>
                <div :class="$style.loadingContainer">
                    <div :class="$style.loading"></div>
                </div>
                <p :class="$style.animatedText">Обучение завершено!</p>
            </div>
            <v-btn @click="stage = 10" v-if="loadingOver" :class="$style.btn">Продолжить</v-btn>
        </div>
        <div v-if="stage === 10">
            <div :class="$style.textContainer">
                <p>Теперь я могу подобрать нужную структуру под определенное свойство. Попробуй!</p>
            </div>
            <v-btn @click="$emit('success')" :class="$style.btn">Продолжить</v-btn>
        </div>
    </div>
</template>

<script>
import questions from './questions'

export default {
    name: 'TabletTest',
    props: [
        'changeStage',
        'tabletReset',
        'currentElement',
        'changeStageToEnd',
        'experimentNumber',
        ],
    data: () => ({
        stage: 0,
        substage: 1,
        radio: null,
        checkedArr: [],
        isWrong: false,
        loadingOver: false,
    }),
    computed: {
        questionsData() {
            return questions[this.currentElement]
        },
    },
    methods: {
        checkAnswer(num) {
            if (num === 1) {
                this.isWrong = [...this.checkedArr].sort((a, b) => a - b).join('') !== this.questionsData[num].rightAnswer
                if (!this.isWrong) {
                    this.$emit('changeStage', 3)
                }
            } else {
                this.isWrong = this.radio !== this.questionsData[num].rightAnswer
            }
            if (this.isWrong) return false
            if (num === 0) {
                this.substage = 2
            } else {
                this.$emit('nextSlide')
            }
            if (num === 2 && (this.currentElement === 4)) {
                this.stage = 5
                this.$emit('changeStage', 6)
            }
            this.radio = null
            if (num === 3) {
                this.substage = 1
                this.checkedArr = []
                this.$emit('changeStage', 6)
            }
            return false
        },
    },
    watch: {
        changeStage: function increase() {
            if (this.stage < 9) {
                this.stage += 1
            }
        },
        changeStageToEnd: function increase() {
            this.stage = 9
        },
        tabletReset: function reset() {
            this.stage = 0
            this.substage = 1
            this.checkedArr = []
        },
        radio() {
            this.isWrong = false
        },
        checkedArr() {
            this.isWrong = false
        },
        stage() {
            if (this.stage === 9) {
                setTimeout(() => {
                    this.loadingOver = true
                }, 9000)
            }
        },
    },
}
</script>

<style lang="scss" module>
@keyframes shake {
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
}

.wrapper {
    z-index: 10;
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-sizing: content-box;
    p,label {
        font-family: 'Undertale Battle';
        font-style: normal;
        font-size: 2.1rem;
        line-height: 2.6rem;
        color: #00F7EA;
        margin: 1.5rem 0;
    }
    label {
        margin: 0;
        margin-left: 1.5rem;
    }
    input {
        cursor: pointer;
    }
    input[type="radio"] {
        appearance: none;
        background-color: transparent;
        border: .2rem solid #FFFFFF;
        border-radius: 50%;
        width: 2.8rem;
        height: 2.8rem;
    }
    input[type="radio"]:checked {
        background: #00F7EA;
        background-clip: content-box;
    }
    input[type="checkbox"] {
        appearance: none;
        background-color: transparent;
        border: .2rem solid #FFFFFF;
        width: 2.8rem;
        height: 2.8rem;
        min-width: 2.8rem;
        border-radius: 0;
    }
    input[type="checkbox"]:checked {
        background: #00F7EA;
        background-clip: content-box;
        background-image: url('../../../../../../assets/checkmark.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
    .btn {
        margin-top: 1rem;
        // padding: 1rem 3rem;
        font-size: 2.1rem;
    }
    .loadingContainer {
        width: 23.1rem;
        height: 3.2rem;
        border: .2rem solid #3EFAFA;
        padding: .2rem .1rem;
        overflow: hidden;
        opacity: 0;
        animation-name: loadingVisible;
        animation-delay: 6s;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        .loading {
            background-color: #3EFAFA;
            width: 0%;
            height: 100%;
            animation-fill-mode: forwards;
            animation-name: loading;
            animation-duration: 2s;
            animation-delay: 7s;
        }
    }
    .inputContainer {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        .inputItem {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            &:first-child {
                margin-top: -1.8rem;
            }
        }
    }
    .label {
        cursor: pointer;
        flex-grow: 0.5;
        padding-top: 1.8rem;
        padding-bottom: 1.8rem;
        padding-left: 2rem;
        margin-left: -0.2rem;
    }
    .wrong {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
        & input {
            background-color: rgb(254, 4, 74) !important;
        }
        & label {
            color: rgb(254, 4, 74) !important;
        }
    }
    .red {
        color: rgb(254, 4, 74)
    }
    .animatedText {
        opacity: 0;
        animation-name: textVisible;
        animation-duration: 2s;
        animation-fill-mode: forwards;
    }
    .animatedText:nth-child(1){
        animation-delay: 1s;
    }
    .animatedText:nth-child(2){
        animation-delay: 2s;
    }
    .animatedText:nth-child(3){
        animation-delay: 3s;
    }
    .animatedText:nth-child(4){
        animation-delay: 4s;
    }
    .animatedText:nth-child(5){
        animation-delay: 5s;
    }
    .animatedText:last-child{
        animation-delay: 9s;
    }
}

.textContainer {
    overflow: hidden;
}

@keyframes loading {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}
@keyframes loadingVisible {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
@keyframes textVisible {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
