import Header from './Header.js';
import Board from './Board.js';
const HEADER = 'header';
const BOARD = 'board';
const RESTART = 'restart';
function App($app) {
  this.state = {
    board: Array(9).fill(null),
    xIsNext: true,
    winner: undefined,
  };
  const isEnd = () => {
    const endArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    if (
      this.state.board.reduce((acc, cur) => {
        if (cur) return acc + 1;
        return acc;
      }, 0) === 9
    )
      this.setState(HEADER, { ...this.state, winner: 'draw' });
    for (let i = 0; i < endArr.length; i++) {
      const [a, b, c] = endArr[i];
      if (
        this.state.board[a] &&
        this.state.board[a] === this.state.board[b] &&
        this.state.board[a] === this.state.board[c]
      ) {
        const winner = this.state.board[a] === 'X' ? 'X' : 'O';
        this.setState(HEADER, { ...this.state, winner });
        return;
      }
    }
    this.setState(HEADER, { ...this.state });
  };
  const header = new Header({
    $app,
    initialState: { xIsNext: this.state.xIsNext, winner: this.state.winner },
    restart: (e) => {
      if (e.target.className === 'restart')
        this.setState(RESTART, {
          board: Array(9).fill(null),
          xIsNext: true,
          winner: undefined,
        });
    },
  });
  const board = new Board({
    $app,
    initialState: this.state.board,
    onClick: (e) => {
      if (this.state.winner) return;
      if (e.target.textContent) return;
      const id = +e.target.className.slice(5);
      const nextBoard = [...this.state.board];
      if (this.state.xIsNext) nextBoard[id] = 'X';
      else nextBoard[id] = 'O';

      this.setState(BOARD, {
        ...this.state,
        board: nextBoard,
        xIsNext: !this.state.xIsNext,
      });
      isEnd();
    },
  });

  this.setState = (type, nextstate) => {
    console.log('app setState', type, nextstate);
    this.state = nextstate;
    switch (type) {
      case HEADER:
        return header.setState({
          xIsNext: this.state.xIsNext,
          winner: this.state.winner,
        });
      case BOARD:
        return board.setState(this.state.board);
      case RESTART:
        header.setState({
          xIsNext: this.state.xIsNext,
          winner: this.state.winner,
        });
        board.setState(this.state.board);
        return;
      default:
        return;
    }
  };
}

export default App;
