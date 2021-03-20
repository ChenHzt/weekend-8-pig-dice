import logo from './logo.svg';
import './App.css';
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import React from 'react';
import Confetti from 'react-confetti'
class ScoreBoard extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div className='scoreBoard'>
        {this.props.players.map((player,index) => {
            return <div key={player.name} className={`player-global-score ${index === this.props.currentPlayer?'player-global-score--active':''}`}>
              <p>{player.name}</p>
              <p>{player.globalScore}</p>
            </div>
          })}
      </div>
    )
  }
}

class CurrentScore extends React.Component {

  render() {
    return (
      <div className="currentScore">
        <p>Current Score:</p>
        <p>{this.props.currentScore}</p>
      </div>
    )
  }
}

class CustomButton extends React.Component{

  render(){
    const enabled = this.props.enabled;
    return (
      <button className='customButton' disabled={!enabled} onClick={this.props.onClick}>
        {this.props.buttonText}
      </button>
    )
  }
}

class DisplayWinner extends React.Component{
  render(){
    return(
      <div className="displayWinner">
        <Confetti/>
      </div>
    )
  }
}

class GameBoard extends React.Component{

}

class PigDiceGame extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [
        {
          name: 'player 1',
          globalScore: 0,
          currentScore: 0
        },
        {
          name: 'player 2',
          globalScore: 0,
          currentScore: 0
        }
      ],
      currentPlayerTurn: 0,
      diceTotal:0,
      finalScore: 20,
      isGameOver:false
    }
  }

  handleWinning = (player) =>{
    console.log(`${this.state.players[player].name} won!!!`);
    this.setState({isGameOver:true});

  }
  rollDoneCallback = (num) => {
    console.log(`You rolled a ${num}`);
    this.setState({diceTotal:num});
    const currentPlayerturn = this.state.currentPlayerTurn;
    const newArr = this.state.players;

    if(num ===12){
      newArr[currentPlayerturn].currentScore=0;
      setTimeout(() => this.setState({currentPlayerTurn:(currentPlayerturn+1)%2, players:newArr}),2000)
      
    }
    else{
      newArr[currentPlayerturn].currentScore +=num;

      this.setState({players:newArr});

    }

  }

  rollClicked = (event) => {
    event.preventDefault();
    console.log('roll clicked');
    this.reactDice.rollAll();
  }

  holdClicked = (event) => {
    console.log('hold clicked');
    const currentPlayerturn = this.state.currentPlayerTurn;
    const newArr = this.state.players;
    newArr[currentPlayerturn].globalScore += newArr[currentPlayerturn].currentScore;
    newArr[currentPlayerturn].currentScore=0;
    if(newArr[currentPlayerturn].globalScore >=this.state.finalScore)
    this.handleWinning(currentPlayerturn);
    else this.setState({currentPlayerTurn:(currentPlayerturn+1)%2, players:newArr});
    console.log(this.state);
  }

  newGameClicked = (event) => {
    let newArr = this.state.players;
    newArr = newArr.map((player) => {return {name:player.name,currentScore:0,globalScore:0}});
    console.log(newArr);
    this.setState({currentPlayerTurn:0,
    players:newArr});
  }

  render() {
    console.log(this.state);
    let winning;
    if(this.state.isGameOver) winning= <h1>{`And the winner is:`}</h1>;

    else winning = null
    return (
      <div className="container">

        <ScoreBoard players={this.state.players} currentPlayer={this.state.currentPlayerTurn}/>
        {winning}
        <GameBoard isGameOver={this.state.isGameOver} players={this.state.players} currentPlayerTurn={this.state.currentPlayerTurn}/>
        <h1 className='currentPlayerTitle'>{this.state.players[this.state.currentPlayerTurn ].name}</h1>
        <ReactDice
            numDice={2}
            rollTime={1}
            rollDone={this.rollDoneCallback}
            ref={dice => this.reactDice = dice}
            dieSize={80}
            disableIndividual={true}
          />
          <CurrentScore currentScore={this.state.players[this.state.currentPlayerTurn].currentScore} />
          <CustomButton buttonText='ROLL' enabled={!this.state.isGameOver} onClick={this.rollClicked}/>
          <CustomButton buttonText='HOLD' enabled={!this.state.isGameOver} onClick={this.holdClicked}/>
          <CustomButton buttonText='NEW GAME' enabled={true} onClick={this.newGameClicked}/>
          <input type="text" value={this.state.finalScore} onChange={(event) => this.setState({finalScore:event.target.value})}/>
      </div>
    )
  }
}

export default PigDiceGame;
