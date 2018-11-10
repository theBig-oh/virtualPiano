import context from './audioContext';
import MakeSound from './MakeSound';



// Set at Middle C.
const notes = [  
                 {'tone':261,'rootNote':'c'},   // 0
                 {'tone':277,'rootNote':'c#'},  // 1
                 {'tone':293,'rootNote':'d'},   // 2 
                 {'tone':311,'rootNote':'d#'},  // 3 
                 {'tone':329,'rootNote':'e'},   // 4
                 {'tone':349,'rootNote':'f'},   // 5 
                 {'tone':369,'rootNote':'f#'},  // 6
                 {'tone':392,'rootNote':'g'},   // 7
                 {'tone':415,'rootNote':'g#'},  // 8
                 {'tone':440,'rootNote':'a'},   // 9
                 {'tone':466,'rootNote':'a#'},//10 
                 {'tone':493,'rootNote':'b'}  //11

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
        if(kPosition >= 24 && kPosition <= 35) {
          freqName = notes[octaveNum].rootNote + '5';
          actualFreq = raiseOctave(notes[octaveNum].tone);
        } else if (kPosition >= 12 && kPosition <= 23) {
          freqName = notes[octaveNum].rootNote + '4';
          actualFreq = notes[octaveNum].tone;          
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
  return virtualBoard[freqName];
}


export default Synth;

