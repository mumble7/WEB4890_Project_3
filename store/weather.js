export const state = () => ({
  city: 'Ogden, Utah',
  weather: {},
  weather2: {}
})

export const mutations = {
  setCity(state, payload) {
    state.city = payload
  },
  setState(state, payload) {
    state.state = payload
  },
  setCountry(state, payload) {
    state.country = payload
  },
  setWeather(state, payload) {
    state.weather = payload
  }
}

// Using Axios to grab the api with my api key
export const actions = {
  getWeatherInfo(context) {
    return this.$axios
      .$get(
        // `https://api.openweathermap.org/data/2.5/weather?q=${
        //   context.state.city
        // }&appid=9f2b622137c42ebb4b6d309cdc264774`
        `https://api.openweathermap.org/data/2.5/weather?q=${
          context.state.city
        },{context.state.state}&units=imperial&appid=9f2b622137c42ebb4b6d309cdc264774`
      )
      .then((res) => context.commit('setWeather', res))
  }
}

export const actionsHome = {
  getWeatherInfo(context) {
    return this.$axios
      .$get(
        `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units=imperial&appid=9f2b622137c42ebb4b6d309cdc264774`
      )
      .then((res) => context.commit('setWeather', res))
  }
}
