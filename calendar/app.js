function randomColor() {
    let rgb = [];

    for (let i = 0; i < 3; i++) rgb.push(Math.floor(Math.random() * 255));
    return "rgb(" + rgb + ")";
    // colorsArray[Math.floor(Math.random() * colorsArray.length)];
}

let mudaBg = document.querySelector("#mudaBg");
let test = (e) => {
    let bt = e.target;
    document.body.style.background = randomColor();
};
mudaBg.addEventListener("click", test);
// Apos o click
// Agora automático

setInterval(() => {
    document.body.style.background = randomColor();
}, 5000);

// arrowkeys interaction
