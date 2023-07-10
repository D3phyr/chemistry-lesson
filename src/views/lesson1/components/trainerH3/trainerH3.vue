<template>
  <div :class="$style.wrapper">
    <Tablet width="66.6rem" height="97.5rem" profBottom="-3rem" profRight="-0.4rem" :class="$style.tablet">
      <div :class="$style.inner">
        <p :class="$style.text">Обучение завершено!</p>
        <p :class="$style.text">Теперь я могу подобрать нужную структуру под определённое свойство. Попробуй!</p>
        <div v-for="tab in tabs" :key="tab.id">
          <span :class="[$style.tabTitle, `tab-${tab.id}`, currentTab === tab.id && $style.active]" @click="changeTab(tab.id)">{{tab.title}}</span>
        </div>
        <v-btn v-if="isBtnActive" @click="onClick" :class="$style.btn" :wide="true">Пройти тест</v-btn>
      </div>
      <Transition name="cards">
          <div v-if="isModalActive" :class="$style.modal">
          <img :class="$style.close" @click="onClose" src="../../../../assets/close.svg" width="18" height="18" alt="">
          <p :class="$style.modalFormula">{{currentTabData.formula}}</p>
          <img v-bind:src="'img/tab' + currentTabData.id + '.png'" :class="$style.img" />
          <div :class="$style.modalText" v-html="currentTabData.text"></div>
        </div>
        </Transition>
    </Tablet>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Tablet from '../../../../components/@ui/tablet/Tablet.vue'

export default {
  name: 'trainerH3',
  emits: ['success'],
  components: {
    Tablet,
  },
  setup(props, { emit }) {
    const currentTab = ref(0)
    const isModalActive = ref(false)
    const isBtnActive = ref(false)

    const onClick = () => {
      emit('success')
    }

    const tabs = [
      {
        id: 1,
        title: 'Можно сделать газировку',
        formula: 'C(=O)=O',
        text: 'Углекислый газ (CO<sub>2</sub>)<br>– Бесцветный<br>– Тяжелее воздуха<br>– При растворении в воде образует равновесную смесь раствора диоксида углерода и угольной кислоты<br>– Оксид',
      },
      {
        id: 2,
        title: 'Металл, который плавится в горячей воде',
        formula: 'Ga',
        text: 'Галлий (Ga)<br>– Серый цвет<br>– Температура плавления: 30 градусов<br>– Простое вещество',
      },
      {
        id: 3,
        title: 'Растворяет стекло',
        formula: 'HF',
        text: 'Плавиковая кислота (HF)<br>– Реагирует с оксидом кремния в составе стекла, в результате растворяет его<br> – Кислота',
      },
      {
        id: 4,
        title: 'Используют для очистки засорившихся труб',
        formula: '[OH-].[Na+]',
        text: 'Гидроксид натрия (NaOH)<br>– Раствор с большой концентрацией гидроксида натрия растворяет органические вещества (волосы, жиры и другие), которые, как правило, и являются причиной засорения труб<br>– Основание',
      },
      {
        id: 5,
        title: 'Можно сделать еду или воду соленой',
        formula: '[Na+].[Cl-]',
        text: 'Поваренная соль (NaCl)<br>– На поверхности языка содержатся специальные молекулы<br>– рецепторы, которые реагируют на присутствие катионов натрия<br>– так мы ощущаем солёный вкус<br>– Соль',
      },
    ]

    const changeTab = (id) => {
      if (currentTab.value === id) return
      if (isModalActive.value === true) {
        isModalActive.value = false
        setTimeout(() => {
          currentTab.value = id
          isModalActive.value = true
        }, 300)
      } else {
        currentTab.value = id
        isModalActive.value = true
      }
      isBtnActive.value = true
    }

    const onClose = () => {
      isModalActive.value = false
      currentTab.value = 0
    }

    const currentTabData = computed(() => tabs.find(item => item.id === currentTab.value))

    return {
      onClick,
      tabs,
      changeTab,
      currentTab,
      currentTabData,
      isModalActive,
      onClose,
      isBtnActive,
    }
  },
}
</script>

<style lang="scss">
  @keyframes slideIn {
    0% {
      transform: translateX(70rem);
      opacity: 0;
    }
    35% {
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    35% {
      opacity: 0;
    }
    100% {
      transform: translateX(50rem);
      opacity: 0;
    }
  }

  @keyframes tabs {
    0% {
      transform: translateX(10rem);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .cards-enter-active {
    animation: slideIn 0.5s;
  }
  .cards-leave-active {
    animation: slideOut 0.5s;
  }

  .tab-1 {
    animation: tabs 0.5s forwards;
    animation-delay: 0.5s;
  }

  .tab-2 {
    animation: tabs 0.5s forwards;
    animation-delay: 1s;
  }

  .tab-3 {
    animation: tabs 0.5s forwards;
    animation-delay: 1.5s;
  }

  .tab-4 {
    animation: tabs 0.5s forwards;
    animation-delay: 2s;
  }

  .tab-5 {
    animation: tabs 0.5s forwards;
    animation-delay: 2.5s;
  }

</style>

<style lang="scss" module src="./trainerH3.scss"></style>
