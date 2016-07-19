var Synth = require('./synth');

var Instrument = function(options) {
  this.frequencies = options.frequencies;
  this.noteSwitchPeriod = options.noteSwitchPeriod || 0.5;
  this.synth = new Synth({
    context: options.context,
    frequency: options.frequencies[0],
    noteDuration: options.noteDuration,
  });
};

Instrument.prototype.start = function() {
  if(this.interval) {
    clearInterval(this.interval);
  } 

  var currentNote = 0;
  var doTick = function() {
    currentNote = (currentNote + 1) % this.frequencies.length;

    this.synth.setFrequency(this.frequencies[currentNote]);
  }.bind(this);

  this.interval = setInterval(doTick, this.noteSwitchPeriod * 1000);
  this.synth.start();
};

module.exports = Instrument;
