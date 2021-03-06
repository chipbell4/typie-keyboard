var Keyboard = require('./keyboard');
var Instrument = require('./instrument');
var ChordManager = require('./chord-manager');

var instruments = [];
var Bass;

module.exports = {
  init: function(context) {
    for(var i = 0; i < Keyboard.keyCodes.length; i++) {
      var row = [];
      for(var j = 0; j < Keyboard.keyCodes[i].length; j++) {
        var instrument = new Instrument({
          frequencies: [220, 440, 220],
          overtones: ChordManager.overtoneSets[i],
          context: context,
          noteDuration: 4.5
        });

        instrument.output.connect(context.destination);
        row.push(instrument);
      }
      instruments.push(row);
    }

    Bass = new Instrument({
      frequencies: ChordManager.bassline,
      context: context,
      noteDuration: 4000,
    });
    Bass.tick = function() {
      Instrument.prototype.tick.call(Bass);
      ChordManager.currentKey = Math.floor(this.currentTick / 8) % ChordManager.keys.length;
    }
    Bass.start();
    Bass.output.connect(context.destination);

    setInterval(this.doTick.bind(this), 50);
  },

  start: function(row, column) {
    instruments[row][column].start();
  },

  doTick: function() {
    for(var i = 0; i < instruments.length; i++) {
      var currentScale = ChordManager.currentScale(1);
      for(var j = 0; j < instruments[i].length; j++) {
        instruments[i][j].setFrequencies(currentScale.slice(j, j + 2));
      }
    }
  }
};
