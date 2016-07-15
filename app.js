var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var letter = new Letter('A', { x: 100, y: 100 });
stage.addChild(letter.sprite);

function animate() {
  renderer.render(stage);
  letter.update();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
