import logo from './logo.svg';
import './App.css';
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import React from 'react';

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
    return (
      <button className='customButton' onClick={this.props.onClick}>
        {this.props.buttonText}
      </button>
    )
  }
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
      finalScore: 20
    }
  }

  handleWinning = (player) =>{
    console.log(`${this.state.players[player].name} won!!!`);

  }
  rollDoneCallback = (num) => {
    console.log(`You rolled a ${num}`);
    this.setState({diceTotal:num});
    const currentPlayerturn = this.state.currentPlayerTurn;
    const newArr = this.state.players;

    if(num >=10){
      newArr[currentPlayerturn].currentScore=0;
      this.setState({currentPlayerTurn:(currentPlayerturn+1)%2, players:newArr});
      
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
    return (
      <div className="container">
        <ScoreBoard players={this.state.players} currentPlayer={this.state.currentPlayerTurn}/>
        
        <h1 className='currentPlayerTitle'>{this.state.players[this.state.currentPlayerTurn ].name}</h1>
        <ReactDice
            numDice={2}
            rollTime={1}
            rollDone={this.rollDoneCallback}
            ref={dice => this.reactDice = dice}
            dieSize={100}
            disableIndividual={true}
          />
          <CurrentScore currentScore={this.state.players[this.state.currentPlayerTurn].currentScore} />

          <CustomButton buttonText='ROLL' onClick={this.rollClicked}/>
          <CustomButton buttonText='HOLD' onClick={this.holdClicked}/>
          <CustomButton buttonText='NEW GAME' onClick={this.newGameClicked}/>
          <input type="text" value={this.state.finalScore} onChange={(event) => this.setState({finalScore:event.target.value})}/>
      </div>
    )
  }
}

export default PigDiceGame;
