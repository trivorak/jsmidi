const majorScale = [0,2,4,5,7,9,11];
const naturalMinorScale = [0,2,3,5,7,8,10];
const harmonicMinorScale = [0,2,3,5,7,8,11];
const melodicMinorScale = [0,2,3,5,7,9,11];
const dorianScale = [0,2,3,5,7,9,10];
const locrianScale = [0,1,3,4,7,8,10];
const lydianScale = [0,2,4,6,7,9,11];
const mixolydianScale = [0,2,4,5,7,9,10];
const phrygianScale =[0,1,3,5,7,8,10];
const pentatonicMajorScale = [0,2,4,7,9];
const pentatonicMinorScale = [0,3,5,7,10];

const scales = [majorScale,naturalMinorScale,harmonicMinorScale,
        melodicMinorScale,dorianScale,locrianScale,lydianScale,
        mixolydianScale,phrygianScale,pentatonicMajorScale,pentatonicMinorScale];

function getAllScales(){
    return scales;
};

export function getScaleCount(){
    return scales.length;
};

export function getScale(i){
    return scales[i];
};
