module.exports = {
  lookupKeyCode: function(keyCode) {
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
}
