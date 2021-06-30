function Board({ $app, initialState, onClick }) {
  this.$target = document.createElement('div');
  this.$target.className = 'board';
  this.$target.addEventListener('click', (e) => onClick(e));
  $app.appendChild(this.$target);
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    const items = Array(9)
      .fill()
      .map((_, i) => {
        const value = this.state[i] || '';
        return `<div class="item_${i}">${value}</div>`;
      })
      .join('');
    this.$target.innerHTML = items;
  };
  this.render();
}
export default Board;
