<template>
  <div class="container pt-3">
    <div
      v-if="!topic"
      class="vh-100 d-flex justify-content-center align-items-center"
    >
      <b-spinner
        style="width: 3rem; height: 3rem;"
        label="Large Spinner"
        variant="danger"
      ></b-spinner>
    </div>
    <div v-else>
      <div class="card">
        <h1 class="card-header text-center">
          {{ topic.Title }}
        </h1>
      </div>

      <div class="card mt-3">
        <div class="card-header d-flex justify-content-between bg-light">
          <b-button
            variant="outline-primary"
            :disabled="!currentSection"
            @click="prevSection()"
          >
            <BIconArrowLeft />
            Prev
          </b-button>

          <b-button
            variant="outline-primary"
            :disabled="currentSection + 1 === sections.length"
            @click="nextSection()"
          >
            Next
            <BIconArrowRight />
          </b-button>
        </div>
        <div :key="currentSection" class="card-body">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="sections[currentSection].Content"></div>
        </div>
        <div class="card-footer text-center font-weight-bolder">
          {{ currentSection + 1 }} of {{ sections.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { BIconArrowRight, BIconArrowLeft } from 'bootstrap-vue'

export default {
  components: {
    BIconArrowRight,
    BIconArrowLeft
  },
  data() {
    return {
      topic: null,
      currentSection: 0,
      sections: []
    }
  },
  async fetch() {
    try {
      const result = await axios.get(
        `https://health.gov/myhealthfinder/api/v3/topicsearch.json?TopicId=${this.$route.params.topic}`
      )
      this.topic = result.data.Result.Resources.Resource[0]
      this.sections = this.topic.Sections.section
    } catch (_) {
      this.$router.push({ path: '/media' })
    }
  },
  methods: {
    nextSection() {
      if (this.currentSection + 1 < this.sections.length) {
        this.currentSection++
      }
    },
    prevSection() {
      if (this.currentSection > 0) {
        this.currentSection--
      }
    }
  }
}
</script>

<style scoped></style>
