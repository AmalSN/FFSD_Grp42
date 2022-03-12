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
    eventListenerForSymbol();
}

function off() {
    $("#overlay").css("display","none");
    resetBoard();
}

function on(){
    $("#overlay").css("display","flex");
}