<template lang="pug">
  div.container
    div
      b-img( src="https://cdn.pixabay.com/photo/2020/03/14/12/56/corona-4930541_960_720.jpg" fluid-grow alt="pixabay")
    h1.mt-3 COVID-19
    p
      | Coronavirus disease 2019 (COVID-19) is a respiratory illness that can spread from person to person. The virus that causes COVID-19 is a novel coronavirus that was first identified during an investigation into an outbreak in Wuhan, China
    hr
    h1.mt-5 Application
    p.m-0.p-0
      | To visualize covid19&nbsp;
      i Confirmed cases, Deaths, Recovered.
    hr
    h1.mt-5 Attribution
    p Data being displayed were sourced from&nbsp;
      a(href="https://github.com/CSSEGISandData/COVID-19" target="_blank") Johns Hopkins CSSE
    p.m-0.p-0
      | API provided by  &nbsp;
      a(href="https://rapidapi.com/" target="_blank") Rapidapi
      | &nbsp;&&nbsp;
      a(href="https://covid19api.com/" target="_blank") covid19api
    h4.mt-3 Tools used:
    ul
      li.py-2 Nuxtjs
      li.py-2 Chartjs
      li.py-2 Vue2-Leaflet
      li.py-2 Openstreetmap
      li.py-2 Bootstrap-vue
    hr
    p.py-5.font-weight-bold Source code of this project &nbsp;
      a.font-weight-normal(href="https://github.com/eevan7a9/ncov19" target="_blank") https://github.com/eevan7a9/ncov19
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
