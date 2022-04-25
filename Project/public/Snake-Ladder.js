let boardBlockHTML = ``;
let turnOrder = 0;
let snakeList = [
  [17, 6],
  [34, 24],
  [54, 37],
  [62, 19],
  [70, 65],
  [87, 29],
  [94, 90],
  [99, 38]
]
let ladderList = [
  [2, 38],
  [4, 14],
  [27, 50],
  [30, 71],
  [55, 95],
  [64, 84]
]
let currentColor = "red";
let colorNumbering = {
  "red": 0,
  "blue": 1,
  "yellow": 2,
  "green": 3
};
let playerPosition = [1, 1, 1, 1];

const socket = io("http://10.0.43.46:3000");

socket.on("connection");

let url = window.location.href;
let roomNum = url.slice(url.indexOf("=")+1);
socket.emit("createRoomS", roomNum);

socket.on("moveS", (data) => {
  
  for(let i = 0; i < 4; i++){
    if(playerPosition[i]!=data.x[i]){
      $(`.block${playerPosition[i]} .${currentColor}-piece-color`).html("");
      $(`.block${data.x[i]} .${currentColor}-piece-color`).html(`<img src='/images/${currentColor.toLowerCase()}Pawn.png'>`);
      playerPosition[i]=data.x[i];
    }
  }
  if((data.y+1)%4 == turnOrder){
    $("#freezeScreen").removeClass("freezeScreen");
  }
  changeColor();

});

socket.on("turnOrder", (data) => {
  console.log(turnOrder);
  turnOrder = data;
});

socket.on("freezeScreenS", () => {
  $("#freezeScreen").addClass("freezeScreen");
});

socket.on("winS", (data) => {
  $(".winner-text").text(data[0].toUpperCase()+data.slice(1)+" wins!!");
  socket.emit("lossS",$("#loggedUser").text().slice(25,-21));
})

let elDiceOne = document.getElementById('dice1');
let elComeOut = document.getElementById('roll');

elComeOut.onclick   = function () {rollDice();};

cnt = 101;
for(let y = 0; y < 5; y++){
    for(let x = 0; x < 10; x++){
      cnt--;
      boardBlockHTML += `
      <div class="block block${cnt}">
        ${cnt}
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
        ${cnt}
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

let currentHtml = $(".board").html();

$(".board").html(currentHtml + boardBlockHTML);

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
  let pos = colorNumbering[pieceColor];
  if(playerPosition[pos] + spotsMoved <= 100){
    $(`.block${playerPosition[pos]} .${pieceColor}-piece-color`).html("");
    playerPosition[pos] += spotsMoved;
    $(`.block${playerPosition[pos]} .${pieceColor}-piece-color`).html(`<img src='/images/${pieceColor.toLowerCase()}Pawn.png'>`);
    
    for(let i = 0; i < snakeList.length; i++){
      if(playerPosition[pos] == snakeList[i][0]){
        $(`.block${playerPosition[pos]} .${pieceColor}-piece-color`).html("");
        playerPosition[pos] = snakeList[i][1];
        $(`.block${playerPosition[pos]} .${pieceColor}-piece-color`).html(`<img src='/images/${pieceColor.toLowerCase()}Pawn.png'>`);
        break;
      }      
    }
    for(let i = 0; i < ladderList.length; i++){
      if(playerPosition[pos] == ladderList[i][0]){
        $(`.block${playerPosition[pos]} .${pieceColor}-piece-color`).html("");
        playerPosition[pos] = ladderList[i][1];
        $(`.block${playerPosition[pos]} .${pieceColor}-piece-color`).html(`<img src='/images/${pieceColor.toLowerCase()}Pawn.png'>`);
        break;
      }      
    }
    if(playerPosition[pos] == 100){
      $(".winner-text").text(currentColor[0].toUpperCase()+currentColor.slice(1)+" wins!!");
      socket.emit("winS", {x: currentColor, y: $("#loggedUser").text().slice(25,-21)});
      on();
    }
    else{
      console.log(turnOrder);
      socket.emit("moveS", {x: playerPosition, y: turnOrder});
    }
  }
  changeColor();
  console.log(playerPosition);
}


$(".block1 .red-piece-color").html("<img src='/images/redPawn.png'>");
$(".block1 .blue-piece-color").html("<img src='/images/bluePawn.png'>");
$(".block1 .yellow-piece-color").html("<img src='/images/yellowPawn.png'>");
$(".block1 .green-piece-color").html("<img src='/images/greenPawn.png'>");

function off() {
  $(".overlay").css("display","none");
  location.reload();
}

function on(){
  $(".overlay").css("display","flex");
}
