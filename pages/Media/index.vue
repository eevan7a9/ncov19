<template>
  <div id="articles" class="bg-light">
    <div class="container" style="background: white;">
      <div class="row">
        <MediaLists class="col-md-8 mt-3" />
        <TopicsList class="col-md-4 mt-3" />
      </div>
    </div>
  </div>
</template>

<script>
import MediaLists from '@/components/cdc/MediaLists'
import TopicsList from '@/components/healthFinder/TopicsList'
export default {
  name: 'Articles',
  components: {
    MediaLists,
    TopicsList
  }
}
</script>

<style lang="scss" scoped>
#articles {
  min-height: 100vh;
}
</style>
