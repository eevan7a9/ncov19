<template lang="pug">
  b-card( no-body class="mb-3  overflow-hidden" style="max-width: 100%;")
    b-row(no-gutters)
      b-col( v-if="media.alternateImages[2]" md="6")
        nuxt-link(:to="{ name: 'Media-content', params: { content: media.id }}")
          b-card-img(
            :src="media.alternateImages[2] ? media.alternateImages[2].url : ''"
            alt="Image"
            class="rounded-0")
      b-col( :md="media.alternateImages[2] ? 6 : 12")
        b-card-body
          h5
            nuxt-link(:to="{ name: 'Media-content', params: { content: media.id }}")  {{ media.name }}
          b-card-text {{ media.description }}
          hr
          small
              div(v-html="media.attribution")
</template>

<script>
export default {
  props: {
    media: {
      require: true,
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped></style>
