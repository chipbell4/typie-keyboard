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

  this.merger = options.context.createChannelMerger(this.synths.length);
  this.synths.forEach(function(synth, index) {
    synth.output.connect(this.merger, 0, index);
  }, this);

  this.gain = options.context.createGain();
  this.merger.connect(this.gain);
  this.gain.gain.value = 0.1;
  this.output = this.gain;
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
