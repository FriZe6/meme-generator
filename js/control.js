let gCanvas = document.getElementById("myCanvas");
let ctx = gCanvas.getContext("2d");
let elBody = document.querySelector('body');
var elGallery = document.querySelector('.gallery');
var elSearch = document.querySelector('.search');
var elAbout = document.querySelector('.about');
var elMyMemes = document.querySelector('.my-memes');
var elEditor = document.querySelector('.canvas-editor')
let elTextInput = document.querySelector('.meme-text');
var elSideBar = document.querySelector('.sidebar')
var elHamburger = document.querySelector('.hamburger');
var elColor = document.querySelector('.font-color');
var elFont = document.querySelector('.change-font');
var mouseClicked = false, mouseReleased = true;

function onInit() {
    renderPage()
    gCanvas.addEventListener("mousedown", onMouseClick);
    gCanvas.addEventListener("mouseup", onMouseRelease);
    gCanvas.addEventListener("mousemove", onMouseMove);


}

function onMouseClick(ev) {

    var { offsetX, offsetY } = ev
    mouseClicked = !mouseClicked;
    mouseReleased = !mouseReleased;



    for (var i = 0; i < gMeme.lines.length; i++) {

        if (gMeme.lines[i].positionY - offsetY < 50 && gMeme.lines[i].positionY - offsetY > 0) {
            gCurrMemeLine = gMeme.lines.indexOf(gMeme.lines[i])
            onSwitchLines()
        }
    }


}

function onMouseRelease(ev) {

    var { offsetX, offsetY } = ev
    mouseReleased = !mouseReleased
    mouseClicked = !mouseClicked;

    for (var i = 0; i < gMeme.lines.length; i++) {

        if (gMeme.lines[i].isSelected) {

            gMeme.lines[i].positionY = offsetY + 25
            gMeme.lines[i].positionX = offsetX
        }

    }
    onDrawText()

}

function onMouseMove({ offsetX, offsetY, movementX, movementY }) {



    if (mouseClicked && !mouseReleased) {
        for (var i = 0; i < gMeme.lines.length; i++) {

            if (gMeme.lines[i].isSelected) {
                ctx.clearRect(0, 0, gCanvas.width, gCanvas.height)
                onDrawImage(gCurrImgSrc)
                onDrawText()
                ctx.font = gMeme.lines[i].size + "px " + gMeme.lines[i].font;
                ctx.fillStyle = gMeme.lines[i].color
                ctx.strokeStyle = "black"
                ctx.textAlign = gMeme.lines[i].align;
                currMemeLine = getCurrMemeLine()

                ctx.strokeStyle = "red"
                ctx.strokeText(gMeme.lines[i].txt, offsetX - movementX, offsetY - movementY + 20);
                ctx.fillText(gMeme.lines[i].txt, offsetX - movementX, offsetY - movementY + 20);

            }

        }

    }

}


function renderPage() {

    var strHTML = ''

    for (var i = 0; i < gImgs.length; i++) {
        strHTML += `<img class="img${gImgs[i].id}" 
        src=${gImgs[i].url} onclick="onChooseImage(this.src)">`
    }
    elGallery.innerHTML = strHTML
}

function onChooseImage(imageSrc) {
    elTextInput.value = ''
    gCurrImgSrc = imageSrc
    elGallery.style.display = 'none';
    elAbout.style.display = 'none';
    elEditor.classList.add('flex');
    elSearch.style.display = 'none'
    elColor.value = '#ffffff'
    onDrawImage(imageSrc)
    getCurrImage(imageSrc)
    createMeme(elTextInput)
}


function onDrawImage(imageSrc) {
    var image = new Image();
    ctx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    image.src = imageSrc;
    ctx.drawImage(image, 0, 0)
}

function onDrawText() {
    ctx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    onDrawImage(gCurrImgSrc)


    for (var i = 0; i < gMeme.lines.length; i++) {
        ctx.font = gMeme.lines[i].size + "px " + gMeme.lines[i].font;
        ctx.fillStyle = gMeme.lines[i].color
        ctx.strokeStyle = "black"
        ctx.textAlign = gMeme.lines[i].align;
        currMemeLine = getCurrMemeLine()
        updateMeme(elTextInput, currMemeLine)

        if (gMeme.lines[i].isSelected) {
            ctx.strokeStyle = "red"
            ctx.fillText(gMeme.lines[i].txt, gMeme.lines[i].positionX, gMeme.lines[i].positionY);
            ctx.strokeText(gMeme.lines[i].txt, gMeme.lines[i].positionX, gMeme.lines[i].positionY);
        } else {

            ctx.fillText(gMeme.lines[i].txt, gMeme.lines[i].positionX, gMeme.lines[i].positionY);
            ctx.strokeText(gMeme.lines[i].txt, gMeme.lines[i].positionX, gMeme.lines[i].positionY);
        }
    }
}


function onMakeBigger() {
    makeBigger()
    onDrawText()
}

function onMakeSmaller() {
    makeSmaller()
    onDrawText()
}

function onMoveLineUp() {
    moveLineUp()
    onDrawText()
}

function onMoveLineDown() {
    moveLineDown()
    onDrawText()
}

function onAddLine() {
    addLine()
    onDrawText()
}

function onChangeColor(color) {

    changeColor(color)
    onDrawText()
}

function onChangeFont(font) {
    changeFont(font)
    onDrawText()
}

function onSwitchLines() {

    switchLines()
    currMemeLine = gCurrMemeLine
    elTextInput.value = gMeme.lines[currMemeLine].txt
    elColor.value = gMeme.lines[currMemeLine].color
    elFont.value = gMeme.lines[currMemeLine].font
    onDrawText()
}

function onManualSwitchLines() {
    manualSwitchLines()
    currMemeLine = gCurrMemeLine
    elTextInput.value = gMeme.lines[currMemeLine].txt
    elColor.value = gMeme.lines[currMemeLine].color
    elFont.value = gMeme.lines[currMemeLine].font
    onDrawText()
}

function onDeleteLine() {
    if (gMeme.selectedLineIdx === 0) return
    deleteLine()
    onSwitchLines()
    onDrawText()
}

function onDownloadImage(elLink) {
    downloadImage(elLink, gCanvas)
}

function onOpenGallery() {
    elGallery.style.display = 'grid';
    elAbout.style.display = 'flex';
    elEditor.classList.remove('flex');
    elSearch.style.display = 'block'
    elMyMemes.style.display = 'none'
}

function onOpenMyMemes() {
    elGallery.style.display = 'none';
    elAbout.style.display = 'flex';
    elEditor.classList.remove('flex');
    elSearch.style.display = 'none'
    elMyMemes.style.display = 'grid'

    if (!gSavedImages) {
        elMyMemes.style.display = 'block'
        elMyMemes.innerHTML = `<h2>No Saved Memes!</h2>`
    } else renderMyMemes()
}

function onSaveMeme() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        ctx.font = gMeme.lines[i].size + "px Impact";
        ctx.fillStyle = gMeme.lines[i].color
        ctx.strokeStyle = "black"
        ctx.textAlign = gMeme.lines[i].align;
        currMemeLine = getCurrMemeLine()
        ctx.fillText(gMeme.lines[i].txt, gMeme.lines[i].positionX, gMeme.lines[i].positionY);
        ctx.strokeText(gMeme.lines[i].txt, gMeme.lines[i].positionX, gMeme.lines[i].positionY);

    }
    saveMeme()
}

function renderMyMemes() {
    var strHTML = ''
    console.log(gSavedImages);
    for (var i = 0; i < gSavedImages.length; i++) {
        strHTML += `<img src=${gSavedImages[i].src}>`
    }
    elMyMemes.innerHTML = strHTML
}

function onToggleSideBar() {
    elSideBar.classList.toggle('hidden');
}

function onOpenGallerySide() {
    onOpenGallery()
    elSideBar.classList.toggle('hidden')
}

function onGoToAboutSide() {
    elSideBar.classList.toggle('hidden')
}

function onOpenMyMemesSide() {
    onOpenMyMemes()
    elSideBar.classList.toggle('hidden')
}