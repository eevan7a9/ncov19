<template>
  <div id="articles" class="bg-light">
    <div class="container">
      <MediaLists />
    </div>
  </div>
</template>

<script>
import MediaLists from '@/components/cdc/MediaLists'
export default {
  name: 'Articles',
  components: {
    MediaLists
  }
}
</script>

<style lang="scss" scoped>
#articles {
  min-height: 100vh;
}
</style>
