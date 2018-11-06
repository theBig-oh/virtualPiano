/*
    A very basic sound generator using javascript Audio API. 


    - Need to add a way to sustain notes
    - Add natural decay
    - Add modulation 
    - Add Volume control. 
    - Different channels for clearer notes


    Not much out there in terms of help, so it's gonna be a new frontier. 


    -- Update -- 
    Re doing it because I was going at it wrong. 

    Instead of creating an oscillator at the event time was dumb. 

    This time create multiple oscillators and change the volume instead. 



    *** Currently using Steve Kinney's oscillator solution. ***


        - Create an oscillator for each key
        - Have them all muted when constructed.
        - When key is pressed, volume is increased to volume variable
        - Re-render/re-create the keys when volume or settings is adjusted to reflect
          changes. 



*/
import context from './audioContext.js';

export default class MakeSound {
  constructor(context, frequency) {
    this.oscillator = context.createOscillator();
    this.gainNode = context.createGain();
    this.volume = this.gainNode.gain;
 console.log(frequency);
    this.oscillator.frequency.value = frequency;

    this.volume.value = 0;

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(context.destination);

    this.oscillator.start(0);
   
    console.log('oscillator started');
  } 

  start(volSet) {
    this.volume.value = volSet;
  }
  stop() {
    this.volume.value = 0;
  }
}