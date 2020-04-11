# ncov19

Data visualize covid19 cases.

Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus. - [WHO](https://www.who.int/health-topics/coronavirus#tab=tab_1)

## Attributions

- **DATA SOURCE**
  - [**Johns Hopkins CSSE**](https://github.com/CSSEGISandData/COVID-19)
  - [**CDC Media Library**](https://tools.cdc.gov/medialibrary/index.aspx#/results)
- **API PROVIDERS**

  - [**covid19api.com**](https://covid19api.com/)
  - [**rapidApi COVID-19**](https://rapidapi.com/api-sports/api/covid-193)

## Framework & Libraries

- [Nuxtjs](https://nuxtjs.org/guide/installation)
- [Chartjs](https://www.chartjs.org/)
- [vue2-leaflet](https://vue2-leaflet.netlify.com/)
- [openstreetmap](https://www.openstreetmap.org/)
- [Bootstrap-vue](bootstrap-vue.js.org/)
- [Axios](https://www.npmjs.com/package/axios)
- [vue-dragscroll](https://www.npmjs.com/package/vue-dragscroll)
- [AOS](https://michalsnik.github.io/aos/)

## Build Setup

### Setup Api Key

1. navigate to `assets/`
2. create a file named `rapidapi.js`
3. copy content of `rapidapi.js.sample` & paste on `rapidapi.js`
4. edit `rapidapi.js` and enter your rapidApi `x-rapidapi-host` & `x-rapidapi-key`

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
