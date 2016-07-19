var Synth = function(options) {
  this.context = options.context;

  this.gain = options.context.createGain();
  this.gain.connect(options.context.destination);
  this.gain.gain.value = 0;

  this.oscillator = options.context.createOscillator();
  this.oscillator.frequency.value = options.frequency;
  this.oscillator.start();
  this.oscillator.connect(this.gain);
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
  return 1.0 - t;
};

module.exports = Synth;
