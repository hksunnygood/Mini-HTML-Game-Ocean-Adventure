"use strict";
let ctx;
let playerX=50;
let playerY=50;
let goalX=200;
let goalY=200;
let enemyX=400;
let enemyY=400;
let score=0;
let gameContinu = 0;
let bigStoneSmallStone = -1;
let stoneX1 =0;
let stoneY1 =0;
let stoneX2 =0;
let stoneY2 =0;
let numOfStone=0;
let smallStoneFormX = [];
let smallStoneFormY = [];
let mineX=-100;
let mineY=-100;
let moveProgress = "";
let action = [];
let indexForProgram = -1;
let indexForTimer=0;
let timerID;
let indexOfRead = 0;
let enemyMoveButton =0;
let superpower=0;
let superpowerGot=0;
let getPowerLocationX=-100;
let getPowerLocationY=-100;

function setup(){
    ctx=document.getElementById("canvasOutput").getContext("2d");
    gridline();
    drawUselessEnvironment(710,46);
    drawUselessEnvironment(64,521);
    drawPlayer(playerX,playerY);
    randomStone();
    randomEnemy();
    randomGoal();
    superPowerRandom();
    drawPower(getPowerLocationX,getPowerLocationY);
    drawGoal(goalX,goalY);
    drawEnemy(enemyX,enemyY);
}
function gridline(){
    let x=0;
    let y=0;
    let randomWater=0;
    // make wave-like ocean background (for every button pressing) [It is intentional!]
    randomWater=deepWaterRandom(randomWater);
    ctx.lineWidth = 5;
    for (let i=0;i<=8;i++){
        for (let i=0;i<=8;i++){
            ctx.beginPath();
            ctx.strokeStyle="LightSalmon";
            if (i==randomWater){
                ctx.fillStyle="Teal";
            }
            else {
                ctx.fillStyle="DarkCyan";
            }
            ctx.rect(x,y,100,100);
            ctx.stroke();
            ctx.fill();
            x+=100;
        }
        x=0;
        y+=100;
    }
    ctx.lineWidth = 1;
}
function deepWaterRandom(randomWater){    
    randomWater=Math.floor(Math.random()*8);
    return randomWater;
}
function drawPlayer(playerX, playerY){
    //back fin
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5;
    ctx.fillStyle="DeepPink";
    ctx.arc(playerX-35,playerY,13,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    // side fin
    ctx.beginPath();
    ctx.arc(playerX-28,playerY-25,9,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    // front side fin
    ctx.beginPath();
    ctx.arc(playerX+37,playerY-3,9,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    //main body
    ctx.beginPath();
    let grd =ctx.createRadialGradient(playerX-20,playerY-35,30,playerX-45,playerY-45,115);
    grd.addColorStop(0,"Fuchsia");
    grd.addColorStop(1,"LightGoldenRodYellow");
    ctx.fillStyle = grd;
    ctx.arc(playerX,playerY,37,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    // gill 
    ctx.beginPath();
    ctx.fillStyle="DeepPink";
    ctx.arc(playerX-20,playerY,9,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(playerX-20,playerY,8.5,20,1.8*Math.PI);
    ctx.stroke();
    //eyes
    ctx.beginPath();
    ctx.fillStyle="Black";
    ctx.arc(playerX+5,playerY-6,4,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle="White";
    ctx.arc(playerX+5.5,playerY-6,2,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle="Black";
    ctx.arc(playerX+22,playerY-9,4,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle="White";
    ctx.arc(playerX+23,playerY-9.5,2,0,2*Math.PI);
    ctx.fill();
    //mouth
    ctx.beginPath();
    ctx.arc(playerX+15,playerY,5,0,1*Math.PI);
    ctx.stroke();
}
function drawGoal(goalX, goalY){
    //body
    ctx.beginPath();
    ctx.fillStyle= "ForestGreen";
    ctx.strokeStyle="DarkGreen";
    ctx.arc(goalX,goalY,30,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    //eye
    ctx.beginPath();
    ctx.fillStyle= "Cornsilk";
    ctx.arc(goalX,goalY-5,15,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle= "Crimson";
    ctx.arc(goalX,goalY-8,5,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle= "white";
    ctx.arc(goalX,goalY-10,2,0,2*Math.PI);
    ctx.fill();
    //antenna
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth=5;
    ctx.strokeStyle= "DarkGreen";
    ctx.lineTo(goalX-22,goalY-20);
    ctx.lineTo(goalX-32,goalY-40);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineTo(goalX+22,goalY-20);
    ctx.lineTo(goalX+32,goalY-40);
    ctx.stroke();
    ctx.restore();
    ctx.lineWidth=1;
    //mouth
    ctx.beginPath();
    ctx.strokeStyle="Black";
    ctx.arc(goalX,goalY+20,5,1*Math.PI,0);
    ctx.stroke();
}
function drawEnemy(enemyX,enemyY){
    //tail
    ctx.beginPath();
    ctx.arc(enemyX-20,enemyY-20,10,0,2*Math.PI);
    ctx.fillStyle = "Gainsboro";
    ctx.fill();
    ctx.stroke();
    //body
    ctx.beginPath();
    ctx.arc(enemyX,enemyY,30,0,2*Math.PI);
    ctx.fillStyle="Gainsboro";
    ctx.fill();
    ctx.stroke();
    //mouth
    ctx.beginPath();
    ctx.arc(enemyX+15,enemyY-28,18,0,2*Math.PI);
    ctx.fillStyle="Gainsboro";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(enemyX+15,enemyY-30,4,0,2*Math.PI);
    ctx.fillStyle="black";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(enemyX+17,enemyY-30,1,0,2*Math.PI);
    ctx.fillStyle="white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(enemyX+25,enemyY-30,4,0,2*Math.PI);
    ctx.fillStyle="black";
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(enemyX+27,enemyY-30,1,0,2*Math.PI);
    ctx.fillStyle="white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(enemyX+18,enemyY-22,4,0,Math.PI);
    ctx.stroke();

    //flippers
    ctx.beginPath();
    ctx.moveTo(enemyX-30,enemyY+10);
    ctx.lineTo(enemyX-40,enemyY+35);
    ctx.lineTo(enemyX-10,enemyY+25);
    ctx.lineTo(enemyX-30,enemyY+10);
    ctx.fillStyle = "Gainsboro";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(enemyX+30,enemyY+10);
    ctx.lineTo(enemyX+40,enemyY+35);
    ctx.lineTo(enemyX+10,enemyY+25);
    ctx.lineTo(enemyX+30,enemyY+10);
    ctx.fillStyle="Gainsboro";
    ctx.fill();
    ctx.stroke();
}
function drawUselessEnvironment(starXElement, starYElement){
    ctx.save();
    let angle = 360/5;
    ctx.translate(starXElement,starYElement);
    //body
    ctx.beginPath();
    ctx.fillStyle="Orange";
    ctx.arc(0,0,20,0,2*Math.PI);
    ctx.fill();
    // five tips
    for (let i=0;i<5;i++){
        ctx.beginPath();
        ctx.lineTo(-30,0);
        ctx.lineTo(0,-30);
        ctx.lineTo(30,0);
        ctx.fill();
        ctx.rotate(angle*Math.PI/180);
    }
    ctx.restore();
}
function randomEnemy(){
    let repeat=0;
    while (repeat==0){
        let location = [150,250,350,450,550,650,750];
        enemyX=Math.floor(Math.random()*6);
        enemyX = location[enemyX];
        enemyY=Math.floor(Math.random()*6);
        enemyY = location[enemyY];
        // avoid smallstones
        let touchsmallstone = 0;
        for (let i=0;i<numOfStone;i++){
            if (distanceCal(enemyX,enemyY,smallStoneFormX[i]+50,smallStoneFormY[i]+50)==0){
                touchsmallstone++;
            }
        }
        if (touchsmallstone!=0){
        }
        // avoid stone
        else if ((enemyX>stoneX1)&&(enemyX<stoneX2)&&(enemyY>stoneY1)&&(enemyY<stoneY2)){
        }
        // avoid mine
        else if ((enemyX==mineX)&&(enemyY==mineY)){
        }
        else{
            repeat++;
        }
        
    }
}
function randomGoal(){
    let repeat=0;
    while (repeat==0){
        let locationGoal = [150,250,350,450,550,650,750];
        goalX=Math.floor(Math.random()*6);
        goalX = locationGoal[goalX];
        goalY=Math.floor(Math.random()*6);
        goalY = locationGoal[goalY];
        // avoid smallstones
        let touchsmallstone = 0;
        for (let i=0;i<numOfStone;i++){
            if (distanceCal(goalX,goalY,smallStoneFormX[i]+50,smallStoneFormY[i]+50)==0){
                touchsmallstone++;
            }
        }
        if (touchsmallstone!=0){
        }
        // avoid enemy
        else if ((goalX==enemyX)&&(goalY==enemyY)){
        }
        // avoid player
        else if ((goalX==playerX)&&(goalY==playerY)){
        }
        //avoid stone
        else if ((goalX>stoneX1)&&(goalX<stoneX2)&&(goalY>stoneY1)&&(goalY<stoneY2)){
        }
        // avoid mine
        else if ((enemyX==mineX)&&(enemyY==mineY)){
        }
        else {
            repeat++;
        }
    }
}
function distanceCal(x1,y1,x2,y2){
    let distance = Math.pow((Math.pow((x2-x1),2)+Math.pow((y2-y1),2)),1/2);
    return distance;
}
function touchEnemy(){
    // superpower mode (for only 10 steps)
    if (superpowerGot>0){
        ctx.clearRect(0,0,800,800);
        gridline();
        drawUselessEnvironment(710,46);
        drawUselessEnvironment(64,521);
        drawEnemy(enemyX,enemyY);
        if (superpowerGot==0){
            drawPlayer(playerX,playerY);
        }
        else {
            drawPlayerSuper(playerX, playerY);
        }
        drawGoal(goalX,goalY);
        superPowerRandom();
        drawPower(getPowerLocationX,getPowerLocationY);
        if (bigStoneSmallStone==0){
            stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2);
        }
        else {
            drawSmallStone();
        }
        score += 100;
        document.getElementById("scorePlate").innerHTML = "Eaten: " + score;
    }
    // normal status 
    else {
        ctx.clearRect(0,0,800,800);
        gridline();
        drawUselessEnvironment(710,46);
        drawUselessEnvironment(64,521);
        drawEnemy(enemyX,enemyY);
        drawGoal(goalX,goalY);
        superPowerRandom();
        drawPower(getPowerLocationX,getPowerLocationY);
        if (bigStoneSmallStone==0){
            stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2);
        }
        else {
            drawSmallStone();
        }
        ctx.font = "96px serif";
        ctx.fillStyle ="red";
        ctx.textAlign ="center";
        ctx.fillText("GAME OVER!!", document.getElementById("canvasOutput").width/2, document.getElementById("canvasOutput").height/2);
        gameContinu++;
        return;
    }
}
function resetClicked(){
    gameContinu=0;
    score = 0;
    document.getElementById("scorePlate").innerHTML = "Eaten: " + score;
    playerX=50;
    playerY=50;
    gridline();
    drawUselessEnvironment(710,46);
    drawUselessEnvironment(64,521);
    drawPlayer(playerX,playerY);
    enemyMoveButton=0;
    randomEnemy();
    randomGoal();
    randomStone();
    drawGoal(goalX,goalY);
    drawEnemy(enemyX,enemyY);
    superPowerRandom();
    drawPower(getPowerLocationX,getPowerLocationY);
    indexForTimer =0;
    indexOfRead=0;
    let times = action.length;
    for (let j=0; j<times;j++){
        action.pop();
    }
    document.getElementById("actionProgram").innerHTML = "";
    indexForProgram =-1;
}
function randomStone(){
    bigStoneSmallStone = Math.floor(Math.random()*2);
    if (bigStoneSmallStone==0){
        randomStoneBig();
        stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2);
    }
    else {
        randomStoneSmall();
    }
}
function stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2){
    let diffX = stoneX2 - stoneX1;
    let diffY = stoneY2 - stoneY1;
    ctx.beginPath();
    ctx.fillStyle = "Coral";
    ctx.rect(stoneX1, stoneY1,diffX, diffY);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "Chocolate";
    ctx.rect(stoneX1+5, stoneY1+5,diffX-10, diffY-10);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "Gold";
    ctx.rect(stoneX1+10, stoneY1+10,diffX-20, diffY-20);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "Khaki";
    ctx.rect(stoneX1+15, stoneY1+15,diffX-30, diffY-30);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "FireBrick";
    ctx.rect(stoneX1+20, stoneY1+20,diffX-40, diffY-40);
    ctx.fill();
    let wordWidth = diffX/100;
    ctx.font = "" + wordWidth*10+ "px serif";
    ctx.fillStyle ="White";
    ctx.textAlign ="center";
    ctx.fillText("Hill", (stoneX1+stoneX2)/2, (stoneY1+stoneY2)/2);
}
// stoneX2 and stoneY2 always bigger than X1 and Y1
function randomStoneBig(){
    let locationStone1 = [100,200,300,400];
    let locationStone2 = [196,296,396,496];
    stoneX1=Math.floor(Math.random()*4);
    stoneX1 = locationStone1[stoneX1];
    while (stoneX1>=stoneX2){
        stoneX2=Math.floor(Math.random()*4);
        stoneX2 = locationStone2[stoneX2];
    }
    stoneY1=Math.floor(Math.random()*4);
    stoneY1 = locationStone1[stoneY1];
    while (stoneY1>=stoneY2){
        stoneY2=Math.floor(Math.random()*4);
        stoneY2 = locationStone2[stoneY2];
    }
}
function randomStoneSmall(){
    let smallStoneX = [100,200,300,400,500,600,700];
    let smallStoneY = [100,200,300,400,500,600,700];
    numOfStone = Math.floor(Math.random()*11)+1;
        for (let i=0; i<numOfStone;i++){
            let indexOfArrayX = Math.floor(Math.random()*7);
            let indexOfArrayY = Math.floor(Math.random()*7);
            smallStoneFormX.push(smallStoneX[indexOfArrayX]); 
            smallStoneFormY.push(smallStoneY[indexOfArrayY]); 
            drawSmallStone();
        }
}
function drawSmallStone(){
    for (let i=0; i<numOfStone;i++){
        ctx.beginPath();
        ctx.fillStyle = "Black";
        ctx.rect(smallStoneFormX[i]+15,smallStoneFormY[i]+20,69, 79);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "Gray";
        ctx.rect(smallStoneFormX[i]+20, smallStoneFormY[i]+25,59,74);
        ctx.fill();
        ctx.font = "13px serif";
        ctx.fillStyle ="Black";
        ctx.textAlign ="center";
        ctx.fillText("GRAVE",smallStoneFormX[i]+50, smallStoneFormY[i]+50);
        ctx.beginPath();
        ctx.rect(smallStoneFormX[i]+30,smallStoneFormY[i]+60,40,0.6);
        ctx.strokeStyle= "Black";
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(smallStoneFormX[i]+30,smallStoneFormY[i]+70,40,0.6);
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(smallStoneFormX[i]+30,smallStoneFormY[i]+80,40,0.6);
        ctx.stroke();
    }
}
function keyPushedDown(e){
    let showing = "";

    if (gameContinu==0){
        if (e.key=="ArrowUp"){
            action.push("Up");
            indexForProgram ++;
        }
        else if (e.key=="ArrowDown"){
            action.push("Down");
            indexForProgram ++;
        }
        else if (e.key=="ArrowLeft"){
            action.push("Left");
            indexForProgram ++;
        }
        else if (e.key=="ArrowRight"){
            action.push("Right");
            indexForProgram ++;
        }
        else if (e.key.toLowerCase()=="m"){
            action.push("Mine");
            indexForProgram ++;
        }
        else {
            return;
        }
        if (indexForProgram <5){
            if (indexForProgram<4){
                showing += action[indexForProgram];
                showing += ", ";
                document.getElementById("actionProgram").innerHTML += showing;
            }
            else {
                showing += action[indexForProgram];
                document.getElementById("actionProgram").innerHTML += showing;
            }
        }
    }
}
function execution(){
    if (indexForProgram>=4){
            timerID = setInterval(eachAction, 500);
            document.getElementById("actionProgram").innerHTML = "";
            indexForProgram =-1;
    }
    else{
        alert("You need 5 commands to perform action.");
    }
}
function eachAction(){
        if (gameContinu==0){
            if (action[indexOfRead]=="Up"){
                // small stone boundary-1
                let touchstone=0
                for (let i=0;i<numOfStone;i++){
                    if (distanceCal(playerX,playerY,smallStoneFormX[i]+50,smallStoneFormY[i]+150)==0){
                        touchstone++;
                    }
                }
                // boundary limit 
                if (playerY<=50){
                    indexOfRead++;
                    indexForTimer++;
                }
                // stone limit
                else if ((playerY<=stoneY2+60)&&(playerY>=stoneY1)&&(playerX>stoneX1)&&(playerX<stoneX2)){
                    indexOfRead++;
                    indexForTimer++;
                }
                // small stone boundary-2
                else if (touchstone!=0){
                    indexOfRead++;
                    indexForTimer++;
                }
                else {
                    playerY -= 100;
                    indexOfRead++;
                    ctx.clearRect(0,0,800,800);
                    if (enemyMoveButton==0){
                        enemyMove();
                    }
                    gridline();
                    drawUselessEnvironment(710,46);
                    drawUselessEnvironment(64,521);
                    drawGoal(goalX,goalY);
                    drawEnemy(enemyX,enemyY);
                    drawMine(mineX,mineY);
                    superPowerRandom();
                    drawPower(getPowerLocationX,getPowerLocationY);
                    if (bigStoneSmallStone==0){
                        stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2);
                    }
                    else {
                        drawSmallStone();
                    }
                    if (superpowerGot==0){
                        drawPlayer(playerX,playerY);
                    }
                    else {
                        drawPlayerSuper(playerX, playerY);
                        superpowerGot--;
                    }
                    indexForTimer++;
                }
            }
            else if (action[indexOfRead]=="Down"){
                // small stone boundary-1
                let touchstone=0
                for (let i=0;i<numOfStone;i++){
                    if (distanceCal(playerX,playerY,smallStoneFormX[i]+50,smallStoneFormY[i]-50)==0){
                        touchstone++;
                    }
                }
                // boundary limit 
                if (playerY>=750){
                    indexOfRead++;
                    indexForTimer++;
                }
                // stone limit
                else if ((playerY>=stoneY1-50)&&(playerY<=stoneY2)&&(playerX>stoneX1)&&(playerX<stoneX2)){
                    indexOfRead++;
                    indexForTimer++;
                }
                // small stone boundary-2
                else if (touchstone!=0){
                    indexOfRead++;
                    indexForTimer++;
                }
                else {
                    playerY += 100;
                    indexOfRead++;
                    ctx.clearRect(0,0,800,800);
                    if (enemyMoveButton==0){
                        enemyMove();
                    }
                    gridline();
                    drawUselessEnvironment(710,46);
                    drawUselessEnvironment(64,521);
                    drawGoal(goalX,goalY);
                    drawEnemy(enemyX,enemyY);
                    drawMine(mineX,mineY);
                    superPowerRandom();
                    drawPower(getPowerLocationX,getPowerLocationY);
                    if (bigStoneSmallStone==0){
                        stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2);
                    }
                    else {
                        drawSmallStone();
                    }
                    if (superpowerGot==0){
                        drawPlayer(playerX,playerY);
                    }
                    else {
                        drawPlayerSuper(playerX, playerY);
                        superpowerGot--;
                    }
                    indexForTimer++;
                }
            }
            else if (action[indexOfRead]=="Left"){
                // small stone boundary-1
                let touchstone=0
                for (let i=0;i<numOfStone;i++){
                    if (distanceCal(playerX,playerY,smallStoneFormX[i]+150,smallStoneFormY[i]+50)==0){
                        touchstone++;
                    }
                }
                // boundary limit 
                if (playerX<=50){
                    indexOfRead++;
                    indexForTimer++;
                }
                // stone limit
                else if ((playerX<=stoneX2+60)&&(playerX>=stoneX1)&&(playerY>stoneY1)&&(playerY<stoneY2)){
                    indexOfRead++;
                    indexForTimer++;
                }
                // small stone boundary-2
                else if (touchstone!=0){
                    indexOfRead++;
                    indexForTimer++;
                }
                else {
                    playerX -= 100;
                    indexOfRead++;
                    ctx.clearRect(0,0,800,800);
                    if (enemyMoveButton==0){
                        enemyMove();
                    }
                    gridline();
                    drawUselessEnvironment(710,46);
                    drawUselessEnvironment(64,521);
                    drawGoal(goalX,goalY);
                    drawEnemy(enemyX,enemyY);
                    drawMine(mineX,mineY);
                    superPowerRandom();
                    drawPower(getPowerLocationX,getPowerLocationY);
                    if (bigStoneSmallStone==0){
                        stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2);
                    }
                    else {
                        drawSmallStone();
                    }
                    if (superpowerGot==0){
                        drawPlayer(playerX,playerY);
                    }
                    else {
                        drawPlayerSuper(playerX, playerY);
                        superpowerGot--;
                    }
                    indexForTimer++;
                }
            }
            else if (action[indexOfRead]=="Right"){
                // small stone boundary-1
                let touchstone=0
                for (let i=0;i<numOfStone;i++){
                    if (distanceCal(playerX,playerY,smallStoneFormX[i]-50,smallStoneFormY[i]+50)==0){
                        touchstone++;
                    }
                }
                // boundary limit 
                if (playerX>=750){
                    indexOfRead++;
                    indexForTimer++;
                }
                // stone limit
                else if ((playerX>=stoneX1-50)&&(playerX<=stoneX2)&&(playerY>stoneY1)&&(playerY<stoneY2)){
                    indexOfRead++;
                    indexForTimer++;
                }
                // small stone boundary-2
                else if (touchstone!=0){
                    indexOfRead++;
                    indexForTimer++;
                }
                else{
                    playerX += 100;
                    indexOfRead++;
                    ctx.clearRect(0,0,800,800);
                    if (enemyMoveButton==0){
                        enemyMove();
                    }
                    gridline();
                    drawUselessEnvironment(710,46);
                    drawUselessEnvironment(64,521);
                    drawGoal(goalX,goalY);
                    drawEnemy(enemyX,enemyY);
                    drawMine(mineX,mineY);
                    superPowerRandom();
                    drawPower(getPowerLocationX,getPowerLocationY);
                    if (bigStoneSmallStone==0){
                        stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2);
                    }
                    else {
                        drawSmallStone();
                    }
                    if (superpowerGot==0){
                        drawPlayer(playerX,playerY);
                    }
                    else {
                        drawPlayerSuper(playerX, playerY);
                        superpowerGot--;
                    }
                    indexForTimer++;
                }
            }
            else if (action[indexOfRead]=="Mine"){
                mineX = playerX;
                mineY = playerY;
                indexOfRead++;
                ctx.clearRect(0,0,800,800);
                if (enemyMoveButton==0){
                    enemyMove();
                }
                gridline();
                drawUselessEnvironment(710,46);
                drawUselessEnvironment(64,521);
                drawGoal(goalX,goalY);
                drawEnemy(enemyX,enemyY);
                drawMine(mineX,mineY);
                superPowerRandom();
                drawPower(getPowerLocationX,getPowerLocationY);
                if (bigStoneSmallStone==0){
                    stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2);
                }
                else {
                    drawSmallStone();
                }
                if (superpowerGot==0){
                    drawPlayer(playerX,playerY);
                }
                else {
                    drawPlayerSuper(playerX, playerY);
                    superpowerGot--;
                }
                indexForTimer++;
            }
               
            //if player touch goal 
            if (distanceCal(playerX,playerY,goalX,goalY)==0){
                touchGoal();
            }
            // if player touch enemy
            if (distanceCal(playerX,playerY,enemyX,enemyY)==0){
                touchEnemy();
            }
            // if enemy touch goal
            if (distanceCal(enemyX,enemyY,goalX,goalY)==0){
                enemyTouchGoal();
            }
            // if enemy touch mine
            if (distanceCal(enemyX,enemyY,mineX,mineY)==0){
                enemyTouchMine();
            }
            //if player touch power
            if (distanceCal(playerX,playerY,getPowerLocationX,getPowerLocationY)==0){
                touchpower();
            }
            // clear interval 
            if (indexForTimer >= 5){
                indexForTimer =0;
                indexOfRead=0;
                let times = action.length;
                for (let j=0; j<times;j++){
                    action.pop();
                }
                clearInterval(timerID);
                return;
            }
        }
}
function touchGoal(){
    ctx.clearRect(0,0,800,800);
    gridline();
    drawUselessEnvironment(710,46);
    drawUselessEnvironment(64,521);
    if (superpowerGot==0){
        drawPlayer(playerX,playerY);
    }
    else {
        drawPlayerSuper(playerX, playerY);
    }
    ctx.beginPath();
    ctx.fillStyle = "Green";
    ctx.arc(playerX+22,playerY+4,3,0,2*Math.PI);
    ctx.fill();
    randomGoal();
    drawGoal(goalX,goalY);
    drawEnemy(enemyX,enemyY);
    superPowerRandom();
    drawPower(getPowerLocationX,getPowerLocationY);
    if (bigStoneSmallStone==0){
        stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2);
    }
    else {
        drawSmallStone();
    }
    score +=50;
    document.getElementById("scorePlate").innerHTML = "Eaten: " + score;
}
function drawMine(mineX, mineY){
    ctx.beginPath();
    ctx.fillStyle="Red";
    ctx.arc(mineX,mineY,30,0,2*Math.PI);
    ctx.fill();
}
function enemyMove(){
    let direction = Math.floor(Math.random()*5);
    // up
    if (direction==0){
        let touchsmallstone = 0
        for (let i=0;i<numOfStone;i++){
            if (distanceCal(enemyX,enemyY,smallStoneFormX[i]+50,smallStoneFormY[i]+150)==0){
                touchsmallstone = 1;
            }
        }
        // small stone 
        if (touchsmallstone==1){
        }
        // up boundary
        else if (enemyY<150){
        }
        // big wall
        else if ((enemyY<=stoneY2+60)&&(enemyY>=stoneY1)&&(enemyX>stoneX1)&&(enemyX<stoneX2)){
        }
        else {
            enemyY-=100;
        }
    }
    // down
    else if (direction==1){
        let touchsmallstone = 0
        for (let i=0;i<numOfStone;i++){
            if (distanceCal(enemyX,enemyY,smallStoneFormX[i]+50,smallStoneFormY[i]-50)==0){
                touchsmallstone = 1;
            }
        }
        // small stone 
        if (touchsmallstone==1){
        }
        // up boundary
        else if (enemyY>650){
        }
        // big wall
        else if ((enemyY>=stoneY1-50)&&(enemyY<=stoneY2)&&(enemyX>stoneX1)&&(enemyX<stoneX2)){
        }
        else {
            enemyY+=100;
        }
    }
    // left
    else if (direction==2){
        let touchsmallstone = 0
        for (let i=0;i<numOfStone;i++){
            if (distanceCal(enemyX,enemyY,smallStoneFormX[i]+150,smallStoneFormY[i]+50)==0){
                touchsmallstone = 1;
            }
        }
        // small stone 
        if (touchsmallstone==1){
        }
        // up boundary
        else if (enemyX<150){
        }
        // big wall
        else if ((enemyX<=stoneX2+60)&&(enemyX>=stoneX1)&&(enemyY>stoneY1)&&(enemyY<stoneY2)){
        }
        else {
            enemyX-=100;
        }
    }
    // Right
    else {
        let touchsmallstone = 0
        for (let i=0;i<numOfStone;i++){
            if (distanceCal(enemyX,enemyY,smallStoneFormX[i]-50,smallStoneFormY[i]+50)==0){
                touchsmallstone = 1;
            }
        }
        // small stone 
        if (touchsmallstone==1){
        }
        // right boundary
        else if (enemyX>650 ){
        }
        // big wall
        else if ((enemyX>=stoneX1-50)&&(enemyX<=stoneX2)&&(enemyY>stoneY1)&&(enemyY<stoneY2)){
        }
        else {
            enemyX+=100;
        }
    }
}
function enemyTouchGoal(){
    score -=25;
    randomGoal();
    ctx.clearRect(0,0,800,800);
    gridline();
    drawUselessEnvironment(710,46);
    drawUselessEnvironment(64,521);
    if (superpowerGot==0){
        drawPlayer(playerX,playerY);
    }
    else {
        drawPlayerSuper(playerX, playerY);
    }
    randomGoal();
    drawGoal(goalX,goalY);
    drawEnemy(enemyX,enemyY);
    superPowerRandom();
    drawPower(getPowerLocationX,getPowerLocationY);
    if (bigStoneSmallStone==0){
        stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2);
    }
    else {
        drawSmallStone();
    }
    document.getElementById("scorePlate").innerHTML = "Eaten: " + score;
}
function enemyTouchMine(){
    mineX=-100;
    mineY=-100;
    enemyX=-100;
    enemyY=-100;
    ctx.clearRect(0,0,800,800);
    gridline();
    drawUselessEnvironment(710,46);
    drawUselessEnvironment(64,521);
    if (superpowerGot==0){
        drawPlayer(playerX,playerY);
    }
    else {
        drawPlayerSuper(playerX, playerY);
    }
    drawGoal(goalX,goalY);
    drawEnemy(enemyX,enemyY);
    superPowerRandom();
    drawPower(getPowerLocationX,getPowerLocationY);
    if (bigStoneSmallStone==0){
        stoneMadeBig(stoneX1,stoneY1,stoneX2,stoneY2);
    }
    else {
        drawSmallStone();
    }
    score += 300;
    document.getElementById("scorePlate").innerHTML = "Eaten: " + score;
    enemyMoveButton =1;
}
function superPowerRandom(){
    let locationGoal = [150,250,350,450,550,650,750];
    let num =Math.floor(Math.random()*3); 
    if ((num==0)&&(superpower==0)){
        superpower = 10;
        let repeat = 0;
        while (repeat==0){
            getPowerLocationX = Math.floor(Math.random()*7);
            getPowerLocationX = locationGoal[getPowerLocationX];
            getPowerLocationY = Math.floor(Math.random()*7);
            getPowerLocationY = locationGoal[getPowerLocationY];
            // avoid smallstones
            let touchsmallstone = 0;
            for (let i=0;i<numOfStone;i++){
                if (distanceCal(getPowerLocationX,getPowerLocationY,smallStoneFormX[i]+50,smallStoneFormY[i]+50)==0){
                    touchsmallstone++;
                }
            }
            if (touchsmallstone!=0){
            }
            // avoid stone
            else if ((getPowerLocationX>stoneX1)&&(getPowerLocationX<stoneX2)&&(getPowerLocationY>stoneY1)&&(getPowerLocationY<stoneY2)){
            }
            // avoid mine
            else if ((getPowerLocationX==mineX)&&(getPowerLocationY==mineY)){
            }
            // avoid enemy
            else if ((getPowerLocationX==enemyX)&&(getPowerLocationY==enemyY)){
            }
            else{
                repeat++;
            }
        }
    }
}
function drawPower(getPowerLocationX,getPowerLocationY){
    ctx.beginPath();
    ctx.fillStyle = "Red";
    ctx.arc(getPowerLocationX,getPowerLocationY,50,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "Orange";
    ctx.arc(getPowerLocationX,getPowerLocationY,45,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "Yellow";
    ctx.arc(getPowerLocationX,getPowerLocationY,40,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "Green";
    ctx.arc(getPowerLocationX,getPowerLocationY,35,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "Blue";
    ctx.arc(getPowerLocationX,getPowerLocationY,30,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "Indigo";
    ctx.arc(getPowerLocationX,getPowerLocationY,25,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "Violet";
    ctx.arc(getPowerLocationX,getPowerLocationY,20,0,2*Math.PI);
    ctx.fill();
}
function touchpower(){
    superpowerGot=10;
    getPowerLocationX=-100;
    getPowerLocationY=-100;
    superpower=0;
}
function drawPlayerSuper(){
    //back fin
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5;
    ctx.fillStyle="DeepPink";
    ctx.arc(playerX-35,playerY,13,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    // side fin
    ctx.beginPath();
    ctx.arc(playerX-28,playerY-25,9,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    // front side fin
    ctx.beginPath();
    ctx.arc(playerX+37,playerY-3,9,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    //main body
    ctx.beginPath();
    let grd =ctx.createRadialGradient(playerX-20,playerY-35,30,playerX-45,playerY-45,115);
    grd.addColorStop(0,"Red");
    grd.addColorStop(1,"LightGoldenRodYellow");
    ctx.fillStyle = grd;
    ctx.arc(playerX,playerY,37,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    // gill 
    ctx.beginPath();
    ctx.fillStyle="DeepPink";
    ctx.arc(playerX-20,playerY,9,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(playerX-20,playerY,8.5,20,1.8*Math.PI);
    ctx.stroke();
    //eyes
    ctx.beginPath();
    ctx.fillStyle="Black";
    ctx.arc(playerX+5,playerY-6,4,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle="Red";
    ctx.arc(playerX+5.5,playerY-6,2,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle="Black";
    ctx.arc(playerX+22,playerY-9,4,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle="Blue";
    ctx.arc(playerX+23,playerY-9.5,2,0,2*Math.PI);
    ctx.fill();
    //mouth
    ctx.beginPath();
    ctx.arc(playerX+15,playerY,5,0,1*Math.PI);
    ctx.stroke();
}


