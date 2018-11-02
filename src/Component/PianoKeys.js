import MakeElement from '../Tools/MakeElement';
import MakeSound from '../Tools/MakeSound';
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
      let repeated = event.repeat ? true : false;
      let now = context.currentTime;
      let noteKeys = document.querySelectorAll('.display_key');

      notes.forEach((note,i) => {

        for(let x=0; x<noteKeys.length;x++) {
          let keyTouch = noteKeys[x];
          let actualKey = i + 1;
           switch(event.keyCode) {
            case note.kCode[0]:

              if(shifted) {
                tone.play(lowerOctave(note.tone), now + 0.25);
                keyTouch.classList.remove('active_key');
                /*noteKeys[actualKey-1].classList.add('active_key');*/
                document.querySelector('#key_'+(actualKey-1)).classList.add('active_key');
              } else {
                tone.play(note.tone, now + 0.25);
                keyTouch.classList.remove('active_key');
         /*       noteKeys[actualKey+11].classList.add('active_key');*/
                 document.querySelector('#key_'+(actualKey+11)).classList.add('active_key');
              }
              
              break;
            case note.kCode[1]: 

              if(shifted) {
                tone.play(raiseOctave(raiseOctave(note.tone)), now + 0.25);
                keyTouch.classList.remove('active_key');
/*                noteKeys[actualKey+35].classList.add('active_key');*/
                 document.querySelector('#key_'+(actualKey+35)).classList.add('active_key');
              } else {
                tone.play(raiseOctave(note.tone), now + 0.25);
                keyTouch.classList.remove('active_key');
/*                noteKeys[actualKey+23].classList.add('active_key');*/
                 document.querySelector('#key_'+(actualKey+23)).classList.add('active_key');
              }
              
          }
        }
      });
    }
  }
/*soundOff(noted) {

  const body = document.querySelector('body');
  let context = new(window.AudioContext || window.webkitAudioContext)();
  let tone = null;
  let now = null;
  let isPressed = false;
  body.addEventListener('keydown', (event) => {
    if(!event.metakey) {
      event.preventDefault();
    } 


     tone = new MakeSound(context);
    let shifted = event.shiftKey ? true : false;
    now = context.currentTime;
    let noteKeys = document.querySelectorAll('.display_key');
    if(event.repeat) {
      now = context.currentTime;
    }

    notes.forEach((note,i) => {
      console.log(note);
      for(let x=0; x<noteKeys.length;x++) {
        let keyTouch = noteKeys[x];
        let actualKey = i + 1;

        switch(event.keyCode) {
          case note.kCode[0]: 
            if(shifted) {
              tone.play(lowerOctave(note.tone), now);
              tone.stop(now);
              keyTouch.classList.remove('active_key');
            } else {
                tone.play(note.tone, now);
                tone.stop(now);
                keyTouch.classList.remove('active_key');
                noteKeys[actualKey+11].classList.add('active_key');
            } 
            break;
          case note.kCode[1]: 
            if(shifted) {
              tone.play(raiseOctave(raiseOctave(note.tone)), now);
              tone.stop(now);
              keyTouch.classList.remove('active_key');
              noteKeys[actualKey+35].classList.add('active_key');
            } else {
              tone.play(raiseOctave(note.tone), now);
              tone.stop(now);
              keyTouch.classList.remove('active_key');
              noteKeys[actualKey+23].classList.add('active_key');
            }
            break;            
         }

      }
    })

  })

} */
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
     
      if(blackKeys.includes(octaveNum)) {
        whiteOrBlackKey = 'black_key';
        whichKey = 'blackKeyContainer';
      }
     
      let displayKey = makeEle.createEle('div','key_'+i,null,['display_key',whiteOrBlackKey]);
      displayKey.innerHTML = `<div class='keyNote'>${notes[octaveNum].rootNote}</div>`;

      eval(whichKey).append(displayKey);
      

      displayKey.addEventListener('click', () => {
        let context = new(window.AudioContext || window.webkitAudioContext)();
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