<template>
  <div :class="$style.tablet" :style="{'max-width': $props.width, 'max-height': $props.height}">
    <slot />
    <div :class="$style.professor" :style="{'bottom': $props.profBottom, 'right': $props.profRight}"></div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    profBottom: {
      type: String,
    },
    profRight: {
      type: String,
    },
  },
}
</script>

<style lang="scss" module>
.tablet {
  background-color: transparent;
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/tablet.svg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: top center;
  padding: 5.7rem 4.6rem;
}

.professor {
  background-image: url("../../../assets/professor.svg");
  background-size: contain;
  background-repeat: no-repeat;
  max-width: 38.7rem;
  width: 100%;
  max-height: 36.5rem;
  height: 100%;
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

@media screen and (max-height: 750px) {
  .professor {
    max-width: 26rem;
    max-height: 26rem;
  }
}

@media screen and (max-width: 900px) {
  .professor {
    max-width: 26rem;
    max-height: 26rem;
  }
}
</style>
