window.onload = () => {
    let bigbutton = document.getElementById("bigger");
    let smallbutton = document.getElementById("smaller");
    let fontSizer = changeFont();
    bigbutton.onclick = fontSizer.bigger;
    smallbutton.onclick = fontSizer.smaller;
}

changeFont = () => {
    let fontSize = 16;
    document.body.style.fontSize = fontSize + "px"
    function changeFontSize(val) {
        console.log("change font by "+val);
        fontSize += val;
        document.body.style.fontSize = fontSize + "px"
    }
    return {
        "bigger":() => changeFontSize(2),
        "smaller":() => changeFontSize(-2)
    }
}

makeCounter = () => {
    let privateCounter = 0;
    function changeby(val){
        privateCounter += val;
        return privateCounter;
    }
    return {
        increment:()=>changeby(1),
        decrement:()=>changeby(-1),
        value:()=>privateCounter
    }
}
start = () => {
    let counter1 = makeCounter();
    let counter2 = makeCounter();

    counter1.increment();
    counter1.increment();
    console.log("Counter 1: "+counter1.value());
    counter1.decrement();
    console.log("Counter 1: " +counter1.value());
    console.log("Counter 2: " +counter2.value());
}