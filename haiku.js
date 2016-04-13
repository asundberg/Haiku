var fs = require('fs');

var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

// This function puts the data into an array of objects (wordArray), each object containing
// the word and number of syllables in the word, as property/value pairs.
function formatData(data){    
   var lines = data.toString().split("\n");
   var lineSplit;
   lines.forEach(function(line){    
    	lineSplit = line.split("  ");    
    	var numSyllables = syllableCount(lineSplit[1]);
    	if(numSyllables > 0) {
    		addToWordArray(lineSplit[0], numSyllables);
		}
	});   
}

// This function takes the phoneme layout part of the word line and converts it into a number 
// (of syllables in the word).
function syllableCount(phonemeLayout) {
	if(typeof(phonemeLayout) === 'undefined') {
		return 0;
	}
	var numSyllArr = phonemeLayout.match(/\d/g);
	if(numSyllArr === null) {
		return 0;
	}
	return numSyllArr.length; 
}

// This becomes an array of objects, each object containing the word and number of 
// syllables in the word, as property/value pairs.
var wordArray = [];

// This takes a word and number of syllables and puts it into the wordArray as an object.
function addToWordArray(word, syllables) {
	wordArray.push({ 
		word: word,
		syllables: syllables
	});
}

// I believe we need to call this function, in order for the correct data to be processed,
// so the rest of this assignment will work. QUESTION is - does this function run, even 
// though it's not under exports, if called through haiku_generator??? I think so.
formatData(cmudictFile);

// So now we know how to put the word and syllable information in objects in an array.
// Next, we need to figure out how to randomly pick words based on number of syllables
// specified as arguments in createHaiku function.

function randomWordSelect(requiredSyllNum) {
	var matchingWordArr = [];
	for(var i = 0; i < wordArray.length; i++) {
		if(wordArray[i].syllables === requiredSyllNum) {
			matchingWordArr.push(wordArray[i]);
		}
	}
	// This selects a random number that is somewhere between 0 and matchingWordArr.length.
	// The function then returns the name of that randomly picked object. 
	var indexNumSelect = Math.floor(Math.random() * matchingWordArr.length);
	return matchingWordArr[indexNumSelect];
}

function createHaiku(structure) {  // Ex: [1,2,2,3,2,2,2,3]
    var haiku = [];
    var count = 0;
    for(var i = 0; i < structure.length; i++) {
    	if(count !== 5 && count !== 12) {
    		count += structure[i];
    	} else {
    		count += structure[i];
    		haiku.push('\n');
    	} 
    	haiku.push(randomWordSelect(structure[i]).word);
    }
    return haiku.join(' ');
}

//     var haiku = [];
//     for(var i = 0; i < structure.length; i++) {
//     	haiku.push(randomWordSelect(structure[i]));
//     }
//     var countRow1 = 0;
//    	for(var i = 0; i < haiku.length; i++) {
//    		if(count < 6) {
//    		count += haiku[i].syllables;
//    		}
//    	}
// }

// function createHaiku(structure, syllabelsArr){
//   var arrOfWords;
//   return structure.map(function(lines){
//     return lines.map(function(syls){
//       arrOfWords = syllabelsArr[syls];
//       return arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
//     }).join(' ');
//   }).join('\n');
// }

// // Final action = what we export into haiku_generator.
module.exports = {
  createHaiku: createHaiku,

};


// STEP 1: Open the file.
// STEP 2: Split document into an array with each element being a line.
// STEP 3: Find out how many syllables are in each word. 
// STEP 4: Add to wordArray new object with properties: name and syllables.
// STEP 5: Add a random selection method for creating different haikus.