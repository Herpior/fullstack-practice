var secretNumber = Math.floor(Math.random()*101);
var upperLimit = 100;
var lowerlimit = 0;
var guesses = 0;

function reset(){
    secretNumber = Math.floor(Math.random() * 101);
    upperLimit = 100;
    lowerlimit = 0;
    guesses = 0;
    document.getElementById("resultText").innerText = "";
    document.getElementById("guessCount").innerText = "Guesses: " + guesses;
    document.getElementById("prevText").innerText = "";
    document.getElementById("guideText").innerText = "Guess number between " + lowerlimit + " and " + upperLimit;
}

function guess(){
    let textarea = document.getElementById("guessText");
    let numStr = textarea.value
    let validateMessage = validate(numStr)
    if (validateMessage == "OK"){
        let number = parseInt(numStr, 10);
        let res = check(number);
        guesses++
        document.getElementById("resultText").innerText = res;
        document.getElementById("guessCount").innerText = "Guesses: " + guesses;
        document.getElementById("prevText").innerText = "Guessed: " + number;
        document.getElementById("guideText").innerText = "Guess number between "+lowerlimit+" and "+upperLimit;
    } else {
        document.getElementById("resultText").innerText = validateMessage;
    }
}

function validate(numStr){
    if(upperLimit === lowerlimit){
        return "Already guessed correct, press reset to play again";
    }
    let number = parseInt(numStr, 10);
    if (isNaN(number)) {
        return "Guess not a number";

    } 
    if (number > upperLimit) {
        return "Guess above upper limit";

    }
    if(number < lowerlimit) {
        return "Guess below lower limit";
    }
    return "OK";
}

function check(number){
    if(number > secretNumber){
        upperLimit = number;
        return "Too High"
    } else if (number < secretNumber){
        lowerlimit = number;
        return "Too Low"
    } else {
        upperLimit = number;
        lowerlimit = number;
        return "Correct"
    }
}
