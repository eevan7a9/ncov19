<template lang="pug">
  div( class="left-sidebar-wrapepr bg-dark text-light" v-bind:class="leftSidebar ? 'show' : ''")
    h1.m-0 Hello World
    p {{leftSidebar}}
    button( @click="toggleLeftSidebar") toggle Navbar

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters('leftSidebar', ['leftSidebar']),
  methods: {
    ...mapActions('leftSidebar', ['toggleLeftSidebar'])
  }
}
</script>

<style lang="scss" scoped>
.left-sidebar-wrapepr {
  width: 50px;
  &.show {
    width: 300px;
    transition: 0.4s;
  }
}
</style>
