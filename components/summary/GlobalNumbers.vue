<template lang="pug">
  div.text-light.h-100.text-center
    h1.text-uppercase Global Numbers
    div.mt-4
      h3.text-warning Confirmed:
        small.m-0.ml-2.p-0.text-light.font-weight-bold 340,321
      h3.text-danger Deaths:
        small.m-0.ml-2.p-0.text-light.font-weight-bold 23,321
      h3.text-success Recovered:
        small.m-0.ml-2.p-0.text-light.font-weight-bold 133,321
</template>

<script>
export default {
  name: 'GlobalNumbers'
}
</script>

<style lang="scss" scoped></style>
