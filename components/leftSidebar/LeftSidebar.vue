<template lang="pug">
  div( class="left-sidebar-wrapepr  bg-dark text-light d-flex flex-column h-100"
  v-bind:class="leftSidebar ? 'show' : ''")
    div.d-flex.justify-content-end.align-items-center.text-light
      h6#toggleSidebar.m-0
        BIconArrowBarLeft(class="m-2 mr-3 font-weight-bold" font-scale="2"
          @click="toggleLeftSidebar"
          v-if="leftSidebar"
        )
        BIconBoxArrowInRight(class="m-2 mr-3 font-weight-bold" font-scale="2"
          @click="toggleLeftSidebar"
          v-if="!leftSidebar"
        )
    div.topnav-left-sidebar.bg-danger.m-0(v-show="leftSidebar")
      h5.text-capitalize.text-center.py-3 Countries
    div#content-left-sidebar.py-2.pl-2(v-show="leftSidebar")
      CountriesList
</template>

<script>
import { BIcon, BIconArrowBarLeft, BIconBoxArrowInRight } from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'
import CountriesList from '@/components/countries/CountriesList'
export default {
  components: {
    BIcon,
    BIconArrowBarLeft,
    BIconBoxArrowInRight,
    CountriesList
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
  #toggleSidebar {
    cursor: pointer;
    &:hover {
      background: #222;
    }
  }
}
#content-left-sidebar {
  position: relative;
  height: 0;
  flex-grow: 1;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
