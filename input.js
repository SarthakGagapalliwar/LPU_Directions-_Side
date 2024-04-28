// let availablekeywords = [
//     "BH1",
//     "BH2",
//     "BH3",
//     "BH4",
//     "BH5",
//     "BH6",
//     "34-9th,floor",
//     "34-8th,floor",
//     "34-7th,floor",
//     "34-6th,floor",
//     "34-5th,floor",
//     "34-4th,floor",
//     "34-3th,floor",
//     "34-2th,floor",
//     "28-9th,floor",
//     "28-8th,floor",
//     "28-7th,floor",
//     "28-6th,floor",
//     "28-5th,floor",
//     "28-4th,floor",
//     "28-3th,floor",
//     "28-2th,floor",
//     "28-1th,floor",
// ];


// const resultBox =document.querySelector(".result-box");
// const inputBox =document.getElementById("input-box");

// inputBox.onkeyup =function(){
//     let result = [];
//    let input = inputBox.value; 
//    if(input.length){
//     result = availablekeywords.filter((keyword)=>{
//         return keyword.toLowerCase().includes(input.toLowerCase());
//     });
//     console.log(result)
//    }
//    display(result);

//    if(!result.length){
//     resultBox.innerHTML='';
//    }
// }

// function display(result){
//     const content =result.map((list)=>{
//         return "<li onclick=selectInput(this)>" +list + "</li>" ;
//     });

//     resultBox.innerHTML = "<ul>" + content.join(' ') + "</ul>";
// }

// function selectInput(list){
//     inputBox.value=list.innerHTML;
//     resultBox.innerHTML='';
// }

let availableKeywords = [
    "BH1", "BH2", "BH3", "BH4", "BH5", "BH6",
    "38-block", "34-block", "33-block", "32-block",
    "25-block", "31-block", "36-block", "26-block",
    "27-block", "28-block",
];

const inputBoxes = document.querySelectorAll(".all-input input");
const resultBoxes = document.querySelectorAll(".result-box");

inputBoxes.forEach((inputBox, index) => {
    inputBox.onkeyup = () => {
        let result = [];
        let input = inputBox.value.trim();
        if (input.length) {
            result = availableKeywords.filter(keyword => keyword.toLowerCase().includes(input.toLowerCase()));
        }
        display(result, index);
        if (!result.length) {
            resultBoxes[index].innerHTML = '';
        }
    };
});

function display(result, index) {
    const content = result.map(list => {
        return "<li onclick='selectInput(this, " + index + ")'>" + list + "</li>";
    });
    resultBoxes[index].innerHTML = "<ul>" + content.join(' ') + "</ul>";
}

function selectInput(list, index) {
    inputBoxes[index].value = list.innerHTML;
    resultBoxes[index].innerHTML = '';
}


let isDivVisible = false; // Variable to track visibility state

const button = document.querySelector(".contactButton");
const show = document.getElementById("bh1-34-7"); // Accessing the div with the ID bh1-34-7
const footer=document.querySelector(".footer");
const body=document.querySelector("body");

button.addEventListener('click', function() {
    const source = document.getElementById('input-box-1').value;
    const destination = document.getElementById('input-box-2').value;
    
    if (source === "BH1" && destination === "38-block") {

        isDivVisible = !isDivVisible;
        show.style.display = isDivVisible ? "flex" : "none"; 
        footer.style.display="none";
    }
});




var i = 0;
var images = ['direction_img/first.jpg', 'direction_img/second.jpg', 'direction_img/third.jpg', 'direction_img/forthpart1.jpg', 'direction_img/forth.jpg','direction_img/fifth.jpg','direction_img/sixth.jpg','direction_img/sevent.jpg'];
var captions = [
    "First you need to come to the starting postion at the main gate of BH1",
    `In this you have to move to the front until you are not able to see next ${"\n"}image or Lovely Bake Studio`,
    `After reaching to the Lovely Bake Studio ,take the left side${"\n"} and move onwards`,
    `Move to the front till you are not able to see small black poles as ${"\n"} Shown in the next image`,
    `From there cross the road and then take to the left side as ${"\n"} shown in the next image`,
    "Just move onwards till you reach to the black gate of 26 block ",
    `Cross the gate the you will be able to see the a gate in the right side which is ${"\n"} 38 block as mention in the next image`,
    "Cross the gate and from there you either go for the stairs or lift"
];



document.getElementById("caption").style.color = "#fff";
document.getElementById("caption").style.fontSize = "50px";
document.getElementById("caption").style.textAlign = "center";

// Function to adjust font size based on screen width
function adjustFontSize() {
    if (window.innerWidth <= 470) {
        caption.style.fontSize = "25px";
    } else {
        caption.style.fontSize = "50px";
    }
}

// Call the function when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", adjustFontSize);

// Call the function on window resize
window.addEventListener('resize', adjustFontSize);



function changeImage() {
    document.getElementById("slide").setAttribute("src", images[i]);
    document.getElementById("caption").innerText = captions[i];
}

function next() {
    if (i < images.length - 1) {
        i += 1;
    } 
    changeImage();
}

function prev() {
    if (i == 0) {
        i = images.length - 1;
    } else {
        i -= 1;
    }
    changeImage();
}

changeImage();







function done() {
    show.style.display="none";
    footer.style.display="flex";
}



const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "HEYYY",
    "Enter your Source",
    "and",
    "Destination",
    "Please",
    ":)",
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();