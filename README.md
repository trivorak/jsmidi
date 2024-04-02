# JSMidi

An attempt to recreate a python script in JS/NodeJS

## Install

Clone Repo:

```
git clone https://github.com/trivorak/jsmidi
cd jsmidi
npm install
```

## Usage

Call index.js and pass it a file path.

example:

```
node .\index.js C:\Users\h228797\Desktop\sandbox.db
```

This will generate a midi file using sandbox.db as a "seed". Midi file will be saved where the script is called from

## Options

If you open the index.js file there's a varible that give you the option to select how many notes you'd like stacked (Chord Builder). For a monophonic line set to 1. Update as needed.

```
const chordNoteCount = 1;
```

# Future Features

- [x] Change scales from 2 disconnected const varibles into json objects. This will give me the ability to console.log scale names
- [x] Fix note duration to "Snap" between 1/16 - 1 whole
- [x] Add Chords Option
- [x] Ability to pass arg of notes in chords
