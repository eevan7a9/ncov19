<template lang="pug">
  div#mapContainer.h-100.w-100
    client-only
      l-map(:zoom=13 :center="[55.9464418,8.1277591]")
        l-tile-layer(url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
        l-marker(:lat-lng="[55.9464418,8.1277591]")

</template>

<script>
export default {
  name: 'CountriesMap',
  data() {
    return {
      domReady: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.domReady = true
    }, 2000)
  }
}
</script>

<style scoped></style>
