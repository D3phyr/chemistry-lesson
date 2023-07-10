<template>
<div :class="[$style.container, $props.wide && $style.wide]" @click="$emit('click')">
  <button :class="[$style.wrapper, $props.wide && $style.wide]" />
  <div :class="$style.textContainer">
    <slot />
  </div>
</div>
</template>

<script>
export default {
  name: 'v-btn',
  props: {
    wide: {
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  width: 16rem;
  height: 6rem;
  cursor: pointer;
  &:hover .wrapper{
    transform: scale(1.05);
    background: darken(#00F7EA, 5%);
  }
}
.wrapper {
  background: #00F7EA;
  border: 4px solid #FFFFFF;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  // padding: 1.5rem 4.2rem;
  width: 16rem;
  height: 6rem;
  transition: background-color .3s, transform .3s;
  z-index: 20;
  &:hover {
    transform: scale(1.05);
    background: darken(#00F7EA, 5%);
  }
  @media screen and (max-width: 800px) {
    border: 2px solid #FFFFFF;
  }
}
.textContainer {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.1rem;
  color: #1F3345;
}
.wide {
  width: 19rem !important;
}
</style>
