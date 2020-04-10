<template lang="pug">
  div.container
    div
      b-img( src="https://ik.imagekit.io/wr5lnrww0q8/ncov19/quarantine-4925797_1920_1__fzXtJVrYS.jpg" fluid-grow alt="pixabay")
    h1.mt-3 COVID-19
    p
      | Coronavirus disease 2019 (COVID-19) is a respiratory illness that can spread from person to person. The virus that causes COVID-19 is a novel coronavirus that was first identified during an investigation into an outbreak in Wuhan, China
    hr
    h1.mt-5 Application
    p.m-0.p-0
      | To visualize covid19&nbsp;
      i Confirmed cases, Deaths, Recovered.
    div.row
      div.mt-5.col-sm-6
        img(src="../../assets/illustration/presentation_.svg", alt="graph")
      div.col-sm-6.pt-3
        p
          strong Charts of Covid19 cases
          | &nbsp;can be assessed better by using a graph. The use of a graph will present data in a quick way, lift out the most important facts and will be easily remembered.
          | &nbsp;hopefully this can help you keep track of this global pandemic.
        p.mt-4
          strong Word map with affected countries.
          | &nbsp;Maps are the essential tools for geographical information visualization.
          | &nbsp;Quantitatively mapping the spatial distributions of infectious diseases is key to both investigating their epidemiology and identifying populations at risk of infection.
    hr
    div.row
      div.col-md-6
        h1.mt-5 Attribution
        p Data being displayed were sourced from&nbsp;
          a(href="https://github.com/CSSEGISandData/COVID-19" target="_blank") Johns Hopkins CSSE
        h5.mb-3 API provided by
        ul
          li.mt-2 Api data &nbsp;
              a(href="https://rapidapi.com/" target="_blank") Rapidapi
          li.mt-2 Api data &nbsp;
            a(href="https://covid19api.com/" target="_blank") covid19api
        h5.mb-3 Media provided by
        ul
          li.mt-2 Media Library from &nbsp;
            a(href="https://tools.cdc.gov/medialibrary/index.aspx#/results" target="_blank") CDC
        h5.mb-3 Images & Illustration provided by
        ul
          li.mt-2 Images used on this project were from
            a(href="https://pixabay.com/") &nbsp;Pixabay
          li.mt-2 Illustations used on this project were from
            a(href="https://www.manypixels.co/") &nbsp;Manypixel
      div.col-md-6
        h1.mt-3 Tools used:
        ul
          li.py-2 Nuxtjs
          li.py-2 Chartjs
          li.py-2 Vue2-Leaflet
          li.py-2 Openstreetmap
          li.py-2 Bootstrap-vue
          li.py-2 vue-dragscroll
          li.py-2 Axios
    hr
    p.py-3.font-weight-bold.text-center Source code of this project &nbsp;
      a.font-weight-normal(href="https://github.com/eevan7a9/ncov19" target="_blank") https://github.com/eevan7a9/ncov19
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
