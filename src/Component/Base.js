import MakeElement from '../Tools/MakeElement';
import PianoKeys from './PianoKeys';


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



export default class BaseLevel { 
  constructor() {

  }
  renderDiv() {
    let makeEle = new MakeElement;
    let baseDiv = makeEle.createEle('div','baseContainer',[12,12,12,12],'baseContain'); 
    let pianoKeys = new PianoKeys;

  
    baseDiv.appendChild(pianoKeys.renderDiv());

    return baseDiv  
  }
}