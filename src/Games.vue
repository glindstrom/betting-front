<template>
  <div>
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
        <th>Optimal Bet Size</th>
        <th>Predicted Winner</th>
        <th>Bet Amount</th>
        <th></th>
      </tr>
      <tr v-for="g in games">
        <td>{{ moment(g.dateTime).local().format('DD.MM HH:mm') }}</td>
        <td>{{ g.league }}</td>
        <td>{{ g.team1 }}</td>
        <td>{{ g.team2 }}</td>
        <td>{{ g.odds1.toFixed(2) }}</td>
        <td>{{ g.odds2.toFixed(2) }}</td>
        <td><input :style="odds1Style(g)" type="number" step="0.001" @blur="save(g)" v-model="g.offeredOdds1"></td>
        <td><input :style="odds2Style(g)" type="number" step="0.001" @blur="save(g)" v-model="g.offeredOdds2"></td>
        <td>{{ round(g.betSize) }}</td>
        <td>
          <select v-model="g.predictedWinner">
            <option>{{ g.team1 }}</option>
            <option>{{ g.team2 }}</option>
            <option></option>
          </select>
        </td>
        <td><input type="number" step="0.01" v-model="g.betAmount"></td>
        <td><button :disabled="!canBet(g)" @click="bet(g)">Bet</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        games: []
      }
    },
    methods: {
      fetchData() {
        axios.get('/games')
        .then(response => {
          this.games = response.data.filter(game => game.league !== 'NFL')
        })
      },
      save(game) {
        game.offeredOdds1 = parseFloat(game.offeredOdds1)
        game.offeredOdds2 = parseFloat(game.offeredOdds2)
       axios.post('/game', game)
       .then(this.fetchData())
       .catch(err => console.log(err))
     },
     odds1Style: function(game) {
       return {
         backgroundColor: game.offeredOdds1 > game.odds1 ? 'LightGreen' : 'white'
       }
     },
     odds2Style: function(game) {
       return {
         backgroundColor: game.offeredOdds2 > game.odds2 ? 'LightGreen' : 'white'
       }
     },
     bet: function(game) {
       game.betAmount = parseFloat(game.betAmount)
       axios.post('/games/bet', game)
       game.betPlaced = true
     },
     canBet: function(game) {
       return !game.betPlaced && game.predictedWinner && game.betAmount > 0
     },
     round: function round(num) {
       return (Math.round(num*20)/20).toFixed(2)
     }
   },
   beforeMount() {
     this.fetchData()
   }
  }
</script>
