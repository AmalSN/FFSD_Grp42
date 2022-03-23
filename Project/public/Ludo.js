let boardBlockHTML = ``;

for(let y = 1; y <= 18; y++){
    boardBlockHTML += `<div class="small-block block${y}"></div>`;
}

$(".movement-block").html(boardBlockHTML);