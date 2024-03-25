import MidiWriter from 'midi-writer-js';
import fs from 'fs';

const track = new MidiWriter.Track();

track.addEvent([
		new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
		new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
		new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
		new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
		new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}),
		new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
		new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'})
	], function(event, index) {
    return {sequential: true};
  }
);

const write = new MidiWriter.Writer(track);

const theData = write.dataUri().split(';base64,').pop();
console.log(theData)
fs.writeFileSync('test.midi',theData,{encoding:'base64'});