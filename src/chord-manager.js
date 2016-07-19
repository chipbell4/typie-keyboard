var BASS = 150;

var toPitches = function(offset) {
  return BASS * Math.pow(2, offset / 12);
};

module.exports = {
  currentKey: 0,
  keys: [
    {
      scale: [0, 3, 5, 7, 10],
    },
    {
      scale: [0, 3, 5, 7, 9, 10],
    },
    {
      scale: [0, 2, 5, 7, 9, 11],
    },
    {
      scale: [0, 1, 4, 6, 8, 10],
    }
  ],

  overtoneSets: [
    [1],
    [1, 0, 1/3, 0, 1/5, 0, 1/7, 0, 1/9, 0, 1/11],
    [1, 2.01, 3.02, 4.04],
    [1, 1.99, 3.01, 3.99, 5.01],
  ],

  start: function() {
    this.currentKey = 0;
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

  bassline: [
    0, 7, 10, 12, 0, 7, 10, 12,
    3, 7, 9, 10, 3, 7, 9, 10,
    5, 7, 9, 3, 5, 7, 9, 3,
    6, 12, 13, 10, 6, 4, 3, 1
  ].map(toPitches),
};
