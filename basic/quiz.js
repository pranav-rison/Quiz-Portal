const Questions = [
  {
    question: "What is the correct syntax to output 'Hello World' in JavaScript?",
    options: [
      "print('Hello World')",
      "console.log('Hello World')",
      "echo 'Hello World'",
      "printf('Hello World')"
    ],
    correctIndex: 1
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "string", "float"],
    correctIndex: 0
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!-- -->", "//", "/* */", "#"],
    correctIndex: 1
  },
  {
    question: "Which data type is NOT supported by JavaScript?",
    options: ["Boolean", "Undefined", "Float", "Object"],
    correctIndex: 2
  },
  {
    question: "How do you declare a constant in JavaScript?",
    options: ["var", "let", "const", "constant"],
    correctIndex: 2
  },
  {
    question: "Which method converts a JSON string into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()"
    ],
    correctIndex: 0
  },
  {
    question: "Which operator is used to compare both value and type?",
    options: ["==", "=", "===", "!="],
    correctIndex: 2
  },
  {
    question: "What will typeof null return?",
    options: ["null", "object", "undefined", "number"],
    correctIndex: 1
  },
  {
    question: "Which function is used to execute code after a delay?",
    options: ["setInterval()", "setTimeout()", "delay()", "wait()"],
    correctIndex: 1
  },
  {
    question: "Which loop is guaranteed to run at least once?",
    options: ["for", "while", "do...while", "foreach"],
    correctIndex: 2
  },
  {
    question: "Which array method adds an element at the end?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctIndex: 0
  },
  {
    question: "How do you write an arrow function?",
    options: [
      "function => ()",
      "() => {}",
      "=> function()",
      "() -> {}"
    ],
    correctIndex: 1
  },
  {
    question: "Which keyword stops a loop execution?",
    options: ["stop", "exit", "break", "return"],
    correctIndex: 2
  },
  {
    question: "Which method is used to select an element by ID?",
    options: [
      "getElementById()",
      "querySelectorAll()",
      "getElementsByClass()",
      "selectById()"
    ],
    correctIndex: 0
  },
  {
    question: "Which event occurs when a user clicks an element?",
    options: ["onchange", "onmouseover", "onclick", "onload"],
    correctIndex: 2
  }
];

let currqs = 0;
let selected={};
const selectedans = {};


function loadqs(index){
    const q = Questions[index];
    //update the qs
    document.getElementById("qsbox").innerHTML = `<h3>Question ${index + 1}</h3><p>${q.question}</p>`;

    // update the option
    // document.getElementById("optionsBox").innerHTML=`<div class="option">
    // <input type="radio" id="op1">
    // <label for="">${q.options[0]}</label>
    // </div>`
    
    const o=q.options.map((opt,i)=>
      `<div class="options">
    <input type="radio" name="q${index}" id="op${i}" value="${i}">
    <label for="op$${i}">${opt}</label>
    </div>`
    ).join("");
    document.getElementById("optionsBox").innerHTML=o;

    // ! updating navqs as active 
    document.querySelectorAll(".navqs").forEach((el,i)=>{
      el.classList.remove("active");
        if(i===index){
          el.classList.add("active");
          // ! if selected question
          if(selected[index]!==undefined){
            el.classList.remove("active");
            el.classList.add("answered");
          }
        }
    });
}

// !Button previ and next
document.getElementById("prevbtn").addEventListener("click", () => {
    if(currqs > 0){
        currqs--;
        loadqs(currqs);
    }
});

document.getElementById("nextbtn").addEventListener("click", () => {
    if(currqs < Questions.length - 1){
        currqs++;
        loadqs(currqs);
    }
});

/* INITIAL LOAD */
loadqs(currqs);

//! updating time
// let i=0;
// function updatetime(){
//   document.getElementById("time").innerHTML=i;
//   i++;
// }
// following working for 30 minutes
// let t = 30*60;
// function updatetime() {
//   let min = Math.floor(t / 60);
//   let sec = t % 60;

//   document.getElementById("time").innerHTML =
//     min + ":" + (sec < 10 ? "0" + sec : sec);

//   t--;
// }
// setInterval(updatetime,1000)

let t = 30*60;
function updatetime() {
  const timerelement = document.getElementById("time").querySelector("b");

  let min = Math.floor(t / 60);
  let sec = t % 60;
  timerelement.textContent=`00 : ${String(min).padStart(2,'0')} : ${String(sec).padStart(2,'0')}`
  if(t<=0){
    clearInterval(timer_interval);
    alert("time up!")
  }
  t--;
}
const timer_interval=setInterval(updatetime,1000)

//! updating questions when click on below nav bar
document.querySelectorAll(".navqs").forEach((el,i)=>{
  el.addEventListener("click",()=>{
    currqs=i;
    loadqs(i);
  })
});

// ! updating navqs on click of mark as review button
document.getElementById("markbtn").addEventListener("click",()=>{
  const n = document.querySelectorAll(".navqs")[currqs];
  n.classList.remove("answered");
  n.classList.add("review");
})