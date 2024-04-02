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

This will generate a midi file using sandbox.db as a "seed". Midi file will be saved where the script is called from.

Midi file will retain the original filename. this example would return a midifile named `sandbox.db`

### Example with 'note stacked' chords

```
node .\index.js C:\Users\h228797\Desktop\sandbox.db 2
```

This will generate a file of 2 note chords

## Options

The program accepts 2 input argument.

- 1st is your file name to use for midi creation.
- 2nd argument is how many notes you want stacked for chords.

By default if you don't pass it a 2nd argument the midi file will be generated with 4 note chords.

# Future Features
