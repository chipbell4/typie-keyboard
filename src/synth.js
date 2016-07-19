var Synth = function(options) {
  this.context = options.context;

  this.gain = options.context.createGain();
  this.gain.gain.value = 0;
  this.output = this.gain; // the output for the synth

  this.oscillator = options.context.createOscillator();
  this.setFrequency(options.frequency);
  this.oscillator.start();
  this.oscillator.connect(this.gain);

  this.noteDuration = options.noteDuration || 0.5;
};

Synth.prototype.start = function() {
  if(this.interval) {
    clearInterval(this.interval);
  }

  var currentTime = 0;
  var intervalLengthInMillis = 10;
  var doTick = function() {
    var newGain = this.getGainAtTime(currentTime);
    this.gain.gain.value = newGain;

    if(newGain < 0.001) {
      clearInterval(this.interval);
    }
    
    currentTime += intervalLengthInMillis / 1000;
  }.bind(this);

  this.interval = setInterval(doTick, intervalLengthInMillis);
};

Synth.prototype.getGainAtTime = function(t) {
  return 1.0 - t / this.noteDuration;
};

Synth.prototype.setFrequency = function(frequency) {
  this.oscillator.frequency.value = frequency;
}

module.exports = Synth;
