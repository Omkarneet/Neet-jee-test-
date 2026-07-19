let questions=[];


// Add your existing questions here

fetch("data/questions.json")

.then(res=>res.json())

.then(data=>{

questions=data;

});





function addQuestion(){


let q={


subject:
document.getElementById("subject").value,


question:
document.getElementById("question").value,


options:[

document.getElementById("a").value,

document.getElementById("b").value,

document.getElementById("c").value,

document.getElementById("d").value

],


answer:
document.getElementById("answer").value.toUpperCase()



};



questions.push(q);


alert(
"Question Added. Now download JSON."
);


}







function downloadJSON(){


let data =
JSON.stringify(
questions,
null,
2
);



let file =
new Blob(
[data],
{
type:"application/json"
}
);



let link =
document.createElement("a");


link.href=
URL.createObjectURL(file);


link.download=
"questions.json";


link.click();


}
