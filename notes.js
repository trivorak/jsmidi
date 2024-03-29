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
export function getNote(input){
    if (isNaN(input)){
        input = 0
    }
    let notenumber = input % 12;
    try{
        return notes.find(x => x.id === notenumber).name;
    }catch (error){
        console.error(error)
    }
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
