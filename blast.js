var circleTexture = new PIXI.Texture.fromImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAAH7+Yj7AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AMZDzoGd7fvlgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACAElEQVRYw+WYwXHCMBBF38rklgJwAUkJ5JDeCM3lkhJwAVAAcAFLuchEaCRZxrLHM/kzPiDWq5X+7vdKYozBQgMX4FXs4P0fAGUt8Acv/mDwdXEmMoAArDwrAzRiHFN3IkKDfkjiTxSCBqpgmLFpeo06Q8k1xBo3ERsBBGOM+2zNHx7+W3m7SOC3uFOnFmSGrPoa5Cu16vkNP3K5FpcZEsw85LOLNjOsGjjGCoTcjIuQp9zNaUc465Z7z4jtEHr6Is3OnOKJM8ShTBFhXcif+Gmjn4xYYnuo7loEt746c2wdnj2t8p6TeYS2Ohd9J1R6a+CQsUwNVLEP1tAaDu6fv4f6ybw0IYf7kflokt/oJ6GBSgHXkkWibH9QCtvSamNKq41MIl+LdnguTYooK0PlPBaslBo45jSo2WXnkyIjhKGKsTzUaeP7UBHB7CPqZu3e+xS7Dxvge4Sg3IBP4Gdo1qSwB96YBk1o13ID1BTuenLa1Rypad3D40zo2t82FeA6tZKZ0B3Y1n6Am8zeaC4cbExFpXUS6hVwYrk4FT9BLb4D+ZcBLplio4DdggPcdTJzLXyiKIEb8OJ+i9sF5WSww6yI31nOicbtWGPdzJydTLKjUYnqFgI36xPRKUPaLTzaxR5hdOGgauu7KiHURyfY7vkCzvRfep+trftuhXdRG8Mv83oZKB/I75YAAAAASUVORK5CYII=');

var Blast = function(options) {
  this.sprite = new PIXI.Sprite(circleTexture);
  this.sprite.width = this.sprite.height = options.radius;
  this.sprite.tint = options.color;
  this.sprite.position.x = options.x;
  this.sprite.position.y = options.y;
  this.sprite.anchor.x = this.sprite.anchor.y = 0.5

  this.startTime = Date.now();
  this.duration = 1500;
};

Blast.prototype.update = function() {
  var dt = Date.now() - this.startTime;
  if(dt > this.duration) {
    stage.removeChild(this.sprite);
    return;
  }

  this.sprite.alpha = 1 - dt / this.duration;
};
