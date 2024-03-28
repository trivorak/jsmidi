// As Defined by Library //
// Must Know 128 ticks per beat //

import fs from 'fs';
import MidiWriter from 'midi-writer-js';
import { convertNotes } from './notes.js';
import { getNote } from './notes.js'
import { getScaleCount , getScale } from './scales.js'

const track = new MidiWriter.Track();

let bufferArray = [];

// Open File and store array into bufferArray
try {
	const data = fs.readFileSync('exercise_3.png');

	for (let i = 0; i < data.length; i++){
		bufferArray.push(data[i]);
	}
} catch(err) {
	console.error(err);
}

const bufferLength = bufferArray.length

// Transfer array to a range of 0 - 127 for midi 
bufferArray = Array.from(bufferArray,(x) => parseInt(x / 2));

// Fix length of array. Must be divisible by 3. (Note,Velocity,Duration)
for (let i = 0; bufferArray.length % 3 ; i++) {
	bufferArray.push(0);
}

// Util Functions
// Convert 0 - 127 to the range as defined by midi-writer-js... (0 - 100) <-for some reason
function convertVelocity(vel){
	return parseInt(vel / 127 * 100);
}

function getDuration(duration){
	return "T"+String(duration+1);
}

function writeMidi(data){
	track.addEvent(new MidiWriter.NoteEvent(data));
}


// Main forloop to add notes to the midi track
for (let i = 0; i<bufferArray.length;i+=3){
	let datapacket = {
		pitch:convertNotes(bufferArray[i]),
		duration: getDuration(bufferArray[i+1]),
		velocity: convertVelocity(bufferArray[i+2]),
	}
	writeMidi(datapacket);
}

const rootNote = bufferLength % 12;
const scaleSelection = parseInt(bufferLength / getScaleCount()) % getScaleCount();

console.log(scaleSelection)
// Print original non-adjusted buffer length
// Print Root note
console.log(bufferLength);
console.log('Root Note: '+ getNote(rootNote));
console.log('Scale : ' + getScale(scaleSelection));
console.log(getScaleName({scaleSelection}))


// // Uncomment Below to get export functions back///////////////////////////
// // Outputs Midifile in working directory... it's ugly but it works
// const write = new MidiWriter.Writer(track);
// const midiData = write.dataUri().split(';base64,').pop();
// fs.writeFileSync('test.midi',midiData,{encoding:'base64'});
// console.log("complete");