// As Defined by Library //
// Must Know 128 ticks per beat //

const fs = require('node:fs');

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

console.log(bufferArray)