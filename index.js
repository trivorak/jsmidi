// As Defined by Library //
// Must Know 128 ticks per beat //

const fs = require('node:fs');
const MidiWriter = require('midi-writer-js');
const track = new MidiWriter.Track();

let = bufferArray = [];

// Open File and store array into bufferArray
try {
	const data = fs.readFileSync('exercise_3.png')

	for (let i = 0; i < data.length; i++){
		bufferArray.push(data[i]);
	}
} catch(err) {
	console.error(err);
}

// Transfer array to a range of 0 - 127 for midi 
bufferArray = Array.from(bufferArray,(x) => parseInt(x / 2));

// Fix length of array. Must be divisible by 3. (Note,Velocity,Duration)
for (let i = 0; bufferArray.length%3;i++) {
	bufferArray.push(0)
}

// Util Functions
// Convert 0 - 127 to the range as defined by midi-writer-js... (0 - 100) <-for some reason
function convertVelocity(vel){
	return parseInt(vel/127*100)
}

// Testing adding one event. Remove after i figure out looping mech (setup as sequencer... so i don't need to calculate ticks)
track.addEvent(new MidiWriter.NoteEvent({pitch:['E4'], duration: '4', velocity: '50'}));
track.addEvent(new MidiWriter.NoteEvent({pitch:['c4'], duration: '4', velocity: '50'}));

// Uncomment Below to get export functions back///////////////////////////
// // Outputs Midifile in working directory... it's ugly but it works
// const write = new MidiWriter.Writer(track);
// const midiData = write.dataUri().split(';base64,').pop();
// fs.writeFileSync('test.midi',midiData,{encoding:'base64'});