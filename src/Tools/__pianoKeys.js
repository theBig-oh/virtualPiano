import MakeElement from '../Tools/MakeElement';
import MakeSound from '../Tools/MakeSound';
import context from '../Tools/audioContext';


const keycodes = [
            //     Z  S  X  D   C  V  G  B  H   N  K  
                  [90,83,88,68,67,86,71,66,72,78,74,77], // Bottom half - Lower octave
                  [89,55,85,56,73,79,48,80,173,219,61,221], // Top half  - Higher Octave
            //     Y  7  U  8 I O  0  P -   P   =  [   ]

                  ];


// Set at Middle C.
const notes = [  
                 {'tone':261,'rootNote':'c','kCode':[keycodes[0][0],keycodes[1][0]]},   // 0
                 {'tone':277,'rootNote':'c#','kCode':[keycodes[0][1],keycodes[1][1]]},  // 1
                 {'tone':293,'rootNote':'d','kCode':[keycodes[0][2],keycodes[1][2]]},   // 2 
                 {'tone':311,'rootNote':'d#','kCode':[keycodes[0][3],keycodes[1][3]]},  // 3 
                 {'tone':329,'rootNote':'e','kCode':[keycodes[0][4],keycodes[1][4]]},   // 4
                 {'tone':349,'rootNote':'f','kCode':[keycodes[0][5],keycodes[1][5]]},   // 5 
                 {'tone':369,'rootNote':'f#','kCode':[keycodes[0][6],keycodes[1][6]]},  // 6
                 {'tone':392,'rootNote':'g','kCode':[keycodes[0][7],keycodes[1][7]]},   // 7
                 {'tone':415,'rootNote':'g#','kCode':[keycodes[0][8],keycodes[1][8]]},  // 8
                 {'tone':440,'rootNote':'a','kCode':[keycodes[0][9],keycodes[1][9]]},   // 9
                 {'tone':466,'rootNote':'a#','kCode':[keycodes[0][10],keycodes[1][10]]},//10 
                 {'tone':493,'rootNote':'b','kCode':[keycodes[0][11],keycodes[1][11]]}  //11

                ];  


/*

    Very basic octave calculator. 

    Works on the basis on squaring or dividing the frequency to achieve targeted note. 

    Should readjust it for a better innoation. 

*/


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

  initializeOscillators() {
    const skeletonVirtualSynth = new Array(this.numberOfKeys).fill(null); 

    const virtualSynth = skeletonVirtualSynth.map((vKey,i) => {
      let octaveNum = i%12;
      let frequencyTone = (x) => {
        if(x >= 23 && x <= 35) {
          return raiseOctave(notes[octaveNum].tone);
        } else if (x > 11 && x < 22) {
          return notes[octaveNum].tone;          
        } else if(x >= 36) {
          return raiseOctave(raiseOctave(notes[octaveNum].tone));
        } else {
           return lowerOctave(notes[octaveNum].tone);
        }
      };

      console.log(frequencyTone());
    })

  }



}