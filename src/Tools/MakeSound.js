/*
    A very basic sound generator using javascript Audio API. 


    - Need to add a way to sustain notes
    - Add natural decay
    - Add modulation 
    - Add Volume control. 
    - Different channels for clearer notes


    Not much out there in terms of help, so it's gonna be a new frontier. 


*/


export default class MakeSound {
  constructor(context) {
    this.context = context;
    console.log(context);
  } 
  init() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
  }
  play(value,time,type) {
    this.init();

    this.oscillator.frequency.value = value;
    this.type = type ? 'square' : type;

    this.gainNode.gain.exponentialRampToValueAtTime(1, this.context.currentTime);

    this.oscillator.start(time);
    this.stop(time);
  } 
  stop(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, time+1.5);
    this.oscillator.stop(time + 0.5);
  }
}