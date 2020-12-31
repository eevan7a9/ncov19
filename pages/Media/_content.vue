<template lang="pug">
  div(class="container bg-light pb-5")
    div(v-if="!content"
      class="vh-100 d-flex justify-content-center align-items-center")
      b-spinner(
        style="width: 3rem; height: 3rem;"
        label="Large Spinner"
        variant="danger")
    div(v-else)
      h1( id="content-title" class="py-lg-5 py-3 ") {{ name }}
      p {{ description }}
      <!-- eslint-disable-next-line vue/no-v-html -->
      div( class=" px-md-5" v-html="content")
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      content: null,
      name: null,
      description: null
    }
  },
  async fetch() {
    const result = await axios.get(
      `https://tools.cdc.gov/api/v2/resources/media/${this.$route.params.content}/syndicate.json`
    )
    this.content = result.data.results.content
    this.name = result.data.results.name
    this.description = result.data.results.description
  }
}
</script>

<style lang="scss" scoped>
button {
  margin-top: 10px;
}
a {
  color: red !important;
}
@media (max-width: 920px) {
  #content-title {
    font-size: 2rem;
  }
}
</style>
