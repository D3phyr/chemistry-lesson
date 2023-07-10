<template>
  <div :class="$style.container" @click="popup = true">
    <div :class="$style.text">
      <div :class="$style.name">Гидроксид Меди</div>
      <div v-if="$props.status === 2" :class="$style.description">[Cu+2].[OH-].[OH-]</div>
    </div>
    <div :class="$style.status">
      <template v-if="$props.status === 1">
        <svg width="50" height="50" viewBox="0 0 117 173" fill="none" xmlns="http://www.w3.org/2000/svg" class="clock-svg">
          <clipPath id="sand-wrapper">
            <rect width="100" height="200" fill='green' />
          </clipPath>
          <clipPath id="sand">
            <rect width="80" height="80" y="0" x='20' rx="10" class='rotate sand' fill='red' />
          </clipPath>
          <use clip-path="url(#sand-wrapper)" href="#sand-clock" fill="#1F3345" />
          <use clip-path="url(#sand)" href="#sand-clock" fill="white" rx='15' />
          <path id='sand-clock' d="M14.0825 34.0969L43.1153 72.1609V99.9789L14.0825 138.043C6.55219 147.916 13.5924 162.14 26.0092 162.14H91.1744C103.591 162.14 110.631 147.916 103.101 138.043L74.7528 100.876V71.2634L103.101 34.0969C110.631 24.2242 103.591 10 91.1744 10H26.0092C13.5924 10 6.55218 24.2242 14.0825 34.0969Z" stroke="#1F3345" stroke-width="10" />
        </svg>
      </template>
    </div>
    <portal to="popup">
      <div v-if="popup" :class="$style.overlay" @click="popup = false">
        <div :class="$style.popupContainer" @click.stop>
          <div :class="$style.closeButton" @click="popup = false">
            <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 16L16 2" stroke="#1F3345" stroke-width="3" stroke-linecap="round"/>
              <path d="M16 16L2 2" stroke="#1F3345" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <template v-if="$props.status === 2">
            <img :class="$style.image" src="./elem1Image.png" alt="">
            <div :class="$style.info">
              Гидроксид Меди (Cu(OH)<sub>2</sub>) <br/>
              – Может образовывать кристаллы<br/>
              – Синий цвет<br/>
              – Не проводит ток<br/>
            </div>
          </template>
          <template v-else>
            <div :class="$style.noImage">?</div>
            <div :class="$style.noInfo">
              Вещество ешё не просканировано
            </div>
          </template>
        </div>
      </div>
    </portal>
  </div>
</template>
<script>
export default {
  name: 'v-elemDesc',
  props: {
    elem: {
      type: String,
    },
    status: {
      type: Number,
    },
  },
  data: () => ({
    popup: false,
  }),
}
</script>
<style lang="scss" module>
.container {
  width: 18rem;
  height: 6.1rem;
  border: .2rem solid #1F3345;
  box-shadow: 0px .2rem .4rem rgba(69, 85, 114, 0.2);
  border-radius: 15px;
  background: #FFFFFF;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  .status {
    height: 100%;
    width: 1.6rem;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    width: 12rem;
    .name {
      font-family: 'Undertale Battle Font';
      font-style: normal;
      font-weight: 0;
      font-size: 1.4rem;
      line-height: 1.4rem;
      color: #1F3345;
      font-family: 'Undertale Battle', sans-serif;
    }
    .description {
      font-family: 'Undertale Battle Font';
      font-style: normal;
      font-weight: 0;
      font-size: 1.2rem;
      line-height: 1.2rem;
      font-family: 'Undertale Battle', sans-serif;
      color: #1F3345;
    }
  }
}
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  .popupContainer {
    width: 45rem;
    height: 37.9rem;
    background: #FFFFFF;
    border: .3rem solid #1F3345;
    border-radius: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 4rem 3rem 3rem;
    .closeButton {
      position: absolute;
      top: 2rem;
      right: 2rem;
      width: 1.4rem;
      height: 1.4rem;
      font-size: 0;
      cursor: pointer;
      svg {
        width: 100%;
      }
    }
    .noImage {
      font-family: 'Undertale Battle Font';
      font-style: normal;
      font-weight: 0;
      font-size: 10.1rem;
      line-height: 12.3rem;
      text-align: center;
      color: rgba(31, 51, 69, 0.2);
      width: 100%;
      margin-top: 5rem;
      font-family: 'Undertale Battle', sans-serif;
    }
    .noInfo {
      font-family: 'Undertale Battle Font';
      font-style: normal;
      font-weight: 0;
      font-size: 2.1rem;
      line-height: 2.6rem;
      color: #1F3345;
      text-align: center;
      font-family: 'Undertale Battle', sans-serif;
    }
    .image {
      width: 100%;
      height: 16.5rem;
      object-fit: contain;
    }
    .info {
      font-family: 'Undertale Battle Font';
      font-style: normal;
      font-weight: 0;
      font-size: 2.1rem;
      line-height: 2.6rem;
      color: #1F3345;
      font-family: 'Undertale Battle', sans-serif;
    }
  }
}
</style>
