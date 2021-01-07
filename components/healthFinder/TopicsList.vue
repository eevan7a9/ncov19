<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Health and Wellness Topics</h4>
        <div class="card-subtitle mb-2 text-muted">
          Additional info from
          <a href="https://health.gov/">health.gov </a>
        </div>
      </div>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li
            v-for="topic of topics"
            :key="topic.Id"
            class="list-group-item"
            @click="viewTopic(topic.Id)"
          >
            {{ topic.Title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      topics: []
    }
  },
  async fetch() {
    const result = await axios.get(
      `https://health.gov/myhealthfinder/api/v3/itemlist.json?Type=topic`
    )
    this.topics = result.data.Result.Items.Item
  },
  methods: {
    viewTopic(topicId) {
      this.$router.push({ path: '/media/health/' + topicId })
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
  text-decoration: underline;
}
li:hover {
  opacity: 0.8;
  color: rgb(1, 143, 238);
}
</style>
