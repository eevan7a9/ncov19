<template lang="pug">
  div( class="left-sidebar-wrapepr bg-dark text-light" v-bind:class="leftSidebar ? 'show' : ''")
    div.d-flex.justify-content-end.align-items-center.text-light
      h6.m-0
        BIconArrowBarLeft(class="m-2 mr-3 font-weight-bold" font-scale="2"
          @click="toggleLeftSidebar"
          v-if="leftSidebar"
        )
        BIconBoxArrowInRight(class="m-2 mr-3 font-weight-bold" font-scale="2"
          @click="toggleLeftSidebar"
          v-if="!leftSidebar"
        )
    div.topnav-left-sidebar.bg-danger.m-0(v-show="leftSidebar")
      h5 header

</template>

<script>
import { BIcon, BIconArrowBarLeft, BIconBoxArrowInRight } from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    BIcon,
    BIconArrowBarLeft,
    BIconBoxArrowInRight
  },
  computed: mapGetters('leftSidebar', ['leftSidebar']),
  methods: {
    ...mapActions('leftSidebar', ['toggleLeftSidebar'])
  }
}
</script>

<style lang="scss" scoped>
.left-sidebar-wrapepr {
  width: 50px;
  transition: ease-in-out 0.3s;
  &.show {
    width: 300px;
  }
}
</style>
