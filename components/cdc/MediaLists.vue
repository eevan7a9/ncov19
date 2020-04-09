<template>
  <div>
    <b-alert
      v-model="showDismissibleAlert"
      class="mt-3"
      variant="danger"
      dismissible
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="attribution"></div>
    </b-alert>
    <div class="media-container row justify-content-center p-3">
      <b-card
        img-src="https://placekitten.com/200/200"
        img-alt="Card image"
        img-left
        class="mb-3 col-12"
      >
        <b-card-text>
          Some quick example text to build on the card and make up the bulk of
          the card's content.
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaLists',
  data() {
    return {
      attribution:
        '	"<div id="cdcAttribution" class="cdcAttribution">Content provided and maintained by the <a href="http://www.cdc.gov/" target="_blank">US Centers for Disease Control and Prevention</a> (CDC). Please see our system <a href="https://tools.cdc.gov/medialibrary/index.aspx#/usageguidelines/info" class="usageGuidelines" target="_blank">usage guidelines and disclaimer</a>.</div>"',
      showDismissibleAlert: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
