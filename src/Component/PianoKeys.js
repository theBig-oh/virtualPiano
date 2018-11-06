import MakeElement from '../Tools/MakeElement';
import MakeSound from '../Tools/MakeSound';
import context from '../Tools/audioContext';
import Synth from '../Tools/Synth'; 
// Needs to be made into its own seperate component. 

/*

  KeyCodes---- 

    How the user plays it using the keyboard.

    `keycodes` & `octKeycodes` represent the range of a standard keyboard starting at middle C. 

    `Z` is middle C. (Not going to say C3 or C4 cause that's confusing for both musicans and developers... Google it to find out more)

    `Y` is C raised 1 full octave.

    `Shift` + `Z` is C lowered by 1 full octave

    `Shift` + `Y` is C raised by 2 octaves.



    This effectively gives you a range of 4 full octaves.


    Gonna have to test out some configurations for laptop support, and see if I can check keyboard keycount beforehand.

*/

//              z  s  x  d  c  v  g  b  h   n  j
const keycodes = [90,83,88,68,67,86,71,66,72,78,74,77];

//                
const octKeycode = [89,55,85,56,73,79,48,80,173,219,61,221];
//                y   7 u   8  i  o 0   p  -   [   =  ]

const auxKeycode = {
                    "numPad":[
                              96, //  0
                              97, //  1
                              98, //  2
                              99, //  3
                              100, // 4
                              101, // 5
                              102, // 6
                              103, // 7
                              104, // 8
                              105, // 9
                              110, // .
                              107, // +
                              109, // -
                              106, // *
                              111, // /
                            ],
                    "fullKeyInserGroup": [
                                          45, //  Insert
                                          46, //  Delete
                                          36, //  Home
                                          35, //  End
                                          33, //  Page Up / PgUp
                                          34, //  Page Down / PgDwn
                                        ]
                  };


// Set at Middle C.
const notes = [     {'tone':261,'rootNote':'c','kCode':[keycodes[0],octKeycode[0]],'eventIndex':[0,12,24,36]},  // 0
                 {'tone':277,'rootNote':'c#','kCode':[keycodes[1],octKeycode[1]],'eventIndex':[1,13,25,37]}, // 1
                 {'tone':293,'rootNote':'d','kCode':[keycodes[2],octKeycode[2]],'eventIndex':[2,14,26,38]},   // 2 
                 {'tone':311,'rootNote':'d#','kCode':[keycodes[3],octKeycode[3]],'eventIndex':[3,15,27,39]}, // 3 
                 {'tone':329,'rootNote':'e','kCode':[keycodes[4],octKeycode[4]],'eventIndex':[4,16,28,40]},   // 4
                 {'tone':349,'rootNote':'f','kCode':[keycodes[5],octKeycode[5]],'eventIndex':[5,17,29,41]},   // 5 
                 {'tone':369,'rootNote':'f#','kCode':[keycodes[6],octKeycode[6]],'eventIndex':[6,18,30,42]}, // 6
                 {'tone':392,'rootNote':'g','kCode':[keycodes[7],octKeycode[7]],'eventIndex':[7,19,31,43]},   // 7
                 {'tone':415,'rootNote':'g#','kCode':[keycodes[8],octKeycode[8]],'eventIndex':[8,20,32,44]}, // 8
                 {'tone':440,'rootNote':'a','kCode':[keycodes[9],octKeycode[9]],'eventIndex':[9,21,33,45]},   // 9
                 {'tone':466,'rootNote':'a#','kCode':[keycodes[10],octKeycode[10]],'eventIndex':[10,22,34,46]}, //10 
                 {'tone':493,'rootNote':'b','kCode':[keycodes[11],octKeycode[11]],'eventIndex':[11,23,35,47]}];  //11
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
    this.state = {
      volume: 1,

    }

  }

/*

  Initializing oscillators for virtual piano keys

  - Collect all the keys using a querySelectorAll on .display_key
  - Have each key set up with their own oscillator on the correct frequency using the tone values


*/

  initializeOscillators() {
    const skeletonVirtualSynth = new Array(this.numberOfKeys).fill(null); 
    const destination = context.destination;
    const virtualSynth = skeletonVirtualSynth.map((vKey,i) => {
      let octaveNum = i%12;
      Synth(i,octaveNum);
    })
  }
  soundOn() {
    const body = document.querySelector('body');
    body.addEventListener('keydown', (event) => {
    if(!event.metakey) {
      event.preventDefault();
    }

    console.log(event);
    let noteKeys = this.numberOfKeys;
    let shifted = event.shiftKey ? true : false;
    let virtualKeys = [];
    for(let x=0; x<noteKeys; x++) {
     virtualKeys.push(document.querySelector('#key_'+x));
    
    }

/*
    Runs through the notes hash and checks the event key code. 
    If matches, then it will start the oscillator with the volume set. 



*/

    notes.map((note,i) => {
      let notePosition = 12;
      switch(event.keyCode) {
        case note.kCode[0] :
          if(shifted) {
            virtualKeys[note.eventIndex[0]].classList.add('active_key');
            notePosition = virtualKeys[note.eventIndex[0]].keyPosition;
            Synth(notePosition).start(this.state.volume);

          } else {
            virtualKeys[note.eventIndex[1]].classList.add('active_key');
            notePosition = virtualKeys[note.eventIndex[1]].keyPosition;

            Synth(notePosition).start(this.state.volume);
          }
          break;
        case note.kCode[1] :
          if(shifted) {
            virtualKeys[note.eventIndex[3]].classList.add('active_key');
            notePosition = virtualKeys[note.eventIndex[3]].keyPosition;
            Synth(notePosition).start(this.state.volume);

          } else {
            virtualKeys[note.eventIndex[2]].classList.add('active_key');
            notePosition = virtualKeys[note.eventIndex[2]].keyPosition;
            
            Synth(notePosition).start(this.state.volume);
          }
          break;          
      }
    })


    })
  }

  soundOff() {
    const body = document.querySelector('body');
    body.addEventListener('keyup', (event) => {
    if(!event.metakey) {
      event.preventDefault();
    }


    console.log('key up');
    console.log(event);
    let noteKeys = this.numberOfKeys;
    let shifted = event.shiftKey ? true : false;
    let virtualKeys = [];
    for(let x=0; x<noteKeys; x++) {
     virtualKeys.push(document.querySelector('#key_'+x));
    
    }

/*
    Runs through the notes hash and checks the event key code. 
    If matches, then it will start the oscillator with the volume set. 



*/

    notes.map((note,i) => {
      let notePosition = 12;
      switch(event.keyCode) {
        case note.kCode[0] :
          if(shifted) {
            virtualKeys[note.eventIndex[0]].classList.remove('active_key');
            notePosition = virtualKeys[note.eventIndex[0]].keyPosition;
            Synth(notePosition).stop();

          } else {
            virtualKeys[note.eventIndex[1]].classList.remove('active_key');
            notePosition = virtualKeys[note.eventIndex[1]].keyPosition;

            Synth(notePosition).stop(0);
          }
          break;
        case note.kCode[1] :
          if(shifted) {
            virtualKeys[note.eventIndex[3]].classList.remove('active_key');
            notePosition = virtualKeys[note.eventIndex[3]].keyPosition;
            Synth(notePosition).stop(0);

          } else {
            virtualKeys[note.eventIndex[2]].classList.remove('active_key');
            notePosition = virtualKeys[note.eventIndex[2]].keyPosition;
            
            Synth(notePosition).stop(0);
          }
          break;          
      }
    })


    })
  }
  renderDiv() {
    let makeEle = new MakeElement;
    let pianoContainer = makeEle.createEle('div','piano_container',[12,12,12,12],['baseContent','pianoContainer']);

    let keyboardDisplay = makeEle.createEle('div','keyboard_display', [12,12,12,12],'keyboardDisplay');

    let keyAmount = Array(this.numberOfKeys).fill(null); // Need to find the right amount for the right "flow" 
    let key_container = makeEle.createEle('div','key_container',[12,12,12,12],'key_container');
    let whiteKeyContainer = makeEle.createEle('div','white_key_container',[12,12,12,12],['whiteKeyContainer','pianoKeysContainer']);
    let blackKeyContainer = makeEle.createEle('div','black_key_container',[12,12,12,12],['blackKeyContainer','pianoKeysContainer']);

    let keys = keyAmount.map((key,i) => {
      let octaveNum = i%12; // returns from 0 - 11, easier to identify sharps/flats
      let blackKeys = [1,3,6,8,10];
      let whiteOrBlackKey = 'white_key';
      let whichKey = 'whiteKeyContainer';
      let freqName = null;

      if(i >= 23 && i <= 35) {
          freqName = notes[octaveNum].rootNote + '5';
          
        } else if (i >= 11 && i <= 22) {
          freqName = notes[octaveNum].rootNote + '4';
                   
        } else if(i >= 36) {
          freqName = notes[octaveNum].rootNote + '6';
          
        } else {
           freqName = notes[octaveNum].rootNote + '3';  
       }


      if(blackKeys.includes(octaveNum)) {
        whiteOrBlackKey = 'black_key';
        whichKey = 'blackKeyContainer';
      }
     
      let displayKey = makeEle.createEle('div','key_'+i,null,['display_key',whiteOrBlackKey]);
      displayKey.innerHTML = `<div class='keyNote'>${notes[octaveNum].rootNote}</div>`;
      displayKey.renderedNote = freqName;
      displayKey.keyPosition = i;


      eval(whichKey).append(displayKey);
      

      displayKey.addEventListener('click', () => {
        let tone = new MakeSound(context);
        let now = context.currentTime;

        if(i > 23 && i <= 35) {
          tone.play(raiseOctave(notes[octaveNum].tone), now);
        } else if (i > 11 && i < 22) {
          tone.play(notes[octaveNum].tone, now);          
        } else if(i >= 36) {
          tone.play(raiseOctave(raiseOctave(notes[octaveNum].tone)), now);
        } else {
           tone.play(lowerOctave(notes[octaveNum].tone), now);
        }
      })

    });    
    key_container.append(whiteKeyContainer, blackKeyContainer);


    pianoContainer.append(keyboardDisplay, key_container);
    

    return pianoContainer;
  }

}