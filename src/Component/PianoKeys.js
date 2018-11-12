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
const makeEle = new MakeElement;

//              z  s  x  d  c  v  g  b  h   n  j
const keycodes = [90,83,88,68,67,86,71,66,72,78,74,77];

// 
/*
    OctKeycode has a bug dealing with keyboards. The '-' and '=' key is listed differently between a large keyboard and a laptop

*/


const octKeycode = [89,55,85,56,73,79,48,80,189,219,187,221];
//                y   7 u   8  i  o 0   p  -   [   =  ]



// This is more intended for a full scale keyboard. 
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
const notes = [  {'tone':261,'rootNote':'c','kCode':[keycodes[0],octKeycode[0]],'eventIndex':[0,12,24,36]},  // 0
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
    this.state = {
      numberOfKeys: 48,
      volume: [
          1, // Master volume
          0.5, // Mid Overtone volume
          0.25, // Lower Overtone volume
          0,
          0,
          0,

        ],
      activeSynth: [],
      midOvertones: [],
      midmidOvertones: [],
      midmidmidOvertones: [],
      lowerOvertones: [],
      lowerlowerOvertones: [],
      lowerlowerlowerOvertones: [],
      waveType: 'sawtooth',
      currentLoaded: false,
    }
    console.log(this.state);
    this.soundLevel = this.soundLevel.bind(this);
  }

/*

  Initializing oscillators for virtual piano keys

  - Collect all the keys using a querySelectorAll on .display_key
  - Have each key set up with their own oscillator on the correct frequency using the tone values
  - Said Oscillators are being created in the Synth() function, and returning into this.state.activeSynth

*/

  initializeOscillators(waveType) {
    const keyCount = this.state.numberOfKeys;
    const synthArray = [
                        this.state.activeSynth, 
                        this.state.lowerOvertones,
                        this.state.lowerlowerOvertones,
                        this.state.lowerlowerlowerOvertones,
                        this.state.midOvertones,
                        this.state.midmidOvertones,
                        this.state.midmidmidOvertones, ]


      synthArray.map((synArray,i) => {
        for(let x = 0; x < keyCount; x++) {
          let octaveNum = i%12;

          if(this.state.currentLoaded) {
            
            synArray[x].disconnect();
            synArray[x] = null;
          }

          synArray[x] = Synth(x,octaveNum, waveType);
        }
      })







/*    this.state.activeSynth, 
    this.state.lowerOvertones, 
    this.state.midOvertones,
    this.state.lowerlowerOvertones, 
    this.state.midmidOvertones,
    this.state.lowerlowerlowerOvertones, 
    this.state.midmidmidOvertones  = [];
    const skeletonVirtualSynth = new Array(this.state.numberOfKeys).fill(null); 
    const destination = context.destination;

    const virtualSynth = skeletonVirtualSynth.map((vKey,i) => {
       let octaveNum = i%12;
      this.state.activeSynth.push(Synth(i,octaveNum,this.state.waveType));
      this.state.midOvertones.push(Synth(i,octaveNum,this.state.waveType));
      this.state.lowerOvertones.push(Synth(i,octaveNum,this.state.waveType));
      this.state.midmidOvertones.push(Synth(i,octaveNum,this.state.waveType));
      this.state.lowerlowerOvertones.push(Synth(i,octaveNum,this.state.waveType));
      this.state.midmidmidOvertones.push(Synth(i,octaveNum,this.state.waveType));
      this.state.lowerlowerlowerOvertones.push(Synth(i,octaveNum,this.state.waveType));
            
    })
    console.log(this.state);*/
  }

  synthConsole() {
    let synthConsole = makeEle.createEle('div','synth_console',[12,12,12,12],'synthConsole');
    let speakersCount = Array(6).fill(null);
    let knobsCount = Array(5).fill(null);
    let waveCount = Array(5).fill(null);
    let speakersContainer = [];
    let knobsContainer = null;
    let knobTypes = ['attack','decay','sustain','release',];
    let waveTypes = ['sine','square','triangle','sawtooth','custom'];
    let screenDisplay = null;
    let rightSide = null;
    let leftSide = null;
  
    speakersCount.map((speaker,i) => {

      let typeOfSpeaker = null;
      let fans = null;
      
      if(i <= 2) {
        fans = 6;
        typeOfSpeaker = 'largeSpeaker';
      } else {
        fans = 3;
        typeOfSpeaker = 'smallSpeaker';
      }

      let speakr = makeEle.createEle('div','synth_speaker_'+i,[12,12,12,12],['speaker',typeOfSpeaker]);
            

      for(let x=0;x<=fans;x++) {
        let renderedFan = makeEle.createEle('div','speaker_'+i+'_fan_'+x,[12,12,12,12],['fans','speaker_'+i+'fans']);

        speakr.append(renderedFan);
      }
      speakersContainer.push(speakr);  
    });

    screenDisplay = makeEle.createEle('div','screen_display',null,'screenDisplay');
    let actualScreen = makeEle.createEle('div','actual_screen',null,'actualScreen');

    screenDisplay.append(actualScreen);

    knobsContainer = makeEle.createEle('div','knob_container',null,'knobContainer');
    
    knobsCount.map((knob,i) => {
      let renderKnob = makeEle.createEle('div','knob_'+i,null,'knobs');
      renderKnob.knobType = knobTypes[i];
      console.log(renderKnob);

      knobsContainer.append(renderKnob);
    })

    let waveChoose = makeEle.createEle('div','wave_choose',null,'waveChoose');

    waveCount.map((wave,i) => {
      let renderWave = makeEle.createEle('div','wave_'+i,null,'wave');

      renderWave.innerHTML = waveTypes[i];
      renderWave.waveType = waveTypes[i];

      waveChoose.append(renderWave);

    })

    let volumeControl = makeEle.createEle('div','vol_control',null,'volumeControl');
    let volumeKnob = makeEle.createEle('input','vol_knob',null,'volumeKnob');
    volumeKnob.type = 'range';
    volumeKnob.min = 0;
    volumeKnob.max = 100; // So you're not blasting your eardrums out. 

    
    rightSide = makeEle.createEle('div','right_side',null,'rightSide');
    leftSide = makeEle.createEle('div','left_side',null,'leftSide');
        
    volumeControl.append(volumeKnob);

    leftSide.append(volumeControl, waveChoose);


    this.soundLevel(volumeControl);
    this.changeWaveType(waveChoose);

    
    let mainConsole = makeEle.createEle('div','main_console',[12,12,12,12],'mainConsole');
    



    mainConsole.append(leftSide ,screenDisplay, rightSide, knobsContainer);
    synthConsole.append(speakersContainer[0],mainConsole,speakersContainer[1]);

 

    return synthConsole
  }


  changeWaveType(wavy) {
    console.log(wavy.children);

    for(let x=0; x<wavy.children.length; x++) {
      let waveDiv = wavy.children[x];

      waveDiv.addEventListener('click',(event) => {
        console.log(event.target.waveType);
        this.state.waveType = event.target.waveType;
        this.state.currentLoaded = true;
        this.initializeOscillators(this.state.waveType);
      })
    }
  }


  soundOn() {
    const body = document.querySelector('body');
    body.addEventListener('keydown', (event) => {
    if(!event.metakey) {
      event.preventDefault();
    }
    let noteKeys = this.state.numberOfKeys;
    let now = context.currentTime;
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
      let midOvertone = 16;
      let lowerOvertones = 19;
      switch(event.keyCode) {
        case note.kCode[0] :
          if(shifted) {
            virtualKeys[note.eventIndex[0]].classList.add('active_key');
            notePosition = virtualKeys[note.eventIndex[0]].keyPosition;
            this.state.activeSynth[notePosition].start(this.state.volume[0], now);
            this.state.midOvertones[notePosition+4].start(this.state.volume[1], now);
            this.state.lowerOvertones[notePosition+7].start(this.state.volume[2], now);
            this.state.midmidOvertones[notePosition].start(this.state.volume[3], now);
            this.state.lowerlowerOvertones[notePosition+4].start(this.state.volume[4], now);
            this.state.midmidmidOvertones[notePosition].start(this.state.volume[5], now);
            this.state.lowerlowerlowerOvertones[notePosition+4].start(this.state.volume[6], now);

          } else {
            virtualKeys[note.eventIndex[1]].classList.add('active_key');
            notePosition = virtualKeys[note.eventIndex[1]].keyPosition;
            this.state.activeSynth[notePosition].start(this.state.volume[0], now);
            this.state.midOvertones[notePosition+4].start(this.state.volume[1], now);
            this.state.lowerOvertones[notePosition+7].start(this.state.volume[2], now);
            this.state.midmidOvertones[notePosition].start(this.state.volume[3], now);
            this.state.lowerlowerOvertones[notePosition+4].start(this.state.volume[4], now);
            this.state.midmidmidOvertones[notePosition].start(this.state.volume[5], now);
            this.state.lowerlowerlowerOvertones[notePosition+4].start(this.state.volume[6], now);
    
    }
          break;
        case note.kCode[1] :
          if(shifted) {
            virtualKeys[note.eventIndex[3]].classList.add('active_key');
            notePosition = virtualKeys[note.eventIndex[3]].keyPosition;
            this.state.activeSynth[notePosition].start(this.state.volume[0], now);
            this.state.midOvertones[notePosition+4].start(this.state.volume[1], now);
            this.state.lowerOvertones[notePosition+7].start(this.state.volume[2], now);
            this.state.midmidOvertones[notePosition].start(this.state.volume[3], now);
            this.state.lowerlowerOvertones[notePosition+4].start(this.state.volume[4], now);
            this.state.midmidmidOvertones[notePosition].start(this.state.volume[5], now);
            this.state.lowerlowerlowerOvertones[notePosition+4].start(this.state.volume[6], now);

          } else {
            virtualKeys[note.eventIndex[2]].classList.add('active_key');
            notePosition = virtualKeys[note.eventIndex[2]].keyPosition;      
            this.state.activeSynth[notePosition].start(this.state.volume[0], now);
            this.state.midOvertones[notePosition+4].start(this.state.volume[1], now);
            this.state.lowerOvertones[notePosition+7].start(this.state.volume[2], now);
            this.state.midmidOvertones[notePosition].start(this.state.volume[3], now);
            this.state.lowerlowerOvertones[notePosition+4].start(this.state.volume[4], now);
            this.state.midmidmidOvertones[notePosition].start(this.state.volume[5], now);
            this.state.lowerlowerlowerOvertones[notePosition+4].start(this.state.volume[6], now);
         
         }
          break;          
      }
    })
    })
  }

/*

    Need to redo this. 

    It's pretty much the same code as SoundOn() except dealing with a keyup 
    than keydown. 
*/

  soundOff() {
    const body = document.querySelector('body');
    body.addEventListener('keyup', (event) => {
    if(!event.metakey) {
      event.preventDefault();
    }
    let now = context.currentTime.toFixed(2);
    let noteKeys = this.state.numberOfKeys;
    let shifted = event.shiftKey ? true : false;
    let virtualKeys = [];
    for(let x=0; x<noteKeys; x++) {
     virtualKeys.push(document.querySelector('#key_'+x));
    
    }

/*
    Runs through the notes hash and checks the event key code. 
    If matches, then it will start the oscillator with the volume set. 


    Definitely needs to be cleaned up to make it easier to read. 

    So far it works. 


*/

    notes.map((note,i) => {
      let notePosition = 12;
      switch(event.keyCode) {
        case note.kCode[0] :
          if(shifted) {
            virtualKeys[note.eventIndex[0]].classList.remove('active_key');
            notePosition = virtualKeys[note.eventIndex[0]].keyPosition;
            this.state.activeSynth[notePosition].stop(0, now);
            this.state.midOvertones[notePosition+4].stop(0, now);
            this.state.lowerOvertones[notePosition+7].stop(0, now);
            this.state.midmidOvertones[notePosition].stop(0, now);
            this.state.lowerlowerOvertones[notePosition+4].stop(0, now);
            this.state.midmidmidOvertones[notePosition].stop(0, now);
            this.state.lowerlowerlowerOvertones[notePosition+4].stop(0, now);


          } else {
            virtualKeys[note.eventIndex[1]].classList.remove('active_key');
            notePosition = virtualKeys[note.eventIndex[1]].keyPosition;
            this.state.activeSynth[notePosition].stop(0, now);
            this.state.midOvertones[notePosition+4].stop(0, now);
            this.state.lowerOvertones[notePosition+7].stop(0, now);
            this.state.midmidOvertones[notePosition].stop(0, now);
            this.state.lowerlowerOvertones[notePosition+4].stop(0, now);            
            this.state.midmidmidOvertones[notePosition].stop(0, now);
            this.state.lowerlowerlowerOvertones[notePosition+4].stop(0, now);

          }
          break;
        case note.kCode[1] :
          if(shifted) {
            virtualKeys[note.eventIndex[3]].classList.remove('active_key');
            notePosition = virtualKeys[note.eventIndex[3]].keyPosition;          
            this.state.activeSynth[notePosition].stop(0, now);
            this.state.midOvertones[notePosition+4].stop(0, now);
            this.state.lowerOvertones[notePosition+7].stop(0, now);            
            this.state.midmidOvertones[notePosition].stop(0, now);
            this.state.lowerlowerOvertones[notePosition+4].stop(0, now);
            this.state.midmidmidOvertones[notePosition].stop(0, now);
            this.state.lowerlowerlowerOvertones[notePosition+4].stop(0, now);

          } else {
            virtualKeys[note.eventIndex[2]].classList.remove('active_key');
            notePosition = virtualKeys[note.eventIndex[2]].keyPosition;
            this.state.activeSynth[notePosition].stop(0, now);
            this.state.midOvertones[notePosition+4].stop(0, now);
            this.state.lowerOvertones[notePosition+7].stop(0, now);          
            this.state.midmidOvertones[notePosition].stop(0, now);
            this.state.lowerlowerOvertones[notePosition+4].stop(0, now);          
            this.state.midmidmidOvertones[notePosition].stop(0, now);
            this.state.lowerlowerlowerOvertones[notePosition+4].stop(0, now);

          }
          break;          
      }
    })
    })
  }
  renderDiv() {

    let pianoContainer = makeEle.createEle('div','piano_container',[12,12,12,12],['baseContent','pianoContainer']);

    let keyboardDisplay = makeEle.createEle('div','keyboard_display', [12,12,12,12],'keyboardDisplay');

    let keyAmount = Array(this.state.numberOfKeys).fill(null); // Need to find the right amount for the right "flow" 
    let key_container = makeEle.createEle('div','key_container',[12,12,12,12],'key_container');
    let whiteKeyContainer = makeEle.createEle('div','white_key_container',[12,12,12,12],['whiteKeyContainer','pianoKeysContainer']);
    let blackKeyContainer = makeEle.createEle('div','black_key_container',[12,12,12,12],['blackKeyContainer','pianoKeysContainer']);

    let keys = keyAmount.map((key,i) => {
      let octaveNum = i%12; // returns from 0 - 11, easier to identify sharps/flats
      let blackKeys = [1,3,6,8,10];  // Flat/Sharp keys index identifiers. 
      let whiteOrBlackKey = 'white_key';
      let whichKey = 'whiteKeyContainer';
      let freqName, displayKey = null;

      // Splits up notes to approriate octave row 
      if(i >= 24 && i <= 35) {
          freqName = notes[octaveNum].rootNote + '5';
        } else if (i >= 11 && i <= 23) {
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
     
      displayKey = makeEle.createEle('div','key_'+i,null,['display_key',whiteOrBlackKey]);
      displayKey.innerHTML = `<div class='keyNote'>${notes[octaveNum].rootNote}</div>`;
      displayKey.renderedNote = freqName;
      displayKey.keyPosition = i;


      eval(whichKey).append(displayKey);

      displayKey.addEventListener('mouseenter', () => {
        this.state.activeSynth[displayKey.keyPosition].start(this.state.volume[0]);
      })
      displayKey.addEventListener('mouseleave', () => {
        this.state.activeSynth[displayKey.keyPosition].stop(0);
      })
    });    
    key_container.append(whiteKeyContainer, blackKeyContainer);

    keyboardDisplay.append(this.synthConsole());
    pianoContainer.append(keyboardDisplay, key_container);
    
    
    return pianoContainer;
  }
  soundLevel(vlControl) {
    let dragged = false;
    console.log(vlControl.children[0]);
    vlControl.children[0].addEventListener('input', (event) => {
      console.log(vlControl.children[0].value);
      console.log((vlControl.children[0].value / 10));
      this.state.volume[0] = (vlControl.children[0].value / 100) / 3;
      this.state.volume[1] = (this.state.volume[0] / 2).toFixed(6);
      this.state.volume[2] = (this.state.volume[1] / 2).toFixed(6);
      this.state.volume[3] = (this.state.volume[2] / 2).toFixed(6);
      this.state.volume[4] = (this.state.volume[3] / 2).toFixed(6);
      this.state.volume[5] = (this.state.volume[4] / 2).toFixed(6);
      this.state.volume[6] = (this.state.volume[5] / 2).toFixed(6);
      console.log(this.state.volume);
    })

  }

}