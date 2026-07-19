// ===============================
// NEET/JEE CBT ENGINE
// ===============================


// Question Bank
// Later this will come from Java Database

questions =
generateQuestions(
subject,
count,
"medium"
);

subject:"physics",
question:"SI unit of Force is?",
options:[
"Newton",
"Joule",
"Watt",
"Pascal"
],
answer:"A"
},

{
subject:"physics",
question:"Velocity is a?",
options:[
"Scalar quantity",
"Vector quantity",
"Unit",
"Constant"
],
answer:"B"
},

{
subject:"chemistry",
question:"Atomic number of Oxygen is?",
options:[
"6",
"7",
"8",
"9"
],
answer:"C"
},

{
subject:"chemistry",
question:"Chemical formula of water?",
options:[
"CO2",
"H2O",
"O2",
"NaCl"
],
answer:"B"
},

{
subject:"biology",
question:"Powerhouse of cell is?",
options:[
"Nucleus",
"Mitochondria",
"Ribosome",
"Golgi body"
],
answer:"B"
},

{
subject:"biology",
question:"Human blood group system is called?",
options:[
"DNA",
"ABO",
"RNA",
"ATP"
],
answer:"B"
}

];




// Variables

let questions=[];

let current=0;

let answers=[];

let status=[];

let time=0;

let timer;



// ===============================
// START TEST
// ===============================


function startTest(){


let subject=
document.getElementById("subject").value;


let total=
Number(
document.getElementById("questionCount").value
);


let minutes=
Number(
document.getElementById("timeInput").value
);



questions=[];



// Select questions

questionBank.forEach(q=>{


if(subject==="combined"
||
q.subject===subject){

questions.push(q);

}

});



// Random order

questions.sort(
()=>Math.random()-0.5
);



// Limit questions

questions=
questions.slice(0,total);



answers=
new Array(questions.length)
.fill(null);



status=
new Array(questions.length)
.fill("notVisited");



document.getElementById("total")
.innerHTML=questions.length;



document.getElementById("testName")
.innerHTML=
subject.toUpperCase();




time=minutes*60;


startTimer();



createPalette();


loadQuestion();



}







// ===============================
// TIMER
// ===============================


function startTimer(){


clearInterval(timer);


timer=setInterval(()=>{


let h=Math.floor(time/3600);

let m=Math.floor(
(time%3600)/60
);

let s=time%60;



document.getElementById("timer")
.innerHTML=

`${h.toString().padStart(2,'0')}:
${m.toString().padStart(2,'0')}:
${s.toString().padStart(2,'0')}`;



if(time<=0){

clearInterval(timer);

submitTest();

}


time--;



},1000);



}






// ===============================
// LOAD QUESTION
// ===============================


function loadQuestion(){


let q=questions[current];


document.getElementById("questionNumber")
.innerHTML=
"Question "+(current+1);



document.getElementById("questionText")
.innerHTML=q.question;



let box=
document.getElementById("options");


box.innerHTML="";



q.options.forEach((op,i)=>{


let btn=
document.createElement("button");


btn.className="option";


let letter=
String.fromCharCode(65+i);



btn.innerHTML=
letter+". "+op;



btn.onclick=function(){

selectAnswer(letter,btn);

};



if(answers[current]===letter){

btn.classList.add("selected");

}



box.appendChild(btn);



});



status[current]="notAnswered";


updatePalette();


updateAnswered();


}







// ===============================
// SELECT ANSWER
// ===============================


function selectAnswer(letter,button){


answers[current]=letter;


status[current]="answered";


document.querySelectorAll(".option")
.forEach(b=>
b.classList.remove("selected")
);



button.classList.add("selected");



updatePalette();

updateAnswered();



}







// ===============================
// PALETTE
// ===============================


function createPalette(){


let p=
document.getElementById("palette");


p.innerHTML="";



questions.forEach((q,i)=>{


let btn=
document.createElement("button");


btn.innerHTML=i+1;


btn.className=
"paletteBtn";



btn.onclick=function(){

current=i;

loadQuestion();

};



p.appendChild(btn);


});


}






function updatePalette(){


let buttons=
document.querySelectorAll(".paletteBtn");



buttons.forEach((b,i)=>{


b.className="paletteBtn";



if(status[i]=="answered")
b.classList.add("answered");


else if(status[i]=="review")
b.classList.add("review");


else
b.classList.add("notAnswered");



if(i===current)
b.classList.add("current");



});


}







// ===============================
// BUTTON FUNCTIONS
// ===============================


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


if(answers[current])
status[current]="reviewAnswered";

else
status[current]="review";


nextQuestion();


}







function updateAnswered(){


let count=0;


answers.forEach(a=>{

if(a!=null)
count++;

});


document.getElementById("answered")
.innerHTML=count;


}






// ===============================
// SUBMIT
// ===============================


function submitTest(){


clearInterval(timer);


let score=0;

let correct=0;

let wrong=0;



questions.forEach((q,i)=>{


if(answers[i]==q.answer){

score+=4;

correct++;

}

else if(answers[i]!=null){

score-=1;

wrong++;

}


});



document.querySelector(".container")
.style.display="none";


document.querySelector(".setup")
.style.display="none";



document.getElementById("result")
.classList.remove("hidden");



document.getElementById("score")
.innerHTML=score;



document.getElementById("analysis")
.innerHTML=

`
<p>Total Questions: ${questions.length}</p>
<p>Correct: ${correct}</p>
<p>Wrong: ${wrong}</p>
<p>Unattempted: ${questions.length-correct-wrong}</p>
`;

}
