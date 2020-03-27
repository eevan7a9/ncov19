<template lang="pug">
  div.d-flex.flex-column
    div.row.m-0
      div.col-4.bg-success
        h1 Col -1
      div.col-4.bg-secondary
        h1 Col -2
      div.col-4.bg-primary
        h1 Col -3
    div.bg-warning.flex-grow-1
      h1 main cont
</template>

<script>
export default {
  layout: 'dashboard'
}
</script>

<style scoped></style>
