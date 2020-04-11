<template lang="pug">
  b-card( no-body class="mb-3  overflow-hidden" style="max-width: 100%;"
    data-aos="fade-up"
    data-aos-offset="200"
    data-aos-delay="50"
    data-aos-duration="900"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
    data-aos-once="true"
    data-aos-anchor-placement="top-bottom"
    )
    b-row(no-gutters)
      b-col( :md="media.alternateImages[2] && showPhoto ? 6 : 12")
        b-card-body
          h5
            nuxt-link(:to="{ name: 'Media-content', params: { content: media.id }}")  {{ media.name }}
          b-card-text {{ media.description }}
          hr
          small
              div(v-html="media.attribution")
      b-col( v-if="media.alternateImages[2]" md="6")
        nuxt-link(:to="{ name: 'Media-content', params: { content: media.id }}")
          b-card-img(
            v-if="showPhoto"
            :src="media.alternateImages[2] ? media.alternateImages[2].url : ''"
            alt="Image"
            class="rounded-0")
</template>

<script>
export default {
  props: {
    media: {
      require: true,
      type: Object,
      default: () => {}
    },
    showPhoto: {
      require: false,
      type: Boolean,
      default: () => true
    }
  }
}
</script>

<style lang="scss" scoped></style>
