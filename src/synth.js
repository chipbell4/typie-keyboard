var Envelope = require('envelope-generator');

var Synth = function(options) {
  this.context = options.context;

  this.gain = options.context.createGain();
  this.gain.connect(options.context.destination);
  this.gain.gain.value = 0;

  this.oscillator = options.context.createOscillator();
  this.oscillator.frequency.value = options.frequency;
  this.oscillator.start();
  this.oscillator.connect(this.gain);

  this.envelope = new Envelope(options.context, {
    attackTime: 0.05,
    decayTime: 0.3,
    sustainLevel: 0.4,
    releaseTime: 0.05
  });

  this.envelope.connect(this.gain.gain);
};

Synth.prototype.start = function() {
  this.envelope.start(this.context.currentTime);
};

Synth.prototype.stop = function() {
  this.envelope.stop(this.context.currentTime);
};

module.exports = Synth;
