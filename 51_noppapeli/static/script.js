game = () => {
    let betPass = false;
    let pointValue = 0;
    let throwCount = 0;
    let dice0 = 0;
    let dice1 = 0;
    let ongoing = false;
    let statusText = "Select bet to start."
    let getStatus = () => {
        let str = "";
        if (throwCount > 0) {
            str = "Rolled " + dice0 + " and " + dice1 + ". " + statusText;
        } else {
            str = statusText;//"Throw dice to start.";
        }

        return str;
    }
    let winStr = (won) => {
        if (won) {
            return "Win";
        } else {
            return "Lose";
        }
    }
    let reset = (betType) => {
        betPass = betType;
        throwCount = 0;
        pointValue = 0;
        ongoing = false;
        statusText = "Select bet to start."
    }
    let initGame = (betType) => {
        if(ongoing) return;
        betPass = betType;
        throwCount = 0;
        pointValue = 0;
        ongoing = true;
        if(betType){
            statusText = "Betting Pass. Roll dice to start"
        } else {
            statusText = "Betting Don't Pass. Roll dice to start"
        }
        
    }
    let throwDice = () => {
        if (!ongoing) return { "end": true, "status": "Select bet to start." };
        dice0 = getDiceRoll(6);
        dice1 = getDiceRoll(6);
        let res;
        if (throwCount === 0) {
            res = resolveFirstThrow(dice0 + dice1);
        } else {
            res = resolveThrow(dice0 + dice1);
        }
        ongoing = !res.end;
        statusText = res.status;

        throwCount++;
        return res;
    }
    let resolveFirstThrow = (roll) => {
        if (roll === 7 || roll === 11) {
            return { "end": true, "status": winStr(betPass) };
        } else if (roll === 2 || roll === 3 || roll === 12) {
            if (!betPass && roll === 12) return { "end": true, "status": "Money back" };
            return { "end": true, "status": winStr(!betPass) };
        } else {
            pointValue = roll;
            return { "end": false, "status": "Point value is "+roll+". Continue" };
        }
    }
    let resolveThrow = (roll) => {
        if (roll === 7) {
            return { "end": true, "status": winStr(!betPass) };
        } else if (roll === pointValue) {
            return { "end": true, "status": winStr(betPass) };
        } else {
            return { "end": false, "status": "Continue" };
        }
    }

    return {
        "start": initGame,
        "reset": reset,
        "roll": throwDice,
        "getBet": () => betPass,
        "getStatus": getStatus,
        "getDice": () => [dice0, dice1],
        "isOngoing": () => ongoing,
        "getRollCount": () => throwCount
    }
}
var gameInstance = game();

window.onload = () => {
    let anchor = document.getElementById("anchor");

    let dicediv = document.createElement("div");
    dicediv.setAttribute("id","dicediv");
    dicediv.classList.add("flex-container");
    let dice = [1, 2].map((num) => createDie("die" + num, getDiceRoll(6)));
    dice.forEach((die) => dicediv.appendChild(die));

    let control = document.createElement("div");
    dicediv.setAttribute("id", "control");
    let rollbutton = createButton("roll", rollDice, "Roll Dice");
    let resetbutton = createButton("reset", reset, "Reset");
    let betbutton = createButton("bet", () => setBet(true), "Bet Pass");
    let nobetbutton = createButton("nobet", ()=>setBet(false), "Bet Don't Pass");

    control.appendChild(rollbutton);
    control.appendChild(betbutton);
    control.appendChild(nobetbutton);
    control.appendChild(resetbutton);

    let history = document.createElement("div");
    history.setAttribute("id", "history");
    history.classList.add("scroll");

    anchor.appendChild(dicediv);
    anchor.appendChild(control);
    anchor.appendChild(history);
}

addHistoryLine = () => {
    let history = document.getElementById("history");
    let line = document.createElement("p");
    console.log(gameInstance.getStatus());
    let linetext = document.createTextNode(gameInstance.getStatus());
    line.appendChild(linetext);
    history.appendChild(line);
    history.scrollTop = history.scrollHeight;
}

setBet = (bet) => {
    if(gameInstance.isOngoing()) return;
    gameInstance.start(bet);
    addHistoryLine();
}

reset = () => {
    gameInstance.reset();
    addHistoryLine();
}

rollDice = () => {
    if(gameInstance.isOngoing()){
        let rollResult = gameInstance.roll();
        let dice = gameInstance.getDice();
        for (let i = 1; i <= 2; i++) {
            editDie("die" + i, dice[i - 1])
        } 
        console.log(rollResult);
        addHistoryLine();
    }
    
}

//dNum, i.e. d6, d20, etc. number of sides.
getDiceRoll = (dNum) => {
    return Math.floor(Math.random() * dNum) + 1;
}

createButton = (name, action, text) => {
    let button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("id", name+"button");
    button.setAttribute("value", text);
    button.addEventListener("click", ()=>{
        action();
    })
    return button;
}

editDie = (id, roll) => {
    let die = document.getElementById(id);
    let dieClasses = ["die-1", "die-2", "die-3", "die-4", "die-5", "die-6"]
    dieClasses.forEach((cls)=>die.classList.remove(cls));
    die.classList.add("die-"+roll);
    // reset animation
    die.style.animation = "none";
    die.offsetHeight;
    die.style.animation = null;
}

createDie = (id, roll) => {
    let die = document.createElement("div");
    let span = document.createElement("span");
    die.setAttribute("id", id)
    die.classList.add("flex-child");
    die.classList.add("die");
    die.classList.add("die-"+roll);
    die.appendChild(span);
    for (let i=0; i<5;i++){
        die.appendChild(span.cloneNode());
    }
    return die
}


/** 
 * 
 * html thingys: dice (2), start buttons (pass/don't pass)
 * 
 * Craps game with Javascript

Let's make a craps game using Javascript. In Craps people throw two dice and in the simple version can make to different bets: Pass or Don't Pass.
Rules for Pass Bets are:

If the first roll is 7 or 11, the bet wins.
If the first roll is 2, 3 or 12, the bet loses (known as "crapping out").
If the roll is any other value, it establishes a point. Point value is the number rolled. This is not 
a points system. You do not calculate points. It is just a point with value of the first throw. Subsequently
you try to roll either a 7 or the value of the point. You reroll until a 7 or the point value. Point value
DOES NOT change after the first throw.
If, with a point established, that point is rolled again before a 7, the bet wins.
If, with a point established, a 7 is rolled before the point is rolled again ("seven out"), the bet loses.

The pass line bet pays even money. 

Don't pass bet rules:
If the first roll is 2 or 3, the bet wins.
If the first roll is 7 or 11, the bet loses.
If the come-out roll is 12, you get your money back
If the roll is any other value, it establishes a point.
If, with a point established, a 7 is rolled before the point is rolled again ("seven out"), the bet wins.
If, with a point established, that point is rolled again before a 7, the bet loses.

Bet cannot be changed
before win or lose however long the game takes. You need to save the value of the first throw (if neither win or lose) for the point to be compared with subsequent
throws. 

Make informative texts during betting. Make a reset button to reset game.

USE ONLY ANCHOR IN HTML AND DO REST BY JAVASCRIPT!
 * 
 */