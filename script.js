// ================================
// NEET CBT QUESTION GENERATOR
// ================================


let questions = [];

let current = 0;

let answers = [];

let status = [];

let timer;

let timeLeft = 0;



// Question Bank

const bank = {

physics:[
{
q:"SI unit of Force is?",
o:["Newton","Joule","Watt","Pascal"],
a:"A"
},
{
q:"Velocity is a?",
o:["Scalar","Vector","Unit","Constant"],
a:"B"
},
{
q:"Speed of light is?",
o:["3×10⁸ m/s","3×10⁵ m/s","300 m/s","30 m/s"],
a:"A"
}
],



chemistry:[
{
q:"Atomic number of Oxygen?",
o:["6","7","8","9"],
a:"C"
},
{
q:"Formula of Water?",
o:["CO2","H2O","O2","NaCl"],
a:"B"
},
{
q:"pH of pure water?",
o:["5","6","7","8"],
a:"C"
}
],



biology:[
{
q:"Powerhouse of cell?",
o:["Nucleus","Mitochondria","Ribosome","Golgi"],
a:"B"
},
{
q:"Basic unit of life?",
o:["Organ","Cell","Tissue","Atom"],
a:"B"
},
{
q:"Functional unit of kidney?",
o:["Neuron","Nephron","Alveoli","Heart"],
a:"B"
}
]

};




// START TEST

function startTest(){


let subject =
document.getElementById("subject").value;


let count =
Number(
document.getElementById("questionCount").value
);



let minutes =
Number(
document.getElementById("timeInput").value
);



questions=[];



if(subject==="combined"){


questions=[
...bank.physics,
...bank.chemistry,
...bank.biology
];


}

else{


questions=[
...bank[subject]
];


}



// Randomize

questions.sort(
()=>Math.random()-0.5
);



questions =
questions.slice(0,count);



answers =
new Array(questions.length)
.fill(null);


status =
new Array(questions.length)
.fill("notVisited");



document.getElementById("total").innerHTML =
questions.length;



timeLeft =
minutes*60;


startTimer();


createPalette();


loadQuestion();


}






// TIMER

function startTimer(){


clearInterval(timer);


timer=setInterval(()=>{


let h=Math.floor(timeLeft/3600);

let m=Math.floor((timeLeft%3600)/60);

let s=timeLeft%60;



document.getElementById("timer").innerHTML =
`${h.toString().padStart(2,"0")}:
${m.toString().padStart(2,"0")}:
${s.toString().padStart(2,"0")}`;



if(timeLeft<=0){

clearInterval(timer);

submitTest();

}



timeLeft--;



},1000);


}







// LOAD QUESTION


function loadQuestion(){


let q=questions[current];



document.getElementById("questionNumber")
.innerHTML =
"Question "+(current+1);



document.getElementById("questionText")
.innerHTML =
q.q;



let optionBox =
document.getElementById("options");



optionBox.innerHTML="";



q.o.forEach((x,i)=>{


let btn=document.createElement("button");


btn.className="option";


let letter =
String.fromCharCode(65+i);



btn.innerHTML =
letter+". "+x;



btn.onclick=function(){


answers[current]=letter;

status[current]="answered";


loadQuestion();


};



if(answers[current]==letter){

btn.classList.add("selected");

}



optionBox.appendChild(btn);


});



updatePalette();

updateAnswered();


}







// PALETTE


function createPalette(){


let p =
document.getElementById("palette");


p.innerHTML="";



questions.forEach((x,i)=>{


let btn=document.createElement("button");


btn.className="paletteBtn";


btn.innerHTML=i+1;



btn.onclick=function(){


current=i;

loadQuestion();


};



p.appendChild(btn);



});


}






function updatePalette(){


let buttons =
document.querySelectorAll(".paletteBtn");



buttons.forEach((b,i)=>{


b.className="paletteBtn";



if(status[i]=="answered")
b.classList.add("answered");

else
b.classList.add("notAnswered");



if(i==current)
b.classList.add("current");


});


}







// NAVIGATION


function nextQuestion(){

if(current<questions.length-1){

current++;

loadQuestion();

}

}



function previousQuestion(){

if(current>0){

current--;

loadQuestion();

}

}



function saveNext(){

status[current]="answered";

nextQuestion();

}



function clearAnswer(){

answers[current]=null;

status[current]="notAnswered";

loadQuestion();

}



function reviewQuestion(){

status[current]="review";

nextQuestion();

}





function updateAnswered(){

let c=answers.filter(x=>x).length;

document.getElementById("answered")
.innerHTML=c;

}






// RESULT


function submitTest(){


clearInterval(timer);


let score=0;

let correct=0;

let wrong=0;



questions.forEach((q,i)=>{


if(answers[i]==q.a){

score+=4;

correct++;

}

else if(answers[i]){

score-=1;

wrong++;

}


});



document.querySelector(".container")
.style.display="none";



document.getElementById("result")
.classList.remove("hidden");



document.getElementById("score")
.innerHTML=score;



document.getElementById("analysis")
.innerHTML=
`
Correct : ${correct}<br>
Wrong : ${wrong}<br>
Unattempted : ${questions.length-correct-wrong}
`;


}
