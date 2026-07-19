// =====================================
// OWN QUESTION GENERATOR
// NEET/JEE PRACTICE ENGINE
// =====================================


function generateQuestions(subject, number, difficulty){

    let generated=[];


    let physics=[

    {
    q:"A body moving with constant velocity has?",
    o:[
    "Zero acceleration",
    "Constant acceleration",
    "Increasing speed",
    "Decreasing speed"
    ],
    a:"A"
    },


    {
    q:"The SI unit of energy is?",
    o:[
    "Newton",
    "Joule",
    "Watt",
    "Pascal"
    ],
    a:"B"
    }

    ];



    let chemistry=[

    {
    q:"The chemical symbol of Sodium is?",
    o:[
    "So",
    "Na",
    "S",
    "N"
    ],
    a:"B"
    },


    {
    q:"pH value of pure water is?",
    o:[
    "5",
    "6",
    "7",
    "8"
    ],
    a:"C"
    }

    ];




    let biology=[

    {
    q:"The basic unit of life is?",
    o:[
    "Tissue",
    "Cell",
    "Organ",
    "Nucleus"
    ],
    a:"B"
    },


    {
    q:"Which pigment helps in photosynthesis?",
    o:[
    "Haemoglobin",
    "Chlorophyll",
    "Melanin",
    "Insulin"
    ],
    a:"B"
    }

    ];



    let pool=[];



    if(subject==="physics")
        pool=physics;


    else if(subject==="chemistry")
        pool=chemistry;


    else if(subject==="biology")
        pool=biology;


    else if(subject==="combined"){

        pool=[
        ...physics,
        ...chemistry,
        ...biology
        ];

    }



    for(let i=0;i<number;i++){

        let random =
        pool[Math.floor(
        Math.random()*pool.length
        )];



        generated.push({

            subject:subject,

            question:random.q,

            options:random.o,

            answer:random.a,

            difficulty:difficulty

        });


    }



    return generated;

}
