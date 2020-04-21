<template>
  <v-container>
    <h1 class="display-1 text-xs-center">Weather App</h1>
    <v-flex xs12>
      <v-card color="blue-grey darken-2" dark>
        <v-card-text>
          <v-layout justify-center>
            <v-flex xs4 class="text-xs-center">
              <h4>Temperature</h4>
              <h1 class="display-1">
                {{ weather.name }} in ({{ weather.sys.country }})
              </h1>
              <img :src="icon" alt="weather icon" />
              <p>
                <span class="display-1">{{ temp() }} &deg; F</span>
                <span class="caption ml-4">{{
                  weather.weather[0].description
                }}</span>
              </p>
            </v-flex>
            <v-flex xs4 class="text-xs-center">
              <h4>Wind & Pressure:</h4>
              <h3 class="headline">
                Wind: {{ weather.wind.speed }} m/s ({{ weather.wind.deg }}
                &deg;)
              </h3>
              <h3 class="headline mt-4">
                Humidity: {{ weather.main.humidity }} %
              </h3>
              <h3 class="headline mt-4">
                Pressure: {{ weather.main.pressure }} hPa
              </h3>
            </v-flex>
            <v-flex xs4 class="text-xs-center">
              <h4>Other:</h4>
              <h3 class="headline mt-4">
                Max Temperature:
                {{ Math.round(weather.main.temp_max) }} &deg; F
              </h3>
              <h3 class="headline mt-4">
                Min Temperature:
                {{ Math.round(weather.main.temp_min) }} &deg; F
              </h3>
              <!-- <h3 class="headline mt-4">
                Sunrise:
                {{ weather.sys.sunrise }}
              </h3>
              <h3 id="dateDisplay" class="headline mt-4">
                Sunset:
                {{ weather.sys.sunset }}
              </h3> -->
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 class="mt-4">
      <v-form @submit.prevent="getWeatherInfo">
        <span>Enter City Name, State</span>
        <v-text-field
          v-model="city"
          label="Enter City Name, State"
          solo
        ></v-text-field>
      </v-form>
    </v-flex>
    <GChart
      :settings="{ packages: ['bar'] }"
      :data="chartData"
      :options="chartOptions"
      :create-chart="(el, google) => new google.charts.Bar(el)"
      @ready="onChartReady"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { GChart } from 'vue-google-charts'

export default {
  // graph
  components: {
    GChart
  },
  data(actions) {
    return {
      chartsLib: null,
      chartData: [
        ['Temperature', 'Min temp(f)', 'Max temp(f)', 'Average Temp(f)'],
        ['Today', 300, 400, 200]
      ]
    }
  },

  // FINAL
  computed: {
    ...mapState('weather', ['weather']),
    city: {
      get() {
        return this.$store.state.weather.city
      },
      set(value) {
        this.$store.commit('weather/setCity', value)
      }
    },
    state: {
      get() {
        return this.$store.state.weather.state
      },
      set(value) {
        this.$store.commit('weather/setState', value)
      }
    },
    temperatureMax: {
      get() {
        return this.$store.state.weather.main.temp_max
      },
      set(value) {
        this.$store.commit('weather/setTempMax', value)
      }
    },
    icon() {
      return this.weather.weather
        ? `https://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`
        : ''
    },
    // GRAPH
    chartOptions() {
      if (!this.chartsLib) return null
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: 'Todays Weather',
          subtitle: 'A quick example of temperatures graphed'
        },
        bars: 'horizontal', // Required for Material Bar Charts.
        hAxis: { format: 'decimal' },
        height: 400,
        colors: ['#1b9e77', '#d95f02', '#7570b3']
      })
    }
  },
  fetch({ store, $axios }) {
    return store.dispatch('weather/getWeatherInfo')
  },
  methods: {
    getWeatherInfo() {
      this.$store.dispatch('weather/getWeatherInfo')
    },
    temp() {
      return Math.round(this.weather.main.temp)
    },
    // GRAPH
    onChartReady(chart, google) {
      this.chartsLib = google
    }
  }
}
</script>

<style></style>
