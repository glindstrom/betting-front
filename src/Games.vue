<template>
  <div>
    <button @click="fetchData">Get Data</button>
    <table>
      <tr>
        <th>Date</th>
        <th>League</th>
        <th>Home</th>
        <th>Away</th>
        <th>1</th>
        <th>2</th>
        <th>Offered Odds 1</th>
        <th>Offered Odds 2</th>
      </tr>
      <tr v-for="g in games">
        <td>{{ moment(g.dateTime).local().format('DD.MM HH:mm') }}</td>
        <td>{{ g.league }}</td>
        <td>{{ g.team1 }}</td>
        <td>{{ g.team2 }}</td>
        <td>{{ g.odds1.toFixed(2) }}</td>
        <td>{{ g.odds2.toFixed(2) }}</td>
        <td><input type="number" step="0.001" @blur="save(g)" v-model="g.offeredOdds1"></td>
        <td><input type="number" step="0.001" v-model="g.offeredOdds2"></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        games: []
      }
    },
    methods: {
      fetchData() {
        this.$http.get('http://localhost:8080/games')
        .then(response => {
           return response.json()
        })
        .then(data => {
          console.log(data)
          this.games = data
        })
      },
      save(game) {
       this.$http.post('http://localhost:8080/game')
       .then(this.fetchData())
       .catch(err => console.log(err))
      }
    }
  }
</script>
