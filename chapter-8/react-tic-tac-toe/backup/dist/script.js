function Square(props) {
  return (
    React.createElement("button", { className: "square", onClick: props.onClick },
    props.value));


}

class Board extends React.Component {
  renderSquare(i) {
    return (
      React.createElement(Square, {
        value: this.props.squares[i],
        onClick: () => this.props.onClick(i) }));


  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "board-row" },
      this.renderSquare(0),
      this.renderSquare(1),
      this.renderSquare(2)),

      React.createElement("div", { className: "board-row" },
      this.renderSquare(3),
      this.renderSquare(4),
      this.renderSquare(5)),

      React.createElement("div", { className: "board-row" },
      this.renderSquare(6),
      this.renderSquare(7),
      this.renderSquare(8))));



  }}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
      {
        squares: Array(9).fill(null) }],


      stepNumber: 0,
      xIsNext: true };

  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
      {
        squares: squares }]),


      stepNumber: history.length,
      xIsNext: !this.state.xIsNext });

  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0 });

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
      'Go to move #' + move :
      'Go to game start';
      return (
        React.createElement("li", { key: move },
        React.createElement("button", { onClick: () => this.jumpTo(move) }, desc)));


    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      React.createElement("div", { className: "game" },
      React.createElement("div", { className: "game-board" },
      React.createElement(Board, {
        squares: current.squares,
        onClick: i => this.handleClick(i) })),


      React.createElement("div", { className: "game-info" },
      React.createElement("div", null, status),
      React.createElement("ol", null, moves))));



  }}


// ========================================

ReactDOM.render(React.createElement(Game, null), document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}