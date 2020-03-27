<template lang="pug">
  div
    h1 {{country}}

</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      country: this.$route.params.country
    }
  }
}
</script>

<style></style>
