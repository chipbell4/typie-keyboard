var BASS = 50;

var toPitches = function(offset) {
  return BASS * Math.pow(2, offset / 12);
};

module.exports = {
  keys: [
    {
      scale: [0, 3, 5, 7, 10],
      bass: [0, 7, 10, 12, 0, 7, 10, 12],
    },
    {
      scale: [0, 3, 5, 7, 9, 10],
      bass: [3, 7, 9, 10, 3, 7, 9, 10],
    },
    {
      scale: [0, 2, 5, 7, 9, 11],
      bass: [5, 7, 9, 3, 5, 7, 9, 3],
    },
    {
      scale: [0, 1, 4, 6, 8, 10],
      bass: [6, 12, 13, 10, 6, 4, 3, 1],
    }
  ],

  start: function() {
    this.currentKey = 0;
    setInterval(function() {
      this.currentKey = (this.currentKey + 1) % this.keys.length;
    }.bind(this), 2000);
  },

  currentScale: function(octave) {
    var rawScale = this.keys[this.currentKey].scale;
    var raise = function(octaves) {
      return function(offset) { return offset + octaves * 12; };
    };
    var oneOctave = rawScale.map(raise(octave + 1));
    var twoOctave = rawScale.map(raise(octave + 2));
    var threeOctave = rawScale.map(raise(octave + 3));
    
    return oneOctave.concat(twoOctave).concat(threeOctave).map(toPitches);
  },

  currentBassline: function() {
    var rawNotes = this.keys[this.currentKey].bass;
    return rawNotes.map(toPitches);
  },
};