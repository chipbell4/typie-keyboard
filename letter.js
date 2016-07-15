var Letter = function(letter, position) {
  this.sprite = new PIXI.Text(letter, { font: '35px Arial', align: 'center' });
  this.sprite.position.x = position.x;
  this.sprite.position.y = position.y;
  this.startTime = Date.now();
};

Letter.prototype.update = function() {
  var dt = Date.now() - this.startTime;
};
