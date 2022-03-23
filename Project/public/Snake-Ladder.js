$(document).ready(function(){
  $("#choose-colors").modal("show");
});

let boardBlockHTML = ``;
let snakeList = [
  [17, 6],
  [54, 34],
  [62, 19],
  [64, 60],
  [87, 36],
  [93, 73],
  [95, 75],
  [98, 79]
]
let ladderList = [
  [2, 38],
  [4, 14],
  [9, 31],
  [21, 42],
  [28, 84],
  [51, 67],
  [72, 91],
  [80, 99]
]
let currentColor = "red";
let colorNumbering = {
  "red": 0,
  "blue": 1,
  "yellow": 2,
  "green": 3
};
let playerPosition = [1, 1, 1, 1];
let elDiceOne       = document.getElementById('dice1');
let elComeOut       = document.getElementById('roll');

elComeOut.onclick   = function () {rollDice();};

cnt = 101;
for(let y = 0; y < 5; y++){
    for(let x = 0; x < 10; x++){
      cnt--;
      boardBlockHTML += `
      <div class="block block${cnt}">
        ${cnt}<br>
        <span class = "piece red-piece-color"></span>
        <span class = "piece blue-piece-color"></span>
        <span class = "piece yellow-piece-color"></span>
        <span class = "piece green-piece-color"></span>
      </div>
      `;
    }
    cnt -= 10;
    for(let x = 0; x < 10; x++){
      boardBlockHTML += `
      <div class="block block${cnt}">
        ${cnt}<br>
        <span class = "piece red-piece-color"></span>
        <span class = "piece blue-piece-color"></span>
        <span class = "piece yellow-piece-color"></span>
        <span class = "piece green-piece-color"></span>
      </div>
      `;
      cnt++;
    }
    cnt -= 10;
}

$(".board").html(boardBlockHTML);

// let canvas = document.querySelector("canvas");

// let c = canvas.getContext('2d');
// let w = canvas.width;
// let h = canvas.height;

// let currColor = "yellow";
// for(let y = 0; y < 10; y++){
//   for(let x = 0; x < 10; x++){
//     c.fillStyle = currColor;
//     c.fillRect(x*50, y*50, 50, 50);
//     currColor = (currColor == "yellow") ? "white" : "yellow";
//   }
//   currColor = (currColor == "yellow") ? "white" : "yellow";
// }

function rollDice() {

  let diceOne   = Math.floor((Math.random() * 6) + 1);
 
  console.log(diceOne);

  for (let i = 1; i <= 6; i++) {
    elDiceOne.classList.remove('show-' + i);
    if (diceOne === i) {
      elDiceOne.classList.add('show-' + i);
    }
  }

  pieceMovement(currentColor, diceOne);
}


function changeColor(){
  if(currentColor == "red"){
    $("#turn-indicator").removeClass("red-piece-color");
    $("#turn-indicator").addClass("blue-piece-color");
    $("#turn-indicator").text("Blue Player's Turn");
    currentColor = "blue";
  }
  else if(currentColor == "blue"){
    $("#turn-indicator").removeClass("blue-piece-color");
    $("#turn-indicator").addClass("yellow-piece-color");
    $("#turn-indicator").text("Yellow Player's Turn");
    currentColor = "yellow";
  }
  else if(currentColor == "yellow"){
    $("#turn-indicator").removeClass("yellow-piece-color");
    $("#turn-indicator").addClass("green-piece-color");
    $("#turn-indicator").text("Green Player's Turn");
    currentColor = "green";
  }
  else{
    $("#turn-indicator").removeClass("green-piece-color");
    $("#turn-indicator").addClass("red-piece-color");
    $("#turn-indicator").text("Red Player's Turn");
    currentColor = "red";
  }
}

function pieceMovement(pieceColor, spotsMoved){
  if(playerPosition[colorNumbering[pieceColor]] + spotsMoved <= 100){
    $(`.block${playerPosition[colorNumbering[pieceColor]]} .${pieceColor}-piece-color`).text("");
    playerPosition[colorNumbering[pieceColor]] += spotsMoved;
    $(`.block${playerPosition[colorNumbering[pieceColor]]} .${pieceColor}-piece-color`).text(pieceColor[0].toUpperCase());
    let pos = playerPosition[colorNumbering[pieceColor]];
    for(let i = 0; i < snakeList.length; i++){
      if(pos == snakeList[i][0]){
        $(`.block${playerPosition[colorNumbering[pieceColor]]} .${pieceColor}-piece-color`).text("");
        playerPosition[colorNumbering[pieceColor]] = snakeList[i][1];
        $(`.block${playerPosition[colorNumbering[pieceColor]]} .${pieceColor}-piece-color`).text(pieceColor[0].toUpperCase());
        break;
      }      
    }
    for(let i = 0; i < ladderList.length; i++){
      if(pos == ladderList[i][0]){
        $(`.block${playerPosition[colorNumbering[pieceColor]]} .${pieceColor}-piece-color`).text("");
        playerPosition[colorNumbering[pieceColor]] = ladderList[i][1];
        $(`.block${playerPosition[colorNumbering[pieceColor]]} .${pieceColor}-piece-color`).text(pieceColor[0].toUpperCase());
        break;
      }      
    }
    if(playerPosition[colorNumbering[pieceColor]] == 100){
      $(".winner-text").text(currentColor[0].toUpperCase()+currentColor.slice(1)+" wins!!");
      on();
    }
  }
  changeColor();
  console.log(playerPosition);
}


$(".block1 .red-piece-color").text("R");
$(".block1 .blue-piece-color").text("B");
$(".block1 .yellow-piece-color").text("Y");
$(".block1 .green-piece-color").text("G");

function off() {
  $(".overlay").css("display","none");
  location.reload();
}

function on(){
  $(".overlay").css("display","flex");
}
