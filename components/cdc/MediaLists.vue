<template lang="pug">
  div
    b-alert(
      v-model="showDismissibleAlert"
      class="mt-3"
      variant="danger"
      dismissible)

      <!-- eslint-disable-next-line vue/no-v-html -->
      div(v-html="attribution")
    div.vh-100.d-flex.justify-content-center.align-items-center(v-if="!getCdcMedia.length")
      b-spinner(
        style="width: 3rem; height: 3rem;"
        label="Large Spinner"
        variant="danger")
    div.media-container.row.justify-content-center.p-3(v-else)
      div(v-for="(media, i) in getCdcMedia" :key="i" class="col-lg-6")
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
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MediaLists',
  async fetch() {
    if (!this.getCdcMedia.length) {
      const result = await this.$axios.get(
        'https://tools.cdc.gov/api/v2/resources/media?languageisocode=eng'
      )
      this.SET_MEDIA(result.data.results)
    }
  },
  data() {
    return {
      attribution:
        '	"<div id="cdcAttribution" class="cdcAttribution">Content provided and maintained by the <a href="http://www.cdc.gov/" target="_blank">US Centers for Disease Control and Prevention</a> (CDC). Please see our system <a href="https://tools.cdc.gov/medialibrary/index.aspx#/usageguidelines/info" class="usageGuidelines" target="_blank">usage guidelines and disclaimer</a>.</div>"',
      showDismissibleAlert: true
    }
  },
  computed: mapGetters('cdc', ['getCdcMedia']),
  methods: {
    ...mapMutations('cdc', ['SET_MEDIA'])
  }
}
</script>
<style lang="scss" scoped></style>
