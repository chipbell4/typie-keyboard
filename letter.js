var Letter = function(letter, position) {
  this.sprite = new PIXI.Text(letter, { font: '35px Arial', align: 'center' });
  this.sprite.position.x = position.x;
  this.sprite.position.y = position.y;
  this.startTime = Date.now();
  this.duration = 2000;
};

Letter.prototype.update = function() {
  var dt = Date.now() - this.startTime;
  if(dt > this.duration) {
    stage.removeChild(this.sprite);
    return;
  }

  this.sprite.alpha = 1 - dt / this.duration;
};
