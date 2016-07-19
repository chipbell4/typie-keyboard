var PIXI = require('pixi.js');
var Blast = require('./blast');

var context = new AudioContext();
var Instrument = require('./instrument');

var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x222222});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
var blasts = [];

function animate() {
  renderer.render(stage);

  for(var i = 0; i < blasts.length; i++) {
    blasts[i].update();
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

function lookupKeyCode(keyCode) {
  var keyCodes = [
    [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187],
    [81, 87, 69,82, 84, 89, 85, 73, 79, 80, 219, 221, 220],
    [65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13],
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
  if(offset === undefined) {
    return;
  }

  var y = offset[0] / 5 * renderer.height + renderer.height / 10;
  var x = offset[1] / 14 * renderer.width + renderer.width / 14;

  // randomize a little
  var maxJitter = 20;
  y += maxJitter + Math.random() * (-2 * maxJitter);
  x += maxJitter + Math.random() * (-2 * maxJitter);

  var blast = new Blast({ x: x, y: y, radius: 30, color: 0xff6600, stage: stage });
  blasts.push(blast);

  var instrument = new Instrument({
    frequencies: [226, 226 * 2 / 3],
    context: context,
    noteDuration: 2.0
  });
  instrument.start();

  return false;
});
