// ===============================
// NEET/JEE CBT SCRIPT
// ===============================


// Question database (temporary)
// Later this will come from Java API

let questions = [

{
subject:"Physics",
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
subject:"Chemistry",
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
subject:"Biology",
question:"Powerhouse of cell is?",
options:[
"Nucleus",
"Mitochondria",
"Ribosome",
"Golgi body"
],
answer:"B"
}

];



// Variables

let currentQuestion = 0;

let userAnswers=[];

let status=[];

let timer;

let timeLeft=0;



// ===============================
// START TEST
// ===============================


function startTest(){


let subject =
document.getElementById("subject").value;


let count =
parseInt(
document.getElementById("questionCount").value
);



let minutes =
parseInt(
document.getElementById("timeInput").value
);



document.getElementById("testName").innerHTML=
subject.toUpperCase();



timeLeft=minutes*60;


startTimer();



// filter subject

if(subject!="combined"){


questions =
questions.filter(q=>

q.subject.toLowerCase()
.includes(subject)

);

}



if(count < questions.length){

questions =
questions.slice(0,count);

}



userAnswers=
new Array(questions.length)
.fill(null);


status=
new Array(questions.length)
.fill("notVisited");



document.getElementById("total").innerHTML=
questions.length;



createPalette();


loadQuestion();


}



// ===============================
// TIMER
// ===============================


function startTimer(){


clearInterval(timer);



timer=setInterval(()=>{


let h=Math.floor(timeLeft/3600);

let m=Math.floor(
(timeLeft%3600)/60
);

let s=timeLeft%60;



document.getElementById("timer")
.innerHTML=

`${String(h).padStart(2,'0')}:
${String(m).padStart(2,'0')}:
${String(s).padStart(2,'0')}`;



if(timeLeft<=0){

clearInterval(timer);

submitTest();

}


timeLeft--;



},1000);



}






// ===============================
// LOAD QUESTION
// ===============================


function loadQuestion(){


let q=questions[currentQuestion];


document.getElementById("questionNumber")
.innerHTML=

"Question "+(currentQuestion+1);



document.getElementById("questionText")
.innerHTML=q.question;



let optionBox=
document.getElementById("options");


optionBox.innerHTML="";



q.options.forEach((option,index)=>{


let btn=document.createElement("button");


btn.className="option";


btn.innerHTML=

String.fromCharCode(65+index)
+". "+option;



btn.onclick=function(){

selectAnswer(
String.fromCharCode(65+index)
);

};


if(userAnswers[currentQuestion]
==
String.fromCharCode(65+index)){

btn.classList.add("selected");

}



optionBox.appendChild(btn);



});



status[currentQuestion]="notAnswered";


updatePalette();



}





// ===============================
// SELECT ANSWER
// ===============================


function selectAnswer(ans){


userAnswers[currentQuestion]=ans;


status[currentQuestion]="answered";


loadQuestion();


}





// ===============================
// PALETTE
// ===============================


function createPalette(){


let box=
document.getElementById("palette");


box.innerHTML="";



questions.forEach((q,i)=>{


let btn=document.createElement("button");


btn.innerHTML=i+1;


btn.className=
"paletteBtn notVisited";



btn.onclick=function(){

currentQuestion=i;

loadQuestion();

};



box.appendChild(btn);


});


}





function updatePalette(){


let buttons=
document.querySelectorAll(".paletteBtn");



buttons.forEach((btn,i)=>{


btn.className=
"paletteBtn";



if(status[i]=="answered"){

btn.classList.add("answered");

}

else if(status[i]=="review"){

btn.classList.add("review");

}

else if(status[i]=="reviewAnswered"){

btn.classList.add("reviewAnswered");

}

else if(i!=currentQuestion){

btn.classList.add("notAnswered");

}



if(i==currentQuestion){

btn.classList.add("current");

}



});


}





// ===============================
// NAVIGATION
// ===============================


function nextQuestion(){


if(currentQuestion<
questions.length-1){

currentQuestion++;

loadQuestion();

}


}




function previousQuestion(){


if(currentQuestion>0){

currentQuestion--;

loadQuestion();

}


}





function saveNext(){


status[currentQuestion]="answered";


nextQuestion();


}




function clearAnswer(){


userAnswers[currentQuestion]=null;


status[currentQuestion]="notAnswered";


loadQuestion();


}




function reviewQuestion(){


if(userAnswers[currentQuestion]){

status[currentQuestion]="reviewAnswered";

}

else{

status[currentQuestion]="review";

}


nextQuestion();


}







// ===============================
// SUBMIT TEST
// ===============================


function submitTest(){


clearInterval(timer);



let score=0;


let correct=0;

let wrong=0;



questions.forEach((q,i)=>{


if(userAnswers[i]==q.answer){

score+=4;

correct++;

}

else if(userAnswers[i]!=null){

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
