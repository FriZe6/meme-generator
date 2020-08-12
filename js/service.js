
var gMeme=null;
var gCurrImage;
var gCurrImgSrc;
var gCurrMemeLine=0;

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [];
createImgs()
function createImgs(){
    for(var i=0; i<18 ; i++){
        gImgs.push({id:i, url:'images/'+(i+1)+'.jpg',keywords:['popo']})
    }
}



function createMeme(elTextInput){

        
gMeme = {
    selectedImgId: gCurrImage.id,
    selectedLineIdx: 0,
    lines: [
        {
            txt: elTextInput.value,
            size: 50,
            positionY:50,
            align: 'center',
            color: 'white',
            isSelected:true
        }
    ]
}
 
}


function makeBigger(){
    if(gMeme.lines[gMeme.selectedLineIdx].size<75)gMeme.lines[gMeme.selectedLineIdx].size++   
}

function makeSmaller(){
    if(gMeme.lines[gMeme.selectedLineIdx].size>25)gMeme.lines[gMeme.selectedLineIdx].size--  
}

function moveLineUp(){
    if(gMeme.lines[gMeme.selectedLineIdx].positionY>50)gMeme.lines[gMeme.selectedLineIdx].positionY--

}

function moveLineDown(){
    if(gMeme.lines[gMeme.selectedLineIdx].positionY<480)gMeme.lines[gMeme.selectedLineIdx].positionY++   
}

function addLine(){


    if(gMeme.lines.length===1 && gMeme.lines[0].positionY!==480){
    gMeme.lines.push(
        {
            txt: elTextInput.value,
            size: 50,
            positionY:480,
            align: 'center',
            color: 'white',
            isSelected:false
        }
    ) 
    }else if(gMeme.lines.length===1 && gMeme.lines[0].positionY===480){
        gMeme.lines.push( {
            txt: elTextInput.value,
            size: 50,
            positionY:50,
            align: 'center',
            color: 'white',
            isSelected:true
        }
        )
    }
    else if(gMeme.lines.length>1){
        gMeme.lines.push(
            {
                txt: elTextInput.value,
                size: 50,
                positionY:270,
                align: 'center',
                color: 'white',
                isSelected:false
            }
        ) 
    }
}

function updateMeme(text){
    if(!gMeme.lines[gCurrMemeLine])return
    gMeme.lines[gCurrMemeLine].txt=text.value
}

function switchLines(){
    if(gMeme.selectedLineIdx< gMeme.lines.length-1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx=0
    
    gCurrMemeLine=gMeme.selectedLineIdx

    for(var i=0; i<gMeme.lines.length; i++){
        if(gMeme.lines[i]===gMeme.lines[gCurrMemeLine])gMeme.lines[i].isSelected= true
        else gMeme.lines[i].isSelected= false
    }
}

function deleteLine(){
    gMeme.lines = gMeme.lines.filter((meme) => {
      return !meme.isSelected;
    });      
}

function getCurrImage(imageSrc) {

    for (var i = 0; i < gImgs.length; i++){
        if(imageSrc.includes(gImgs[i].url))gCurrImage=gImgs[i]
    }
}

function getCurrMemeLine(){
    return gMeme.lines[gCurrMemeLine]
}

function downloadImage(elLink) {
    var imgContent = canvas.toDataURL('image/png');
    elLink.href = imgContent
}