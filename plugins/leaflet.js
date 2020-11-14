import Vue from 'vue'
import { LMap, LTileLayer, LMarker, LCircle, LPopup } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
// we add vue-choropleth
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-circle', LCircle)
Vue.component('l-popup', LPopup)
// we add vue-choropleth components
Vue.component('l-info-control', InfoControl)
Vue.component('l-reference-chart', ReferenceChart)
Vue.component('l-choropleth-layer', ChoroplethLayer)
