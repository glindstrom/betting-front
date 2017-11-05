import React, { Component } from 'react';
import moment from "moment";

const gamesUrl = "http://localhost:8080/games"

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    fetch(gamesUrl)
    .then(d => d.json())
    .then(d => {
      console.log(d);
      this.setState({
        gamesData: d
      })
    })
  }

  render() {
    if (!this.state.gamesData) {
      return <p>Loading...</p>
    }
    return (
      <div className="Games">
       <table>
         <tbody>{this.state.gamesData.map((game, key) => {
           return (
           <tr key = {key}>
             <td>{moment(game.dateTime).local().format('DD.MM HH:mm')}</td>
             <td>{game.league}</td>
             <td>{game.team1}</td>
             <td>{game.team2}</td>
             <td>{game.odds1.toFixed(2)}</td>
             <td>{game.odds2.toFixed(2)}</td>
           </tr>
           )
           })}</tbody>
       </table>
      </div>
    );
  }
}

export default Games;
