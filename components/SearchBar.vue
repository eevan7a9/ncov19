<template lang="pug">
  b-nav-form(@submit.prevent="searchWord")
    b-form-input(size="sm" class="mr-sm-2" v-model="word" placeholder="Search")
    b-button(size="sm"
    class="nav-link my-2 my-sm-0 px-3 py-1 text-light font-weight-bold"
    type="submit" target="_self" variant="primary"
    )
      | Search
</template>
<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      word: ''
    }
  },
  methods: {
    searchWord() {
      this.$router.push({
        name: 'Search-content',
        params: { content: this.word }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
