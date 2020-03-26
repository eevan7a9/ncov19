<template>
  <div class="d-flex flex-column vh-100">
    <TopNavbar />
    <div class="content-wrapper flex-grow-1 bg-success">
      <LeftSidebar class="left-sidebar m-0 p-0" />
      <nuxt class="main-view" />
    </div>
  </div>
</template>

<script>
import LeftSidebar from '@/components/leftSidebar/LeftSidebar'
import TopNavbar from '@/components/TopNavbar'
export default {
  components: {
    TopNavbar,
    LeftSidebar
  }
}
</script>

<style>
@import '~/assets/style/custom-style.css';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}
body {
  min-height: 100%;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.content-wrapper {
  display: grid;
  grid-template-columns: 300px 1fr;
}
</style>
