<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1 class="display-1">All Questions</h1>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="questions"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.name }}</td>

                <td class="text-xs-left">{{ props.item.sponser }}</td>
                <td class="text-xs-left">{{ props.item.bike }}</td>
                <td class="text-xs-left">{{ props.item.Maribor }}</td>
                <td class="text-xs-left">{{ props.item.Fort_William }}</td>
                <td class="text-xs-left">{{ props.item.Leogang }}</td>
                <td class="text-xs-left">{{ props.item.Les_Gets }}</td>
                <td class="text-xs-left">{{ props.item.Val_di_Sole }}</td>
                <td class="text-xs-left">{{ props.item.Lenzerheide }}</td>
                <td class="text-xs-left">{{ props.item.Snowshoe }}</td>
                <td class="text-xs-left">{{ props.item.worldchamps }}</td>
                <td class="text-xs-left">{{ props.item.overall }}</td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      headers: [
        { text: 'Athlete Name', value: 'name' },
        { text: 'Primary Sponser', value: 'sponser' },
        { text: 'Bike', value: 'bike' },
        { text: 'Maribor', value: 'Maribor' },
        { text: 'Fort William', value: 'Fort William' },
        { text: 'Leogang', value: 'Leogang' },
        { text: 'Les Gets', value: 'Les Gets' },
        { text: 'Val di Sole', value: 'Val di Sole' },
        { text: 'Lenzerheide', value: 'Lenzerheide' },
        { text: 'Snowshoe', value: 'Snowshoe' },
        { text: 'World Champs: Mont-Sainte-Anne', value: 'worldchamps' },
        { text: 'Overall', value: 'overall' }
      ],
      questions: []
    }
  },
  created() {
    this.fetchQuestions()
  },
  methods: {
    fetchQuestions() {
      this.$axios.get(`/athletes.json`).then(
        (res) =>
          (this.questions = Object.keys(res.data).map((key, index) => {
            res.data[key] = key
            return res.data[key]
          }))
      )
    }

    // destroy(key) {
    //   this.$axios.delete(`/athletes/${key}.json`).then((res) => {
    //     this.fetchAnswer(key)
    //   })
    // }
    // fetchAnswer(key) {
    //   this.$axios
    //     .get(
    //       `/answers.json?orderBy="question_id"&startAt="${key}"&endAt="${key}"`
    //     )
    //     .then((res) => this.destroyAnswer(key, Object.keys(res.data)[0]))
    // },
    // destroyAnswer(key, answerId) {
    //   this.$axios
    //     .delete(`/answers/${answerId}.json`)
    //     .then((res) => this.questions.splice(this.questions[key]))
    // }
  }
}
</script>

<style></style>
