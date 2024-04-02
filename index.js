// As Defined by Library //
// Must Know 128 ticks per beat //

import fs from "fs";
import path from "node:path";
import MidiWriter from "midi-writer-js";
import { convertNotes, getNote, getNoteDuration } from "./notes.js";
import {
  getScaleCount,
  getScale,
  getScaleArray,
  getScaleName,
} from "./scales.js";
import { argv } from "node:process";

// Input
let inputFile;
if (argv.length > 2) {
  inputFile = argv[2];
} else {
  console.log("Please pass an input file as an argument");
  process.exit();
}

let chordNoteCount;
if (argv.length > 3) {
  chordNoteCount = parseInt(argv[3]);
} else {
  chordNoteCount = 4;
}

console.log(`Input File = ${inputFile}\n`);
const originalFilename = path.basename(inputFile, path.extname(inputFile));
const track = new MidiWriter.Track();

let bufferArray = [];

// Open File and store array into bufferArray
try {
  const data = fs.readFileSync(inputFile);

  for (let i = 0; i < data.length; i++) {
    bufferArray.push(data[i]);
  }
} catch (err) {
  console.error(err);
}

// Store length of array before adjustments
const bufferLength = bufferArray.length;

// Transfer array to a range of 0 - 127 for midi
// Trim data to the first 50K elements for "less runtimes"
// Log out Trimmed Size
bufferArray = bufferArray.map((x) => parseInt(x / 2));
bufferArray = bufferArray.slice(0, 50000);

// Fix length of array. Must be divisible by Chord Count(+Velocity,+Duration) . (Note,Velocity,Duration)
for (let i = 0; bufferArray.length % (chordNoteCount + 2); i++) {
  bufferArray.push(0);
}

// Main Scale / Key Variables
const rootNote = bufferLength % 12;
const scaleSelection =
  parseInt(bufferLength / getScaleCount()) % getScaleCount();
const scaleArray = getScaleArray(rootNote, getScale(scaleSelection));
const hiNote = Math.max(...scaleArray);
const loNote = Math.min(...scaleArray);

// Util Functions
// Convert 0 - 127 to the range as defined by midi-writer-js... (0 - 100) <-for some reason
function convertVelocity(vel) {
  return parseInt((vel / 127) * 100);
}

function writeMidi(data) {
  track.addEvent(new MidiWriter.NoteEvent(data));
}

function snapToScale(note) {
  const hiNote = Math.max(...scaleArray);

  for (let i = 0; i < scaleArray.length; i++) {
    if (scaleArray[i] > note) {
      return scaleArray[i - 1];
    } else if (scaleArray[i] === note) {
      return scaleArray[i];
    } else if (note > hiNote) {
      return hiNote;
    }
  }
}

// Main forloop to add notes to the midi track
for (let i = 0; i < bufferArray.length; i += chordNoteCount + 2) {
  let notesArray = bufferArray.slice(i, i + chordNoteCount - 1);
  notesArray = notesArray.map((x) => convertNotes(snapToScale(x)));

  let datapacket = {
    pitch: notesArray,
    duration: getNoteDuration(bufferArray[i + chordNoteCount]),
    velocity: convertVelocity(bufferArray[i + chordNoteCount + 1]),
  };
  writeMidi(datapacket);
}

// Print Root note
console.log(`Root Note: ${getNote(rootNote)}`);
console.log(`Scale : ${getScaleName(scaleSelection)}`);

// Outputs Midifile in working directory... it's ugly but it works
const write = new MidiWriter.Writer(track);
const midiData = write.dataUri().split(";base64,").pop();
fs.writeFileSync(`${originalFilename}.mid`, midiData, { encoding: "base64" });
console.log(`\nComplete\n`);
