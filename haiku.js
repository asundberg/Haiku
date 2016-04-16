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

formatData(cmudictFile);

// So now we know how to put the word and syllable information in objects in an array.
// Next, we need to figure out how to randomly pick words based on number of syllables
// specified as arguments in createHaiku function.

function randomWordSelect(requiredSyllNum) {
	var matchingWordArr = wordArray.filter(function(elem) {
		return elem.syllables <= requiredSyllNum;
	});
	var indexNumSelect = Math.floor(Math.random() * matchingWordArr.length);
	return matchingWordArr[indexNumSelect];
}


function createHaiku(structure) {  
    var haiku = [];
    var syllCount = []; 
    for(var i = 0; i < structure.length; i++) {	
    	if(syllCount[i] === undefined) {
 			syllCount[i] = 0;
 		}
 		for(var j = 0; j < structure[i]; j = syllCount[i]) {
 			var wordThisRound = randomWordSelect(structure[i] - syllCount[i]);	
 			haiku.push(wordThisRound.word);
			syllCount[i] += wordThisRound.syllables;	
    	}
    	haiku.push('\n'); 
    }					  
    return haiku.join(' ');
}

// Final action = what we export into haiku_generator.
module.exports = {
  createHaiku: createHaiku

};


// STEP 1: Open the file.
// STEP 2: Split document into an array with each element being a line.
// STEP 3: Find out how many syllables are in each word. 
// STEP 4: Add to wordArray new object with properties: name and syllables.
// STEP 5: Add a random selection method for creating different haikus.