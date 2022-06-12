const input = require('readline-sync');

// Code your transform function here:
function transform(obj) {
	let newScore = {};
	for (key in obj) {
		for (let i = 0; i < obj[key].length; i++) {
			newScore[obj[key][i].toLowerCase()] = Number(key);
		}
	}
	return newScore;
}

// Code your initialPrompt function here:
function initialPrompt() {
	let initialPrompt = Number(input.question(`Welcome to the Scrabble Scorer!!\n\nWhich scoring algorithm would you like to use?\n\n0 - Scrabble: The traditional scoring algorithm.\n1 - Simple Score: Each letter is worth 1 point.\n2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.\n\nEnter 0, 1, 2: `));
	return initialPrompt;
}

// Code your runProgram function here:
function runProgram(scoringAlgorithms) {
	let prompt = initialPrompt();

	if (prompt !== 0 && prompt !== 1 && prompt !== 2) {
		console.log(`Well, that wasn't a choice, so........`)
		prompt = 0;
		console.log(`\nAlrighty. We'll just use the ${scoringAlgorithms[prompt].name} algorithm: ${scoringAlgorithms[prompt].description}`)
	} else if (prompt == 0) {
		console.log(`\nCool. We'll use the ${scoringAlgorithms[prompt].name} algorithm.`)
	} else if (prompt == 1) {
		console.log(`\nNice. We are gonna use ${scoringAlgorithms[prompt].name} algorithm. ${scoringAlgorithms[prompt].description}`)
	} else if (prompt == 2) {
		console.log(`\nThe highest one. Good choice. ${scoringAlgorithms[prompt].name}: ${scoringAlgorithms[prompt].description}`)
	};

	let userWord = input.question(`\nEnter a word to be scored, or 'STOP' to quit: `);
	while (userWord !== "STOP" && userWord !== "'STOP'") {
		console.log(`Score for '${userWord}' is: ${scoringAlgorithms[prompt].scoreFunction(userWord.split("").sort().join("").trim(), newPointStructure)}`);
		userWord = input.question(`\nEnter a word to be scored, or 'STOP' to quit: `);
	}
	console.log('Thanks for using the calculator!!');
}

// Here is the oldPointStructure object:
const oldPointStructure = {
	1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
	2: ['D', 'G'],
	3: ['B', 'C', 'M', 'P'],
	4: ['F', 'H', 'V', 'W', 'Y'],
	5: ['K'],
	8: ['J', 'X'],
	10: ['Q', 'Z'],
	0: ['']
};

// Use the transform function to create the newPointStructure object here:
let newPointStructure = transform(oldPointStructure);

// Create your scoringAlgorithms array here:
function simpleScore(word) {
	return word.length;
}

function bonusVowels(word) {
	let score = 0;
	let vowelArray = ["a", "e", "i", "o", "u"];
	for (let i = 0; i < word.length; i++) {
		if (vowelArray.includes(word[i].toLowerCase())) {
			score += 3;
		} else {
			score += 1;
		}
	} return score;
}

function scrabbleScore(word, obj) {
	let score = 0;
	for (i = 0; i < word.length; i++) {
		score += obj[word[i].toLowerCase()]
	}
	return score;
}
let scrabbleScoreObject = {
	name: "Scrabble",
	description: "The traditional scoring algorithm.",
	scoreFunction: scrabbleScore
}

let simpleScoreObject = {
	name: "Simple Score",
	description: "Each letter is worth 1 point.",
	scoreFunction: simpleScore
}

let bonusVowelsObject = {
	name: "Bonus Vowels",
	description: "Vowels are 3 pts, consonants are 1 pt.",
	scoreFunction: bonusVowels
}

let scoringAlgorithms = [scrabbleScoreObject, simpleScoreObject, bonusVowelsObject];

// Call the runProgram function here:
runProgram(scoringAlgorithms);
