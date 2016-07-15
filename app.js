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

function lookupKeyCode(keyCode) {
  var keyCodes = [
    [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187],
    [9, 81, 87, 69,82, 84, 89, 85, 73, 79, 80, 219, 221, 220],
    [20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13],
    [16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191],
    [32],
  ];

  for(var i = 0; i < keyCodes.length; i++) {
    for(var j = 0; j < keyCodes[i].length; j++) {
      if(keyCode == keyCodes[i][j]) {
        return [i, j]
      }
    }
  }
}

document.body.addEventListener('keydown', function(evt) {
  var offset = lookupKeyCode(evt.which || evt.keyCode);
  console.log(offset);

  return false;
});
