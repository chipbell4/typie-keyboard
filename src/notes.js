module.exports = {
  transpose: function(frequency, numberOfSteps) {
    var halfStep = Math.pow(2, 1 / 12);

    return frequency * Math.pow(halfStep, numberOfSteps);
  },

  pitchesForOffset: function(row, column) {
    var basePitch = 100;

    var scale = [0, 2, 3, 5, 7, 9, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26, 27, 29, 31];

    if(row == 4) {
      return basePitch;
    }

    var spacing;
    if(row == 2 || row == 3) {
      basePitch *= 2;
      spacing = 2;
    } if(row ==0 || row == 1) {
      basePitch *= 4;
      spacing = 3;
    }

    return [
      this.transpose(basePitch, scale[column]),
      this.transpose(basePitch, scale[column + spacing]),
      this.transpose(basePitch, scale[column + spacing + spacing])
    ];
  }
};
