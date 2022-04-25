let ele = document.querySelector(".r1c2");
let htmlCode = ``;
let cnt = 1;
let turnOrder = 0;

const socket = io("http://192.168.211.245:3000");

socket.on("connection");

let url = window.location.href;
let roomNum = url.slice(url.indexOf("=")+1);
socket.emit("createRoomL", roomNum);

socket.on("turnOrder", (data) => {
    turnOrder = data;
  });

  socket.on("moveL", (data) => {
    document.querySelector(".Page").innerHTML = data.x;
      if((data.y+1)%4 == turnOrder){
        document.querySelector("#freezeScreen").classList.remove("freezeScreen");
      }
    elDiceOne = document.getElementById('dice1');
    elDiceTwo = document.getElementById('dice2');
    allGreen=document.getElementsByClassName("pg");
    allYellow=document.getElementsByClassName("py");
    allRed=document.getElementsByClassName("pr");
    allBlue=document.getElementsByClassName("pb");
    chanceText=document.getElementById("chance");
    rankDiv=document.getElementById("ranking");
    rollbtn=document.getElementById("dice-btn");
    document.querySelector("#dice-btn").addEventListener("click", rollDice);
    incrementChance();
  });

  socket.on("freezeScreenL", () => {
      document.querySelector("#freezeScreen").classList.add("freezeScreen");
  });

for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
        if (cnt == 14 || cnt == 17 || cnt == 11 || cnt == 8 || cnt == 5 || cnt == 6 || cnt == 7) {
            htmlCode += `<div class="ludo-block yellow" id="r1c2${cnt}"></div>`
        } else
            htmlCode += `<div class="ludo-block" id="r1c2${cnt}"></div>`;
        cnt++;
    }
}
ele.innerHTML = htmlCode;

let ele1 = document.querySelector(".r3c2");
let htmlCode1 = ``;
let cnt1 = 1;
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
        if (cnt1 == 14 || cnt1 == 13 || cnt1 == 11 || cnt1 == 8 || cnt1 == 5 || cnt1 == 2 || cnt1 == 12) {
            htmlCode1 += `<div class="ludo-block red" id="r3c2${cnt1}"></div>`
        } else htmlCode1 += `<div class="ludo-block" id="r3c2${cnt1}"></div>`;
        cnt1++;
    }
}
ele1.innerHTML = htmlCode1;


let ele2 = document.querySelector(".r2c1");
let htmlCode2 = ``;
let cnt2 = 1;
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
        if ((cnt2 >= 8 && cnt2 <= 12) || cnt2 == 2 || cnt2 == 15) {
            htmlCode2 += `<div class="ludo-block green" id="r2c1${cnt2}"></div>`
        } else htmlCode2 += `<div class="ludo-block" id="r2c1${cnt2}"></div>`;
        cnt2++;
    }
}
ele2.innerHTML = htmlCode2;


let ele3 = document.querySelector(".r2c3");
let htmlCode3 = ``;
let cnt3 = 1;
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
        if ((cnt3 >= 7 && cnt3 <= 11) || cnt3 == 17 || cnt3 == 4) {
            htmlCode3 += `<div class="ludo-block blue" id="r2c3${cnt3}"></div>`
        } else
            htmlCode3 += `<div class="ludo-block" id="r2c3${cnt3}"></div>`;
        cnt3++;
    }
}
ele3.innerHTML = htmlCode3;

let elDiceOne = document.getElementById('dice1');
let elDiceTwo = document.getElementById('dice2');
let elComeOut = document.getElementById('roll');

let chance=0;
let chanceArray={0:'g',1:'y',2:'b',3:'r'};
document.querySelector("#dice-btn").addEventListener("click", rollDice);
// elComeOut.onclick = function () { rollDice(); };

let diceOne;
let playerSize=4;
let rank=1;
let gcount=0;
let ycount=0;
let rcount=0;
let bcount=0;

let gwon=false;
let ywon=false;
let bwon=false;
let rwon=false;


let allGreen=document.getElementsByClassName("pg");
let allYellow=document.getElementsByClassName("py");
let allRed=document.getElementsByClassName("pr");
let allBlue=document.getElementsByClassName("pb");
let chanceText=document.getElementById("chance");

let rankDiv=document.getElementById("ranking");

let allColour;
let colour;
let rollbtn=document.getElementById("dice-btn");

function incrementChance(){
    chance=(chance+1)%playerSize;
}

function rollDice() {
    console.log("rolled");  
   rollbtn.style.display="none";
    if(chance==0){
       
        allColour=allGreen;
        colour='g';
       
       
    }
     if(chance==1){
        
        allColour=allYellow;
        colour='y';
        
       
    }
     if(chance==2){
      
        allColour=allBlue;
        colour='b';
        
        
    }
    if(chance==3){
       
        allColour=allRed;
        colour='r';
      
       
    }
    
    console.log(colour);
    incrementChance();
     diceOne = Math.floor((Math.random() * 6) + 1);
     

    for (let i = 1; i <= 6; i++) {
        elDiceOne.classList.remove('show-' + i);
        if (diceOne === i) {
            elDiceOne.classList.add('show-' + i);
        }
    }
    let noMove=true;
    Array.from(allColour).forEach((e)=>{
        let currPos=String(e.classList[1]).slice(3);
        if((Number(currPos)+diceOne)<=57){
            
            e.classList.add("active");
            console.log(e.classList);
            e.addEventListener('click',move,true);
            noMove=false;
        }
    });
    
    if(noMove){
        if(chance==0){
            chanceText.textContent="Chance of Green";
           }
           else if(chance==1){
            chanceText.textContent="Chance of Yellow";
           }
           else if(chance==2){
            chanceText.textContent="Chance of Blue";
           }
           else{
            chanceText.textContent="Chance of Red";
           }
           rollbtn.style.display="inline-block";
    }
    
}


function move(e){

    let flag = 0;

    console.log(e.target);
    let player=e.target;
    let home=document.querySelector(`.${colour}57`);
    let currClass=player.classList[1];
    let currPos=String(currClass).slice(3);
    console.log(currPos);
   
    if(Number(currPos)==57){
        return;
    }
    
    else if((Number(currPos)+diceOne)==57){
    
        player.classList.remove(currClass);
        player.classList.add(`sp${colour}57`);
       
        player.parentElement.removeChild(player);
        
        home.appendChild(player);

//         <div class="modal" tabindex="-1" role="dialog">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title">Modal title</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         <p>Modal body text goes here.</p>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-primary">Save changes</button>
//         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//       </div>
//     </div>
//   </div>
// </div>
        // checking whose chance it was
        if((chance-1+playerSize)%playerSize==0){
            gcount++;
            if(gcount==4){
                gwon=true;
                no_of_players_won++;
                if(no_of_players_won==playerSize){
                    let restart=confirm("Red Won, Do You Want to restart the game?");
                    if(restart){
                        location.reload();
                    }
                }
            }
        }
        else if((chance-1+playerSize)%playerSize==1){
            ycount++;
            if(ycount==4){
                ywon=true;
                    let restart=confirm("Yellow Won, Do You Want to restart the game?");
                    if(restart){
                        location.reload();
                    }
                }
            
        }
        else if((chance-1+playerSize)%playerSize==2){
            bcount++;
            if(bcount==4){
                bwon=true;
               
                
                    let restart=confirm("Game Over, Do You Want to restart the game?");
                    if(restart){
                        location.reload();
                    }
                
            }
        }
        else {
            rcount++;
            if(rcount==4){
                rwon=true;
               
                
                    let restart=confirm("Game Over, Do You Want to restart the game?");
                    if(restart){
                        location.reload();
                    }
                
            }
        }


    }
    
   else if((Number(currPos)+diceOne)<57){
       flag=1;
    player.classList.remove(currClass);
    let newPos=Number(currPos)+diceOne;
    console.log(newPos);
    let newClass=`sp${colour}${newPos}`;
    let newParentClass=`${colour}${newPos}`;
    player.className=`${player.classList[0]} ${newClass} ${player.classList[1]}`
    console.log(player.classList);
    let newParent=document.querySelector(`.${newParentClass}`);
   
    
    player.parentElement.removeChild(player);
    newParent.appendChild(player);
   }
   Array.from(allColour).forEach((e)=>{
    e.removeEventListener('click',move);
    e.classList.remove("active");
   })
   if(chance==0){
    chanceText.textContent="Chance of Green";
   }
   else if(chance==1){
    chanceText.textContent="Chance of Yellow";
   }
   else if(chance==2){
    chanceText.textContent="Chance of Blue";
   }
   else{
    chanceText.textContent="Chance of Red";
   }
   rollbtn.style.display="inline-block";
   if(flag==1){
    socket.emit("moveL",{x: document.querySelector(".Page").innerHTML, y: turnOrder});
   }
}

document.querySelector("#r3c213").classList.add("ab1", "r1", "b14", "y27", "g40")
document.querySelector("#r3c210").classList.add("ab2", "r2", "b15", "y28", "g41")
document.querySelector("#r3c27").classList.add("ab3", "r3", "b16", "y29", "g42")
document.querySelector("#r3c24").classList.add("ab4", "r4", "b17", "y30", "g43")
document.querySelector("#r3c21").classList.add("ab5", "r5", "b18", "y31", "g44")
document.querySelector("#r2c118").classList.add("ab6", "r6", "b19", "y32", "g45")
document.querySelector("#r2c117").classList.add("ab7", "r7", "b20", "y33", "g46")
document.querySelector("#r2c116").classList.add("ab8", "r8", "b21", "y34", "g47")
document.querySelector("#r2c115").classList.add("ab9", "r9", "b22", "y35", "g48")
document.querySelector("#r2c114").classList.add("ab10", "r10", "b23", "y36", "g49")
document.querySelector("#r2c113").classList.add("ab11", "r11", "b24", "y37", "g50")
document.querySelector("#r2c17").classList.add("ab12", "r12", "b25", "y38", "g51")
document.querySelector("#r2c11").classList.add("ab13", "r13", "b26", "y39")
document.querySelector("#r2c12").classList.add("ab14", "r14", "b27", "y40", "g1")
document.querySelector("#r2c13").classList.add("ab15", "r15", "b28", "y41", "g2")
document.querySelector("#r2c14").classList.add("ab16", "r16", "b29", "y42", "g3")
document.querySelector("#r2c15").classList.add("ab17", "r17", "b30", "y43", "g4")
document.querySelector("#r2c16").classList.add("ab18", "r18", "b31", "y44", "g5")
document.querySelector("#r1c216").classList.add("ab19", "r19", "b32", "y45", "g6")
document.querySelector("#r1c213").classList.add("ab20", "r20", "b33", "y46", "g7")
document.querySelector("#r1c210").classList.add("ab21", "r21", "b34", "y47", "g8")
document.querySelector("#r1c27").classList.add("ab22", "r22", "b35", "y48", "g9")
document.querySelector("#r1c24").classList.add("ab23", "r23", "b36", "y49", "g10")
document.querySelector("#r1c21").classList.add("ab24", "r24", "b37", "y50", "g11")
document.querySelector("#r1c22").classList.add("ab25", "r25", "b38", "y51", "g12")
document.querySelector("#r1c23").classList.add("ab26", "r26", "b39", "g13")
document.querySelector("#r1c26").classList.add("ab27", "r27", "b40", "y1", "g14")
document.querySelector("#r1c29").classList.add("ab28", "r28", "b41", "y2", "g15")
document.querySelector("#r1c212").classList.add("ab29", "r29", "b42", "y3", "g16")
document.querySelector("#r1c215").classList.add("ab30", "r30", "b43", "y4", "g17")
document.querySelector("#r1c218").classList.add("ab31", "r31", "b44", "y5", "g18")
document.querySelector("#r2c31").classList.add("ab32", "r32", "b45", "y6", "g19")
document.querySelector("#r2c32").classList.add("ab33", "r33", "b46", "y7", "g20")
document.querySelector("#r2c33").classList.add("ab34", "r34", "b47", "y8", "g21")
document.querySelector("#r2c34").classList.add("ab35", "r35", "b48", "y9", "g22")
document.querySelector("#r2c35").classList.add("ab36", "r36", "b49", "y10", "g23")
document.querySelector("#r2c36").classList.add("ab37", "r37", "b50", "y11", "g24")
document.querySelector("#r2c312").classList.add("ab38", "r38", "b51", "y12", "g25")
document.querySelector("#r2c318").classList.add("ab39", "r39", "y13", "g26")
document.querySelector("#r2c317").classList.add("ab40", "r40", "b1", "y14", "g27")
document.querySelector("#r2c316").classList.add("ab41", "r41", "b2", "y15", "g28")
document.querySelector("#r2c315").classList.add("ab42", "r42", "b3", "y16", "g29")
document.querySelector("#r2c314").classList.add("ab43", "r43", "b4", "y17", "g30")
document.querySelector("#r2c313").classList.add("ab44", "r44", "b5", "y18", "g31")
document.querySelector("#r3c23").classList.add("ab45", "r45", "b6", "y19", "g32")
document.querySelector("#r3c26").classList.add("ab46", "r46", "b7", "y20", "g33")
document.querySelector("#r3c29").classList.add("ab47", "r47", "b8", "y21", "g34")
document.querySelector("#r3c212").classList.add("ab48", "r48", "b9", "y22", "g35")
document.querySelector("#r3c215").classList.add("ab49", "r49", "b10", "y23", "g36")
document.querySelector("#r3c218").classList.add("ab50", "r50", "b11", "y24", "g37")
document.querySelector("#r3c217").classList.add("ab51", "r51", "b12", "y25", "g38")
document.querySelector("#r3c216").classList.add("ab52", "b13", "y26", "g39")


document.querySelector("#r3c214").classList.add("r52")
document.querySelector("#r3c211").classList.add("r53")
document.querySelector("#r3c28").classList.add("r54")
document.querySelector("#r3c25").classList.add("r55")
document.querySelector("#r3c22").classList.add("r56")

document.querySelector("#r2c311").classList.add("b52")
document.querySelector("#r2c310").classList.add("b53")
document.querySelector("#r2c39").classList.add("b54")
document.querySelector("#r2c38").classList.add("b55")
document.querySelector("#r2c37").classList.add("b56")

document.querySelector("#r1c25").classList.add("y52")
document.querySelector("#r1c28").classList.add("y53")
document.querySelector("#r1c211").classList.add("y54")
document.querySelector("#r1c214").classList.add("y55")
document.querySelector("#r1c217").classList.add("y56")

document.querySelector("#r2c18").classList.add("g52")
document.querySelector("#r2c19").classList.add("g53")
document.querySelector("#r2c110").classList.add("g54")
document.querySelector("#r2c111").classList.add("g55")
document.querySelector("#r2c112").classList.add("g56")

