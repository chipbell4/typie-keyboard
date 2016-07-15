var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x222222});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var letter = new Letter('A', { color: 0xff6600, x: 100, y: 100 });
stage.addChild(letter.sprite);

function animate() {
  renderer.render(stage);
  letter.update();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

document.body.addEventListener('keydown', function(evt) {
  var s = String.fromCharCode(evt.which || evt.keyCode);
  var alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  if(alphanumeric.indexOf(s) < 0) {
    return;
  }

  console.log(s);
});
