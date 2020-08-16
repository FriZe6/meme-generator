const KEY = 'Memes'
var gMeme = null;
var gMemes = [];
var gSavedImages;
var gCurrImage;
var gCurrImgSrc;
var gCurrMemeLine = 0;
var gLoadedImg;
var gFilteredImgs=[];

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [];

createImgs()
loadMemes()

function createImgs() {

    gImgs.push(createImg(1, 'images/' + 1 + '.jpg', ['politics', 'trump']))
    gImgs.push(createImg(2, 'images/' + 2 + '.jpg', ['animals', 'dogs']))
    gImgs.push(createImg(3, 'images/' + 3 + '.jpg', ['dogs', 'babies']))
    gImgs.push(createImg(4, 'images/' + 4 + '.jpg', ['animals', 'cats']))
    gImgs.push(createImg(5, 'images/' + 5 + '.jpg', ['babies']))
    gImgs.push(createImg(6, 'images/' + 6 + '.jpg', ['science', 'history']))
    gImgs.push(createImg(7, 'images/' + 7 + '.jpg', ['babies']))
    gImgs.push(createImg(8, 'images/' + 8 + '.jpg', ['shows', 'celebs']))
    gImgs.push(createImg(9, 'images/' + 9 + '.jpg', ['babies', 'nature']))
    gImgs.push(createImg(10, 'images/' + 10 + '.jpg', ['politics', 'smile']))
    gImgs.push(createImg(11, 'images/' + 11 + '.jpg', ['sports']))
    gImgs.push(createImg(12, 'images/' + 12 + '.jpg', ['shows', 'israel']))
    gImgs.push(createImg(13, 'images/' + 13 + '.jpg', ['shows', 'celebs']))
    gImgs.push(createImg(14, 'images/' + 14 + '.jpg', ['shows', 'matrix']))
    gImgs.push(createImg(15, 'images/' + 15 + '.jpg', ['shows', 'lotr']))
    gImgs.push(createImg(16, 'images/' + 16 + '.jpg', ['shows', 'funny']))
    gImgs.push(createImg(17, 'images/' + 17 + '.jpg', ['politics', 'putin']))
    gImgs.push(createImg(18, 'images/' + 18 + '.jpg', ['toys', 'shows']))
}

function createImg(id, url, keywords) {
    var image = {
        id, url, keywords
    }
    return image
}

function loadMemes() {
    var memes = loadFromStorage(KEY)
    gSavedImages = memes
    return gSavedImages
}



function createMeme(elTextInput) {


    gMeme = {
        selectedImgId: gCurrImage.id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: elTextInput.value,
                size: 50,
                positionX: gCanvas.width / 2,
                positionY: 50,
                align: 'center',
                color: '#ffffff',
                font: 'impact',
                isSelected: true
            }
        ]
    }

}


function makeBigger() {
    if (gMeme.lines[gMeme.selectedLineIdx].size < 75) gMeme.lines[gMeme.selectedLineIdx].size++
}

function makeSmaller() {
    if (gMeme.lines[gMeme.selectedLineIdx].size > 25) gMeme.lines[gMeme.selectedLineIdx].size--
}

function moveLineUp() {
    if (gMeme.lines[gMeme.selectedLineIdx].positionY > 50) gMeme.lines[gMeme.selectedLineIdx].positionY--

}

function moveLineDown() {
    if (gMeme.lines[gMeme.selectedLineIdx].positionY < 480) gMeme.lines[gMeme.selectedLineIdx].positionY++
}

function addLine() {


    if (gMeme.lines.length === 1) {
        gMeme.lines.push(
            {
                txt: elTextInput.value,
                size: 50,
                positionX: gCanvas.width / 2,
                positionY: gCanvas.height - 20,
                align: 'center',
                color: '#ffffff',
                font: 'impact',
                isSelected: false
            }
        )
    }
    else if (gMeme.lines.length > 1) {
        gMeme.lines.push(
            {
                txt: elTextInput.value,
                size: 50,
                positionX: gCanvas.width / 2,
                positionY: gCanvas.height / 2,
                align: 'center',
                color: '#ffffff',
                font: 'impact',
                isSelected: false
            }
        )
    }
}

function updateMeme(text) {
    if (!gMeme.lines[gCurrMemeLine]) return
    gMeme.lines[gCurrMemeLine].txt = text.value
}

function switchLines() {

    selectedLineIdx = gCurrMemeLine
    gMeme.selectedLineIdx = gCurrMemeLine
    for (var i = 0; i < gMeme.lines.length; i++) {
        if (gMeme.lines[i] === gMeme.lines[gCurrMemeLine]) gMeme.lines[i].isSelected = true
        else gMeme.lines[i].isSelected = false
    }
}

function manualSwitchLines() {
    gMeme.selectedLineIdx = gCurrMemeLine

    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx = 0

    gCurrMemeLine = gMeme.selectedLineIdx

    for (var i = 0; i < gMeme.lines.length; i++) {
        if (gMeme.lines[i] === gMeme.lines[gCurrMemeLine]) gMeme.lines[i].isSelected = true
        else gMeme.lines[i].isSelected = false
    }
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    console.log(color);
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function deleteLine() {
    gMeme.lines = gMeme.lines.filter((meme) => {
        return !meme.isSelected;
    });
}

function getCurrImage(imageSrc) {

    for (var i = 0; i < gImgs.length; i++) {
        if (imageSrc.includes(gImgs[i].url)) gCurrImage = gImgs[i]
    }
}

function getCurrMemeLine() {
    return gMeme.lines[gCurrMemeLine]
}

function downloadImage(elLink) {
    var imgContent = gCanvas.toDataURL('image/png');
    elLink.href = imgContent
}

function saveMeme() {
    if (!gSavedImages) gSavedImages = []

    var imgContent = gCanvas.toDataURL('image/png');
    var imageSrc = {
        src: imgContent
    }
    gSavedImages.push(imageSrc)

    saveToStorage(KEY, gSavedImages)
    
}

function pushNewImage(source){
    gImgs.unshift(createImg(19, source,['']))
}


