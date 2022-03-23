function playGame(){
    let game = $(".active h5").text();
    if(game == "Tic-Tac-Toe") game = "tic-tac-toe";
    else if(game == "Snake and Ladder") game = "snake-ladder";
    else game = "ludo"; 
    location.href = "/games/" + game;
}