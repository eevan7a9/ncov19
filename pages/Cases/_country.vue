<template lang="pug">
  div.d-flex.flex-column(v-if="initDom")
    div#topPanels.row.m-0.bg-dark(:class="showTopPanel ? 'show': 'hide'")
      div.country-cases.col-sm-6.p-0.h-100

      div.country-numbers.col-sm-6.p-0.h-100

    button.slider-button.p-0.btn.btn-dark.d-flex.justify-content-center.align-items-center(
      @click="showTopPanel=!showTopPanel"
    )
      small
         BIconTriangleFill(:flip-v="!showTopPanel")
    div.flex-grow-1
      CountryTimeline

</template>

<script>
import { BIcon, BIconTriangleFill } from 'bootstrap-vue'
import CountryTimeline from '@/components/countries/CountryTimeline'
export default {
  layout: 'dashboard',
  components: {
    BIcon,
    BIconTriangleFill,
    CountryTimeline
  },
  data() {
    return {
      initDom: true,
      showTopPanel: true,
      country: this.$route.params.country
    }
  }
}
</script>

<style lang="scss" scoped>
#topPanels {
  overflow: hidden;
  // background: aliceblue;
  &.show {
    height: 300px;
  }
  &.hide {
    height: 0;
  }
  div {
    border: 1px solid rgb(121, 121, 121);
  }
}
.slider-button {
  height: 25px;
  color: #c4c4c4;
  border-radius: 0;
  &:hover:before {
    transform: scale(1.2);
    box-shadow: 0 0 15px #ffffff;
    filter: blur(3px);
  }
  &:hover {
    color: aliceblue;
    box-shadow: 0 0 15px #7e7976;
    text-shadow: 0 0 15px #fffcfa;
  }
}
</style>
