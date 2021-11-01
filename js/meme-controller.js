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
    gElLineInput.value = ''
    renderCanvas();
    // var elContainer = document.querySelector('.canvas-size');
    // console.log(elContainer.width);
    // gElCanvas.width = elContainer.width
    // gElCanvas.height = elContainer.offsetHeight
    // setLinesPos(gElCanvas)
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
    // console.log('gElCanvas',gElCanvas.height , gElCanvas.width);
// gLinesPos[0].x = gElCanvas.width / 2;
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
            // console.log(gMeme.lines[i]);
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
    console.log(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    // console.log(line.pos.x, line.pos.y);
    // console.log(gCtx);
}

function onFocusLine() {
    if (!gMeme.lines.length) return;
    if (!gMeme.selectedLineIdx && gMeme.lines.length === 1) {
        renderCanvas();
        setTimeout(() => {
            for (var i = 0; i < gMeme.lines.length; i++) {
                drawLineTxt(gMeme.lines[i]);
            }
        })
        gElLineInput.value = '';
        gMeme.selectedLineIdx = -1;
        return;
    }
    console.log(gMeme.selectedLineIdx);
    gMeme.selectedLineIdx++;
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
    // gMeme.selectedLineIdx++;

}



function onAddText() {
    gMeme.isLineEditOn = false;

    if (!gElLineInput.value) return;
    gElLineInput.value = '';

    gMeme.isFocusedLineOn = false;
    gMeme.selectedLineIdx = -1;


}

function renderFocusedLineRect() {
    // console.log(gMeme.selectedLineIdx);
    var idx = gMeme.selectedLineIdx;
    if (!gMeme.lines.length) {
        console.log('return');
        return
    }
    var line = getSelectedLine();
    var pos = {
        ...line.pos
    };
    // console.log('line', line);
    // gCtx.measureText(line.txt).
    console.log(line.txt);
    var textWidth = gCtx.measureText(line.txt).width;
    console.log(gCtx.measureText(line.txt));
    gCtx.beginPath();
    // gCtx.rect(pos.x - 5, pos.y - gMeme.fontSize, textWidth + 10, gMeme.fontSize + 10);
    gCtx.rect(pos.x - 5, pos.y - gMeme.lines[idx].size, textWidth + 10, gMeme.lines[idx].size + 10);
    console.log('idx : ', idx, pos.x - 5, pos.y - gMeme.lines[idx].size, textWidth + 10, gMeme.lines[idx].size + 10);
    // gCtx.rect(pos.x - 5, pos.y - gMeme.lines[gMeme.selectedLineIdx].size,
    //  textWidth + 10, gMeme.lines[gMeme.selectedLineIdx].size + 10);
    // gMeme.lines[currLineIdx].size
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    console.log(gMeme.selectedLineIdx);
    // gMeme.selectedLineIdx++;
}

function reRenderFocusedLineRect(idx) {

    // console.log('idx', idx);
    var line = gMeme.lines[idx];
    var pos = {
        ...line.pos
    };

    var textWidth = gCtx.measureText(line.txt).width;
    gCtx.beginPath();
    gCtx.rect(pos.x - 5, pos.y - gMeme.lines[idx].size, textWidth + 10, gMeme.lines[idx].size + 10);
    // console.log(pos.x - 5 +1, pos.y - gMeme.lines[idx].size, textWidth + 10, gMeme.lines[idx].size + 10);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();


}

function onDeleteLine() {
    renderCanvas();
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
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
    // if (!gMeme.isFocusedLineOn) return;
    setNewPosLineX(val);
    renderCanvas();

    setTimeout(() => {
        for (let i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
            // renderFocusedLineRect();
        }
    })
    setTimeout(renderFocusedLineRect, 50)

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

function onChangeFontSize(x) {

    var currLineIdx = gMeme.selectedLineIdx;

    gMeme.lines[currLineIdx].size += x;
    renderCanvas();
    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);

        }
    })
    // reRenderFocusedLineRect(currLineIdx)
    setTimeout(renderFocusedLineRect, 50)
    // gElLineInput.value = getSelectedLine().txt;
    // console.log(gElLineInput.value);


}

function downloadMeme(elMeme) {
    console.log('download');
    var image = gElCanvas.toDataURL("image/jpg");
    elMeme.href = image;
}

function setColor(color){
    if(gMeme.selectedLineIdx === -1){
        gMeme.color = color;
        return;
    }
    console.log(color);
    // gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
    renderCanvas();
    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);

        }
    })
    // reRenderFocusedLineRect(currLineIdx)
    setTimeout(renderFocusedLineRect, 50)

}


function selectedText(event) {
    // event.stopPropagation()
    console.log(event);

    var x = getEventPos(event);
    console.log(x);
    findLine(x)
//
    // var textWidth = gCtx.measureText(gMeme.lines.txt).width;
    // x.x +=textWidth;
    console.log(x);
    // gElCanvas.addEventListener('mousedown', selectText);
    // gElCanvas.addEventListener('mousemove', onMove);
    // gElCanvas.addEventListener('mouseup', textDrop);

}

//x: 225,
// y: 50

function getEventPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    return pos;
}

