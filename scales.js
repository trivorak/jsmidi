const scales = [
    {
        id: 0,
        name: 'Major',
        notes: [0,2,4,5,7,9,11], 
    },
    {
        id: 1,
        name: 'Natural Minor',
        notes: [0,2,3,5,7,8,10], 
    },
    {
        id: 2,
        name: 'Harmonic Minor',
        notes: [0,2,3,5,7,8,11], 
    },
    {
        id: 3,
        name: 'Melodic Minor',
        notes: [0,2,3,5,7,9,11], 
    },
    {
        id: 4,
        name: 'Dorian',
        notes: [0,2,3,5,7,9,10], 
    },
    {
        id: 5,
        name: 'Locrian',
        notes: [0,1,3,4,7,8,10], 
    },    
    {
        id: 6,
        name: 'Lydian',
        notes: [0,2,4,6,7,9,11], 
    }, 
    {
        id: 7,
        name: 'Mixolydian',
        notes: [0,2,4,5,7,9,10], 
    }, 
    {
        id: 8,
        name: 'Phrygian',
        notes: [0,1,3,5,7,8,10], 
    },     
    {
        id: 9,
        name: 'Pentatonic Major',
        notes: [0,2,4,7,9], 
    },       
    {
        id: 10,
        name: 'Pentatonic Minor',
        notes: [0,3,5,7,10], 
    },      
]



export function getScaleCount(){
    return scales.length;
};

export function getScale(i){
    return scales.find(x => x.id === i).notes;
};

export function getScaleName(i){
    return scales.find(x => x.id === i).name
}

function divmod(x,y){
    let quote = Math.floor(x/y);
    let remaind = x % y
    return [quote,remaind]
}

export function getScaleArray(root,scale){
    root -= 12;
    let scaleArray = [];
    let i = 0
    while (true){
        let resultValue = (root + scale[i%scale.length]) + (12 * Math.floor(i/scale.length));
        if (resultValue >= 128){
            break;
        }
        else if (resultValue >= 0){
            scaleArray.push(resultValue)
        }
        i++;
    }
    return(scaleArray)
}
