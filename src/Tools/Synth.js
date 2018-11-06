import context from './audioContext';
import MakeSound from './MakeSound';

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

const virtualBoard = {};



function Synth(kPosition,octaveValue) {

  let octaveNum = kPosition % 12;
  let actualFreq = 440; 
  let freqName = null;

  let frequencyInfo = (kPosition) => {
        let octaveNum = kPosition%12;
        if(kPosition >= 23 && kPosition <= 35) {
          freqName = notes[octaveNum].rootNote + '5';
          actualFreq = raiseOctave(notes[octaveNum].tone);
        } else if (kPosition >= 11 && kPosition <= 22) {
          freqName = notes[octaveNum].rootNote + '4';
          actualFreq = notes[octaveNum].rootNote.tone;          
        } else if(kPosition >= 36) {
          freqName = notes[octaveNum].rootNote + '6';
          actualFreq = raiseOctave(raiseOctave(notes[octaveNum].tone));
        } else {
           freqName = notes[octaveNum].rootNote + '3';
           actualFreq = lowerOctave(notes[octaveNum].tone);
        }
      };
  if(!virtualBoard[freqName]) {
    frequencyInfo(kPosition);
    virtualBoard[freqName] = new MakeSound(context,actualFreq);
  }
  console.log(kPosition);
  console.log(virtualBoard);
  return virtualBoard[freqName];


}


export default Synth;

/*
  const virtualSynth = skeletonVirtualSynth.map((vKey,i) => {
    let octaveNum = i%12;

      let frequencyTone = (kPosition) => {
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
      let actualFreq = frequencyTone(i);
      vKey = new MakeSound(context,actualFreq);
      
    })*/