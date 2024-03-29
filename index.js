// As Defined by Library //
// Must Know 128 ticks per beat //

import fs from 'fs';
import MidiWriter from 'midi-writer-js';
import { convertNotes } from './notes.js';
import { getNote } from './notes.js'
import { getScaleCount , getScale , getScaleArray} from './scales.js'
import { argv } from 'node:process';


let inputFile;
if (argv.length > 2){
	inputFile = argv[2]
}else{
	console.log("Please pass an input file as an argument")
	process.exit()
}

console.log(`Input File = ${inputFile}\n`)
const track = new MidiWriter.Track();

let bufferArray = [];

// Open File and store array into bufferArray
try {
	const data = fs.readFileSync(inputFile);

	for (let i = 0; i < data.length; i++){
		bufferArray.push(data[i]);
	}
} catch(err) {
	console.error(err);
}

// Store length of array before adjustments
const bufferLength = bufferArray.length
console.log(`Array Length : ${bufferLength}`)

// Transfer array to a range of 0 - 127 for midi 
bufferArray = Array.from(bufferArray,(x) => parseInt(x / 2));

// Fix length of array. Must be divisible by 3. (Note,Velocity,Duration)
for (let i = 0; bufferArray.length % 3 ; i++) {
	bufferArray.push(0);
}

// Main Scale / Key Variables
const rootNote = bufferLength % 12;
const scaleSelection = parseInt(bufferLength / getScaleCount()) % getScaleCount();
const scaleArray = getScaleArray(rootNote,getScale(scaleSelection));
const hiNote = Math.max(...scaleArray);
const loNote = Math.min(...scaleArray);

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

function snapToScale(note){
	const hiNote = Math.max(...scaleArray);

	for (let i = 0; i < scaleArray.length; i++){
		if (scaleArray[i] > note){
			return scaleArray[i-1]
			break
		}
		else if (scaleArray[i] === note){
			return scaleArray[i]
			break
		}
		else if (note > hiNote) {
			return hiNote
		}
	}
}


// Main forloop to add notes to the midi track
for (let i = 0; i<bufferArray.length;i+=3){
	let datapacket = {
		pitch:convertNotes(snapToScale(bufferArray[i])),
		duration: getDuration(bufferArray[i+1]),
		velocity: convertVelocity(bufferArray[i+2]),
	}
	writeMidi(datapacket);
}


// Print Root note
console.log(`Root Note: ${getNote(rootNote)}`);
console.log(`Scale : ${getScale(scaleSelection)}`);


// Outputs Midifile in working directory... it's ugly but it works
const write = new MidiWriter.Writer(track);
const midiData = write.dataUri().split(';base64,').pop();
fs.writeFileSync('test.midi',midiData,{encoding:'base64'});
console.log(`Complete\n`);