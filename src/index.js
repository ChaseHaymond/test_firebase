import { getByTestId } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className={props.class} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(25).fill(null),
      classes: Array(25).fill("square"),
      text: this.getText(),
      xIsNext: true,
    };
  }

  getText() {
    const text = ["I would be truly remiss", "Person on stand falls asleep", "Tender Mercies", "Odd use of Even", "Over time",
            "Race to pulpit", "Kid", "political", "Name dropper", "Fiber of my being",
          "Ill go up if you do", "TMI", "I know the church is true", "Thy son amen", "Kid with parent",
          "Bad joke", "The regular", "Scilence", "Metaphor", "Mission story", 
        "Ugly Cry", "Long talker", "Visitor", "Good Joke", "Travelogue"]

        return text;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const classes = this.state.classes.slice();

    squares[i] = classes[i] === 'square2' ? 'square' : 'square2';
    classes[i] = classes[i] === 'square2' ? 'square' : 'square2';//this.state.xIsNext ? 'square2' : 'square'

    console.log(i);
    console.log(classes);

    this.setState({
      squares: squares,
      classes: classes,
      xIsNext: !this.state.xIsNext,
    });

    if (calculateWinner(squares)) {
      return true;
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.text[i]}
        class = {this.state.classes[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status = '';
    if (winner) {
      status = 'Bingo';
    }

    return (
      <div>
          
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
          </div>
          <div className="board-row">
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
          </div>
          <div className="board-row">
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
            <span className="Winner">{status}</span>
          </div>
          <div className="board-row">
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
          </div>
          <div className="board-row">
            {this.renderSquare(20)}
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
          </div>
        </div>
    );
  }
  }

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],

    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],

    [0, 6, 12, 18, 24],
    [20, 16, 12, 8, 4],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
      return squares[a];
    }
  }
  return null;
}
