//-------------------------------------------------------------------------------------------------

let blockNumbering = {
    "block-top-left": 0,
    "block-top-middle": 1,
    "block-top-right": 2,
    "block-centre-left": 3,
    "block-centre-middle": 4,
    "block-centre-right": 5,
    "block-bottom-left": 6,
    "block-bottom-middle": 7,
    "block-bottom-right": 8
};

console.log("Working");
let blockSymbol = ["","","","","","","","",""];
let currentSymbol = "X";

$(".block").click(function(){
    if(!($(this).hasClass("occupied"))){
        $(this).text(currentSymbol);
        blockSymbol[blockNumbering[$(this).attr("id")]] = currentSymbol;
        console.log(blockSymbol);
        $(this).addClass("occupied");
        if(checkWin()){
            $(".winner-text").text("Player " + currentSymbol + " Wins!!");
            on();
            console.log(currentSymbol + " Won");
        }
        else if(boardDraw(blockSymbol)){
            $(".winner-text").text("Draw!!");
            on();
            console.log("Draw");
        }
        if(currentSymbol == "X"){
            currentSymbol = "O";
        }
        else{
            currentSymbol = "X";
        }
    }    
});

//-------------------------------------------------------------------------------------------------

let rowCheck = function(i) {
    let check = blockSymbol[i] != "" && (blockSymbol[i] == blockSymbol[i + 1] && blockSymbol[i] == blockSymbol[i + 2]);
    return check;
}

let columnCheck = function(i) {
    let check = blockSymbol[i] != "" && (blockSymbol[i] == blockSymbol[i + 3] && blockSymbol[i] == blockSymbol[i + 6]);
    return check;
}

let diagCheck = function() {
    let check = blockSymbol[0] != "" && (blockSymbol[0] == blockSymbol[4] && blockSymbol[0] == blockSymbol[8]);
    check = check || (blockSymbol[2] != "" && (blockSymbol[2] == blockSymbol[4] && blockSymbol[2] == blockSymbol[6]));
    return check;
}

function checkWin() {
    return rowCheck(0)  || rowCheck(3) || rowCheck(6) || columnCheck(0) || columnCheck(1) || columnCheck(2) || diagCheck();
}

function boardDraw(playedSymbol){
    for(let i = 0; i < playedSymbol.length; i++){
        if(playedSymbol[i] == ""){
            return false;
        }
    }
    return true;
}

function resetBoard() {
    currentSymbol = "X";
    blockSymbol = ["","","","","","","","",""];
    $(".block").removeClass("occupied");
    $(".block").text("");
}

function off() {
    $(".overlay").css("display","none");
    resetBoard();
}

function on(){
    $(".overlay").css("display","flex");
}