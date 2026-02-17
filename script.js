let a = 0, b = 0;
let flag = true;
let gameOver = false;

const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("resetBtn");

boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleClick(index + 1));
});

resetBtn.addEventListener("click", resetall);

function handleClick(id){

    if(gameOver) return;

    let box = document.getElementById(id);

    if(box.innerText === ""){
        if(flag){
            box.innerHTML = "<span class='x_symbol'>X</span>";
            a++;
            document.getElementById("move_num_1").innerText = a;
        }else{
            box.innerHTML = "<span class='o_symbol'>O</span>";
            b++;
            document.getElementById("move_num_2").innerText = b;
        }
        flag = !flag;
    }

    checkWinner();
}

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

    if(filled && !gameOver){
        gameOver = true;

        setTimeout(()=>{
            alert("It's a Tie 🤝");
            resetall();
        }, 500);
    }
}

function resetall(){
    for(let i=1;i<=9;i++){
        document.getElementById(i).innerHTML = "";
    }
    a = 0;
    b = 0;
    flag = true;
    gameOver = false;

    document.getElementById("move_num_1").innerText = "0";
    document.getElementById("move_num_2").innerText = "0";
}
