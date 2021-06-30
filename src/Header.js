function Header({ $app, initialState, restart }) {
  this.$target = document.createElement('div');
  this.$target.className = 'header';
  this.$target.addEventListener('click', (e) => restart(e));
  $app.appendChild(this.$target);
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (this.state.winner) {
      this.$target.innerHTML = `winner : ${this.state.winner}<button class="restart">다시하기</button>`;
    } else if (this.state.xIsNext) {
      this.$target.innerHTML = `next is X`;
    } else {
      this.$target.innerHTML = `next is O`;
    }
  };
  this.render();
}
export default Header;
