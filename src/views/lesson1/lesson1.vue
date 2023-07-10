<template>
  <div :class="$style.wrapper">
    <transition name="reveal" mode="out-in">
      <trainerH1 v-if="stage === 1" @success="next" />
      <trainerH2 v-if="stage === 2" @success="next" />
      <trainerH3 v-if="stage === 3" @success="next" />
      <trainerH4 v-if="stage === 4" @success="next" />
      <trainerH5 v-if="stage === 5" />
    </transition>
  </div>
</template>
<script>
import trainerH1 from './components/trainerH1/trainerH1.vue'
import trainerH2 from './components/trainerH2/trainerH2.vue'
import trainerH3 from './components/trainerH3/trainerH3.vue'
import trainerH4 from './components/trainerH4/trainerH4.vue'
import trainerH5 from './components/trainerH5/trainerH5.vue'

// import saveDataMixin from '@/mixins/saveData'

export default {
  name: 'Lesson1',
  components: {
    trainerH1,
    trainerH2,
    trainerH3,
    trainerH4,
    trainerH5,
  },
  // mixins: [saveDataMixin],
  methods: {
    next() {
      this.stage += 1
    },
    prev() {
      this.stage -= 1
    },
  },
  data: () => ({
    stage: 1,
  }),
  computed: {
  },
  created() {
  },
}
</script>
<style lang="scss" module>
.wrapper {
  height: 100%;
  min-height: 68rem;
  background-image: url('../../assets/background.svg');
  background-color: #00c1d1;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
}
</style>
