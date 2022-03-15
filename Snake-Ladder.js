let boardBlockHTML = ``;

cnt = 1;
for(let y = 0; y < 10; y++){
    for(let x = 0; x < 10; x++){
        boardBlockHTML += `<div class="block block${cnt}"></div>`;
        cnt++;
    }
}

$(".board").html(boardBlockHTML);