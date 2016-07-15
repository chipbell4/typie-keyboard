var Blast = function(options) {
  this.sprite = new PIXI.Graphics();
  this.sprite.beginFill(options.color);
  this.sprite.arc(0, 0, 30, 0, 2 * Math.PI);
  this.sprite.endFill();

  this.sprite.position.x = options.x;
  this.sprite.position.y = options.y;

  this.startTime = Date.now();
  this.duration = 2000;
};

Blast.prototype.update = function() {
  var dt = Date.now() - this.startTime;
  if(dt > this.duration) {
    stage.removeChild(this.sprite);
    return;
  }

  this.sprite.alpha = 1 - dt / this.duration;
};
