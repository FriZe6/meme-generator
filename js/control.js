let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
var positionX= canvas.width/2;
var positionY= canvas.height/10;
var elGallery=document.querySelector('.gallery');
var elAbout= document.querySelector('.about');
var elEditor= document.querySelector('.canvas-editor')
let elTextInput = document.querySelector('.meme-text');

function onInit(){
    renderPage()
    
}


function renderPage(){
    
    var strHTML=''

    for(var i=0; i<gImgs.length ; i++){
        strHTML+= `<img class="img${gImgs[i].id}" 
        src=${gImgs[i].url} onclick="onChooseImage(this.src)">`
    }
    elGallery.innerHTML=strHTML
}

function onChooseImage(imageSrc){
    elTextInput.value=''
    gCurrImgSrc=imageSrc

    onDrawImage(imageSrc)
    getCurrImage(imageSrc)
    createMeme(elTextInput)

    elGallery.style.display='none';
    elAbout.style.display='none';
    elEditor.classList.add('flex');
}


function onDrawImage(imageSrc) {
    var image = new Image();
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    image.src = imageSrc;
    ctx.drawImage(image, 0, 0)   
}

function onDrawText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    onDrawImage(gCurrImgSrc)
    

    for(var i=0; i<gMeme.lines.length; i++){ 
    ctx.font = gMeme.lines[i].size + "px Impact";
    ctx.fillStyle = gMeme.lines[i].color
    ctx.strokeStyle = "black"
    ctx.textAlign = gMeme.lines[i].align;
    currMemeLine=getCurrMemeLine()
        updateMeme(elTextInput, currMemeLine)
       
        if(gMeme.lines[i].isSelected){
            ctx.strokeStyle="red"
            ctx.strokeText(gMeme.lines[i].txt, positionX, gMeme.lines[i].positionY); 
            ctx.fillText(gMeme.lines[i].txt, positionX, gMeme.lines[i].positionY);
         
        }else{
            ctx.fillText(gMeme.lines[i].txt, positionX, gMeme.lines[i].positionY);
            ctx.strokeText(gMeme.lines[i].txt, positionX, gMeme.lines[i].positionY);
        }
       
    }
}


function onMakeBigger(){
   makeBigger()
    onDrawText()
}

function onMakeSmaller(){
   makeSmaller()
   onDrawText()
}

function onMoveLineUp(){
   moveLineUp()
   onDrawText()
}

function onMoveLineDown(){
    moveLineDown()
    onDrawText()
}

function onAddLine(){
    addLine() 
    onDrawText()
}

function onSwitchLines(){
  
   switchLines()
   currMemeLine=gCurrMemeLine
   elTextInput.value= gMeme.lines[currMemeLine].txt
   onDrawText()
 }

function onDeleteLine(){
    if(gMeme.selectedLineIdx===0)return
    deleteLine()
    onSwitchLines()
    onDrawText()   
}

function onDownloadImage(elLink) {
    downloadImage(elLink, canvas)
}