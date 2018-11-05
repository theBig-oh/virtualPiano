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
  constructor(context,volum) {
    this.context = context;
    this.volume = volum;
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.init(); 
  } 
  init() {

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
     // Needs to be set in 1^10 values. 1 is max.
  }
  play(value,time,type) {
    
   

    this.oscillator.frequency.value = value;
    this.oscillator.type = type ? type : 'square';
    this.type = type;
    this.gainNode.gain.value = this.volume;
    this.oscillator.start(time);

   
  } 
  stop(time) {
    console.log('this is in stop()'); 
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, 3.25);
    this.oscillator.stop(1.25);

  }
}