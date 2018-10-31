import MakeElement from '../Tools/MakeElement';
// Needs to be made into its own seperate component. 
class MakeSound {
  constructor(context){
    this.context = context;
  }
  init(){
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);

  }
  play(value,time,type){
    this.init();

    this.oscillator.frequency.value = value;
    this.type = type ? 'sine' : type;
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

    this.oscillator.start(time);
    this.stop(time);
  }
  stop(time){
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, time+1);
    this.oscillator.stop(time +1);
  }
}


//              z  s  x  d  c  v  g  b  h   n  j
const keycodes = [90,83,88,68,67,86,71,66,72,78,74,77];

//                
const octKeycode = [89,55,85,56,73,79,48,80,173,219,61,221];
//                y   7 u   8  i  o 0   p  -   [   =  ]

// Set at Middle C.
const notes = [     {'tone':261,'rootNote':'c','kCode':[keycodes[0],octKeycode[0]]},  // 0
                 {'tone':277,'rootNote':'c#','kCode':[keycodes[1],octKeycode[1]]}, // 1
                 {'tone':293,'rootNote':'d','kCode':[keycodes[2],octKeycode[2]]},   // 2 
                 {'tone':311,'rootNote':'d#','kCode':[keycodes[3],octKeycode[3]]}, // 3 
                 {'tone':329,'rootNote':'e','kCode':[keycodes[4],octKeycode[4]]},   // 4
                 {'tone':349,'rootNote':'f','kCode':[keycodes[5],octKeycode[5]]},   // 5 
                 {'tone':369,'rootNote':'f#','kCode':[keycodes[6],octKeycode[6]]}, // 6
                 {'tone':392,'rootNote':'g','kCode':[keycodes[7],octKeycode[7]]},   // 7
                 {'tone':415,'rootNote':'g#','kCode':[keycodes[8],octKeycode[8]]}, // 8
                 {'tone':440,'rootNote':'a','kCode':[keycodes[9],octKeycode[9]]},   // 9
                 {'tone':466,'rootNote':'a#','kCode':[keycodes[10],octKeycode[10]]}, //10 
                 {'tone':493,'rootNote':'b','kCode':[keycodes[11],octKeycode[11]]}];  //11
const chords = [{'chordName':'major','chordTones':[0,4,7]},
              {'chordName':'minor','chordTones':[0,3,7]},
              {'chordName':'6th','chordTones':[0,4,7,9]},
              {'chordName':'7th','chordTones':[0,4,8,10]},
              {'chordName':'maj7','chordTones':[0,4,7,10]},
              {'chordName':'min7','chordTones':[0,3,7,10]},
              {'chordName':'sus','chordTones':[0,5,7]},
              {'chordName':'add9','chordTones':[0,4,7,2]}
  ];


// Returns higher octave
function raiseOctave(tone){    
    return tone *2;
}
// Returns lower octave
function lowerOctave(tone){    
    return tone / 2;
}


export default class PianoKeys {
  constructor() {
    this.numberOfKeys = 48;

  }

  soundOff(noted) {
    const body = document.querySelector('body');

    body.onkeydown = (event) => {
      if(!event.metakey) {
        event.preventDefault();
      }
      let context = new(window.AudioContext || window.webkitAudioContext)();
      let tone = new MakeSound(context);
      let shifted = event.shiftKey ? true : false;
      let now = context.currentTime;
      let noteKeys = document.querySelectorAll('.display_key');

      notes.forEach((note,i) => {

        for(let x=0; x<noteKeys.length;x++) {
          let keyTouch = noteKeys[x];
          let actualKey = i + 1;
           switch(event.keyCode) {
            case note.kCode[0]:

              if(shifted) {
                tone.play(lowerOctave(note.tone), now);
                keyTouch.classList.remove('active_key');
                noteKeys[actualKey-1].classList.add('active_key');
              } else {
                tone.play(note.tone, now);
                keyTouch.classList.remove('active_key');
                noteKeys[actualKey+11].classList.add('active_key');
              }
              
              break;
            case note.kCode[1]: 

              if(shifted) {
                tone.play(raiseOctave(raiseOctave(note.tone)), now);
                keyTouch.classList.remove('active_key');
                noteKeys[actualKey+35].classList.add('active_key');
              } else {
                tone.play(raiseOctave(note.tone), now);
                keyTouch.classList.remove('active_key');
                noteKeys[actualKey+23].classList.add('active_key');
                console.log(note.rootNote);
                console.log(actualKey+22);
              }
              
          }
        }
      });
    }
  }


  renderDiv() {
    let makeEle = new MakeElement;
    let key_container = makeEle.createEle('div','key_container',[12,12,12,12],'key_container');
    let keyAmount = Array(this.numberOfKeys).fill(null); // Need to find the right amount for the right "flow" 

    let keys = keyAmount.map((key,i) => {
      let octaveNum = i%12; // returns from 0 - 11, easier to identify sharps/flats
      let blackKeys = [1,3,6,8,10];
      let whiteOrBlackKey = 'white_key';
     
      if(blackKeys.includes(octaveNum)) {
        whiteOrBlackKey = 'black_key';   
      }
     
      let displayKey = makeEle.createEle('div','key_'+i,null,['display_key',whiteOrBlackKey]);
      displayKey.innerHTML = `<div class='keyNote'>${notes[octaveNum].rootNote}</div>`;
      

      key_container.append(displayKey);

      displayKey.addEventListener('click', () => {
        let context = new(window.AudioContext || window.webkitAudioContext)();
        let tone = new MakeSound(context);
        let now = context.currentTime;

        if(i > 11) {
          tone.play(raiseOctave(notes[octaveNum].tone), now);
        } else {
          tone.play(notes[octaveNum].tone, now);          
        }
      })

    });    


    this.soundOff();
    

    return key_container;
  }

}