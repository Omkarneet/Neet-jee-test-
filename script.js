let questionBank = [

{
subject:"physics",
question:"Your question here",
options:[
"Option A",
"Option B",
"Option C",
"Option D"
],
answer:"A"
}

];

let allQuestions = [];

let questions = [];

let current = 0;

let answers = [];

let status = [];

let timer;

let timeLeft = 0;


// Load question database

fetch("data/questions.json")
.then(res => res.json())
.then(data => {

    allQuestions = data;

    console.log("Question bank loaded");

})
.catch(error=>{

console.log("Question loading failed",error);

});




// START TEST

function startTest(){


let subject =
document.getElementById("subject").value;


let minutes =
Number(
document.getElementById("timeInput").value
);



questions=[];



if(subject==="combined"){


let physics =
allQuestions.filter(q=>q.subject==="physics")
.slice(0,45);



let chemistry =
allQuestions.filter(q=>q.subject==="chemistry")
.slice(0,45);



let biology =
allQuestions.filter(q=>q.subject==="biology")
.slice(0,90);



questions=[
...physics,
...chemistry,
...biology
];


}

else{


let number=90;


if(subject==="physics" ||
subject==="chemistry")

number=45;


questions =
allQuestions
.filter(q=>q.subject===subject)
.slice(0,number);


}




// Mix questions

questions.sort(
()=>Math.random()-0.5
);



answers =
new Array(questions.length)
.fill(null);



status =
new Array(questions.length)
.fill("notVisited");



document.getElementById("total")
.innerHTML=
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



document.getElementById("timer")
.innerHTML=
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





// Load question

function loadQuestion(){


let q=questions[current];


document.getElementById("questionNumber")
.innerHTML=
"Question "+(current+1);



document.getElementById("questionText")
.innerHTML=
q.question;



let box =
document.getElementById("options");


box.innerHTML="";



q.options.forEach((op,i)=>{


let btn=document.createElement("button");


btn.className="option";


let letter=
String.fromCharCode(65+i);



btn.innerHTML=
letter+". "+op;



btn.onclick=()=>{


answers[current]=letter;

status[current]="answered";

loadQuestion();


};



box.appendChild(btn);


});



updatePalette();

updateAnswered();


}





// Palette

function createPalette(){


let box=
document.getElementById("palette");


box.innerHTML="";



questions.forEach((q,i)=>{


let btn=document.createElement("button");


btn.className="paletteBtn";


btn.innerHTML=i+1;


btn.onclick=()=>{

current=i;

loadQuestion();

};



box.appendChild(btn);



});


}




function updatePalette(){


document.querySelectorAll(".paletteBtn")
.forEach((btn,i)=>{


btn.className="paletteBtn";


if(status[i]=="answered")
btn.classList.add("answered");

else
btn.classList.add("notAnswered");



if(i===current)
btn.classList.add("current");


});


}





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

document.getElementById("answered")
.innerHTML =
answers.filter(x=>x).length;

}







// Submit

function submitTest(){


clearInterval(timer);


let score=0;


questions.forEach((q,i)=>{


if(answers[i]==q.answer)

score+=4;


else if(answers[i])

score-=1;


});



document.querySelector(".container")
.style.display="none";



document.getElementById("result")
.classList.remove("hidden");



document.getElementById("score")
.innerHTML=score;


}
