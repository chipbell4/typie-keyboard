module.exports = {
  keyCodes: [
    [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187],
    [81, 87, 69,82, 84, 89, 85, 73, 79, 80, 219, 221, 220],
    [65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13],
    [16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191],
    [32],
  ],
  lookupKeyCode: function(keyCode) {
    for(var i = 0; i < this.keyCodes.length; i++) {
      for(var j = 0; j < this.keyCodes[i].length; j++) {
        if(keyCode == this.keyCodes[i][j]) {
          return [i, j]
        }
      }
    }
  }
}
