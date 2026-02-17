let a = 0, b = 0;
let flag = true;
let gameOver = false;
let gameStarted = false;
let timeLeft = 60;
let timerInterval;

const boxes = document.querySelectorAll(".box");
const timer1 = document.getElementById("timer1");
const timer2 = document.getElementById("timer2");
const startBtn = document.getElementById("startBtn");
const player1 = document.querySelector(".player_1");
const player2 = document.querySelector(".player_2");

startBtn.addEventListener("click", startGame);

/* ================= START GAME ================= */

function startGame(){
    if(gameStarted) return;
    gameStarted = true;
    startTimer();
}

/* ================= TIMER ================= */

function startTimer(){
    clearInterval(timerInterval);
    timeLeft = 60;
    updateTimerUI();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if(timeLeft === 0){
            clearInterval(timerInterval);
            autoMoveRandom();
        }
    }, 1000);
}

function updateTimerUI(){

    let progress = ((60 - timeLeft) / 60) * 100;

    if(flag){
        timer1.innerText = timeLeft;
        timer2.innerText = 60;

        player1.classList.add("active");
        player2.classList.remove("active");

        player1.style.setProperty('--progress', progress + "%");
    } 
    else {
        timer2.innerText = timeLeft;
        timer1.innerText = 60;

        player2.classList.add("active");
        player1.classList.remove("active");

        player2.style.setProperty('--progress', progress + "%");
    }
}

/* ================= CLICK ================= */

function myfunc(id){

    if(!gameStarted) return;
    if(gameOver) return;

    let box = document.getElementById(id);

    if(box.innerText === ""){
        placeMove(box);
        checkWinner();
        startTimer();
    }
}

/* ================= RANDOM MOVE ================= */

function autoMoveRandom(){

    if(gameOver) return;

    let emptyBoxes = [];

    for(let i=1;i<=9;i++){
        let box = document.getElementById(i);
        if(box.innerText === ""){
            emptyBoxes.push(box);
        }
    }

    if(emptyBoxes.length > 0){
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        placeMove(emptyBoxes[randomIndex]);
        checkWinner();
        startTimer();
    }
}

/* ================= PLACE MOVE ================= */

function placeMove(box){

    if(flag){
        box.innerHTML = "<span class='x_symbol'>X</span>";
        a++;
        document.getElementById("move_num_1").innerText = a;
    } 
    else {
        box.innerHTML = "<span class='o_symbol'>O</span>";
        b++;
        document.getElementById("move_num_2").innerText = b;
    }

    flag = !flag;
}

/* ================= CHECK WINNER ================= */

function checkWinner(){

    let values = [];
    for(let i=1;i<=9;i++){
        values[i] = document.getElementById(i).innerText;
    }

    const wins = [
        [1,2,3],[4,5,6],[7,8,9],
        [1,4,7],[2,5,8],[3,6,9],
        [1,5,9],[3,5,7]
    ];

    for(let combo of wins){

        if(values[combo[0]] !== "" &&
           values[combo[0]] === values[combo[1]] &&
           values[combo[1]] === values[combo[2]]){

            gameOver = true;
            clearInterval(timerInterval);

            setTimeout(()=>{
                alert("Player " + values[combo[0]] + " Wins 🎉");
                resetall();
            }, 500);

            return;
        }
    }

    let filled = true;

    for(let i=1;i<=9;i++){
        if(document.getElementById(i).innerText === ""){
            filled = false;
            break;
        }
    }

    if(filled){
        gameOver = true;
        clearInterval(timerInterval);

        setTimeout(()=>{
            alert("It's a Tie 🤝");
            resetall();
        }, 500);
    }
}

/* ================= RESET ================= */

function resetall(){

    boxes.forEach(box => box.innerHTML = "");

    a = 0;
    b = 0;
    flag = true;
    gameOver = false;
    gameStarted = false;

    document.getElementById("move_num_1").innerText = "0";
    document.getElementById("move_num_2").innerText = "0";

    timer1.innerText = "60";
    timer2.innerText = "60";

    player1.classList.remove("active");
    player2.classList.remove("active");

    player1.style.setProperty('--progress', "0%");
    player2.style.setProperty('--progress', "0%");

    clearInterval(timerInterval);
}
