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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
    country: {
      get() {
        return this.$store.state.weather.country
      },
      set(value) {
        this.$store.commit('weather/setCountry', value)
      }
    },
    icon() {
      return this.weather.weather
        ? `https://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`
        : ''
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
    }
  }
}
</script>

<style></style>
