function changeColor() {
    let header = document.getElementById("hello");
    let color = "#";
    const hexa = "0123456789abcdef";
    for( let i = 0; i<6; i++){
        let tmp = Math.floor(Math.random()*hexa.length);
        color = color + hexa[tmp];
    }
    header.style.color = color;
    console.log(color);
}
function toggleBox(){
    let domubutton = document.getElementById("dombutton");
    let anchor = document.getElementById("anchor");
    anchor.style.height = 200;
    const show = "Show"
    if(domubutton.value === show){
        domubutton.value = "Hide"
        let box = document.createElement("div");
        box.id = "box"
        anchor.appendChild(box);
    } else {
        domubutton.value = show
        let box = document.getElementById("box");
        if (box) {
            anchor.removeChild(box);
        }
    }
}