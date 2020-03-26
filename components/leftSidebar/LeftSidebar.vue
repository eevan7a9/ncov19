<template>
  <div class="bg-dark text-light">
    <h1 class="m-0">Hello World</h1>
    <p>{{ leftSidebar }}</p>
    <button @click="toggleLeftSidebar">toggle Navbar</button>
  </div>
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

<style></style>
