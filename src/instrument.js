var Synth = require('./synth');

var Instrument = function(options) {
  this.overtones = options.overtones || [1];
  this.frequencies = options.frequencies;
  this.noteSwitchPeriod = options.noteSwitchPeriod || 0.5;

  this.synths = this.overtones.map(function(overtone) {
    return new Synth({
      context: options.context,
      frequency: options.frequencies[0] * overtone, 
      noteDuration: options.noteDuration
    });
  });
};

Instrument.prototype.start = function() {
  if(this.interval) {
    clearInterval(this.interval);
  } 

  var currentNote = 0;
  var doTick = function() {
    currentNote = (currentNote + 1) % this.frequencies.length;

    for(var i = 0; i< this.overtones.length; i++) {
      this.synths[i].setFrequency(this.frequencies[currentNote] * this.overtones[i]);
    }
  }.bind(this);

  this.interval = setInterval(doTick, this.noteSwitchPeriod * 1000);
  this.synths.forEach(function(synth) {
    synth.start();
  });
};

module.exports = Instrument;
