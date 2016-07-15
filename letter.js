var Letter = function(letter, options) {
  this.sprite = new PIXI.Text(letter, {
    font: '45px Arial',
    align: 'center',
    fill: options.color,
    stroke: options.color,
  });
  this.sprite.position.x = options.x;
  this.sprite.position.y = options.y;
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
