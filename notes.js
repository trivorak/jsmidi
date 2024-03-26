const notes = [
    {
        id: 0,
        name: 'C'
    },
    {
        id: 1,
        name: 'C#'
    },
    {
        id: 2,
        name: 'D'
    },
    {
        id: 3,
        name: 'D#'
    },
    {
        id: 4,
        name: 'E'
    },
    {
        id: 5,
        name: 'F'
    },
    {
        id: 6,
        name: 'F#'
    },
    {
        id: 7,
        name: 'G'
    },
    {
        id: 8,
        name: 'G#'
    },
    {
        id: 9,
        name: 'A'
    },
    {
        id: 10,
        name: 'A#'
    },
    {
        id: 11,
        name: 'B'
    }
];

// Lookup note names from larger list
function getNote(input){
    let notenumber = input % 12;
    return notes.find(x => x.id === notenumber).name;
}

// Return Octave of Note
function getOctave(input){
    return parseInt((input)/12)-1;
}

// Larger function bringing everything together
export function convertNotes(input){
    let noteName = getNote(input);
    let octNumber = getOctave(input);
    return noteName+String(octNumber);
}
