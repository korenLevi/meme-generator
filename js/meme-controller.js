'use strict'

var gElCanvas;
var gCtx;



const gElLineInput = document.querySelector('input[name=textLine]');

function init() {
    // gElCanvas = document.querySelector('#meme-canvas');
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d');
}



function onImgClicked(imgId) {

    // (gMeme.isMeming) ? renderCanvas: gMeme.isMeming = true;
    selectImg(imgId);
    var elMemeEdit = document.querySelector('.meme-edit');
    elMemeEdit.style.display = 'flex';
    renderCanvas();
}

function renderCanvas() {
    var meme = gMeme;
    var selectedImgId = meme.selectedImgId;
    var memeImg = new Image();

    memeImg.src = gImgs[selectedImgId - 1].url;

    memeImg.onload = function () {
        gElCanvas.width = this.naturalWidth
        gElCanvas.height = this.naturalHeight
        gCtx.drawImage(this, 0, 0);
    }
}


function renderLineLiveText(elText) {


    if (elText.value.length === 1 && !gMeme.isLineEditOn) {
        createLine(elText.value);
        isLineEditOn(true);
        drawLineTxt(gMeme.lines[gMeme.lines.length - 1]);
    }

    if (elText.value.length < gMeme.lines[gMeme.lines.length - 1].txt.length) {
        // Deleting char
        renderCanvas();
    }

    gMeme.lines[gMeme.lines.length - 1].txt = elText.value;
    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            console.log(gMeme.lines[i]);
            drawLineTxt(gMeme.lines[i]);
        }
    }, 50)
}


function drawLineTxt(line) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = `${line.strokeColor}`
    gCtx.fillStyle = `${line.fillColor}`
    gCtx.font = `${line.size}px Impact`
    gCtx.textAlign = line.textAlign;
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
}

function onFocusLine() {
    setLineIdx();
    gMeme.isFocusedLineOn = true;
    gMeme.isFocusedLineOn = true;
    renderCanvas();
    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
        }
    })

    setTimeout(renderFocusedLineRect, 50)
    gElLineInput.value = getSelectedLine().txt;
    console.log(gElLineInput.value);


}



function onAddText() {
    gMeme.isLineEditOn = false;

    if (!gElLineInput.value) return;
    gElLineInput.value = '';

    gMeme.isFocusedLineOn = false;
    gMeme.selectedLineIdx = 0;


}

function renderFocusedLineRect() {
    console.log(gMeme.selectedLineIdx);
    if (!gMeme.lines.length) {
        console.log('return');
        return
    }
    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);
    var line = getSelectedLine();
    console.log(line);
    var pos = {
        ...line.pos
    };
    console.log(pos);
    var textWidth = gCtx.measureText(line.txt).width;
    console.log(gCtx.measureText(line.txt));
    gCtx.beginPath();
    gCtx.rect(pos.x - 5, pos.y - gMeme.fontSize, textWidth + 10, gMeme.fontSize + 10);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    console.log(gMeme.selectedLineIdx);
    gMeme.selectedLineIdx++;
}

function reRenderFocusedLineRect(idx) {

    console.log('idx', idx);
    var line = gMeme.lines[idx];
    var pos = {
        ...line.pos
    };


    gCtx.beginPath();
    gCtx.rect(pos.x - 5, pos.y - gMeme.fontSize, textWidth + 10, gMeme.fontSize + 10);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();


}

function onDeleteLine() {
    renderCanvas();
    gMeme.lines.splice(gMeme.selectedLineIdx - 1, 1);
    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
        }
    })
    gElLineInput.value = '';
}


function moveLineTxt() {
    console.log(this);
    var x = document.getElementById('line-right')
    console.log(x.className);

}

function moveTextRightLeft(val) {
    setNewPosLineX(val);
    renderCanvas();

    setTimeout(() => {
        for (let i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
            renderFocusedLineRect();
        }
    })


}


function moveTextUpDown(val) {
    setNewPosLineY(val);
    renderCanvas();

    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
            renderFocusedLineRect();
        }
    })
}