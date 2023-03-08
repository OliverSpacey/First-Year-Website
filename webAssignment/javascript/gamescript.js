/*
As each function was to work for one of the three screen sizes (breakpoints at screen size for desktop, tablet, and mobile, with their names
co-ordinating with the screen size - e.g. MobileSmall = Phone, MobileMedium = Tablet, Desktop = Desktop) each function was copied twice 
with the necessary changes to allow it to work on the given screen size.

The first function creates a prompt for the user to enter their name, which is then used throughout the rest of the code. The gameloop is then run.
*/

function AskNameDesktop(){
    var name = prompt("Please enter your name:");
    document.getElementById('demo').innerText = "Welcome, " + name;

    var canvas = document.getElementById('gameAreaDesktop');
    console.log(canvas);
    

    str = "Select an image";
    displayGuess(str);

    score = 0;
    loop = 0;
    gameLoopD(canvas,score,loop, name);
}

function AskNameMobileM(){
    var name = prompt("Please enter your name:");
    document.getElementById('demo').innerText = "Welcome, " + name;

    var canvas = document.getElementById('gameAreaMobileMedium');
    console.log(canvas);
    

    str = "Select an image";
    displayGuess(str);

    score = 0;
    loop = 0;
    gameLoopMM(canvas,score,loop, name);
}

function AskNameMobileS(){
    var name = prompt("Please enter your name:");
    document.getElementById('demo').innerText = "Welcome, " + name;

    var canvas = document.getElementById('gameAreaMobileSmall');
    console.log(canvas);
    

    str = "Select an image";
    displayGuess(str);

    score = 0;
    loop = 0;
    gameLoopMS(canvas,score,loop, name);
}

/*
The gameloop function for each screen size acts to run the 3 most important functions for the game to work. These are: the function that finds the
co-ordinates of the 3 pictures (findcoords), the function that establishes what will be drawn and draws the 3 pictures (drawshapes), and the function that listens 
for the mouse click event.

Additionally, there is a function in gameLoop called 'displayResult' which will simply alter the text at a specific place on the web page.

'boxes' refers to the object for each 'box', which is the area that each image takes up. This is needed for the clickCheck function to operate as required.
*/


function gameLoopD(canvas,score,loop, name){

    var perm_name = name;

    console.log(score, loop)
    var boxes = findcoordsDesktop();
    let box1 = boxes.box1;
    let box2 = boxes.box2;
    let box3 = boxes.box3;

    var guesses = drawshapesD(context, box1, box2, box3);
    let guess1 = guesses.guess1;

    var str = "Select the picture of the "+guess1;

    displayResult(str);

    canvas.addEventListener('click', function(evt){clickCheckDesktop(evt, box1, box2, box3, perm_name)}, false);

}

function gameLoopMM(canvas,score,loop, name){

    var perm_name = name;

    console.log(score, loop)
    var boxes = findcoordsMobileM();
    let box1 = boxes.box1;
    let box2 = boxes.box2;
    let box3 = boxes.box3;

    var guesses = drawshapesMM(context, box1, box2, box3);
    let guess1 = guesses.guess1;

    var str = "Select the picture of the "+guess1;

    displayResult(str);


    canvas.addEventListener('click', function(evt){clickCheckMobileMedium(evt, box1, box2, box3, perm_name)}, false);

}

function gameLoopMS(canvas,score,loop, name){

    var perm_name = name;

    console.log(score, loop)
    var boxes = findcoordsMobileS();
    let box1 = boxes.box1;
    let box2 = boxes.box2;
    let box3 = boxes.box3;

    var guesses = drawshapesMS(context, box1, box2, box3);
    let guess1 = guesses.guess1;
    var str = "Select the picture of the "+guess1;

    displayResult(str);

    canvas.addEventListener('click', function(evt){clickCheckMobileSmall(evt, box1, box2, box3, perm_name)}, false);

}

/*
This function is here to check each mouse click event to determine if the mouse was clicked inside one of the 3 'boxes'. This is 
achieved by first running the getMouseXY function with the event, and using the canvas size to provide x and y co-ordinates of the mouse.

The x and y from getMouseXY are then returned and stored in a variablew 'mousePos', which is used in conjuction with the next function:
checkContainer - this serves to check if the x and y co-ordinates given for the mouse are within one of the 3 boxes, and return a boolean
value based on this.

A number of variables are then defined: boxnState (where n is 1, 2, or 3) takes the two return values from checkContainer for each box
and assigns the return value 'box_click' to isBoxn, which is then used to determine if any of the boxes have been selected. If isBoxn 
is true for any of the three boxes, then one of them has been selected, and the final variable is used to determine if it is the correct box.
This variable is called 'isCorrect', and only takes a boolean from box1, and this is the box the user will be asked to select.

If any of the boxes have been selected AND isCorrect is true, then the correct box has been chosen and the score updates along with an appropriate 
message, while if a bos is selected but it is not box1, then the score is unchanged and a message is displayed. As long as a box is selected, 
the canvas must be reset for the next round, which is what old_canvas and new_canvas achieve. The canvas parameters are cloned and saved in a new
variable, with the old canvas being replaced with the new one, hence removing the mouse event from the canvas and preventing multiple mouse events 
from being added to the same canvas. 

Furthermore, once a box is selected, the variable 'loop' is incremented to ensure the game only runs 3 times, and gameLoop is run again with the 
new canvas, but with score and loop remaining unchanged until a new game is started.

Finally, if the game has ended (loop == 2), then the canvas is filled in black to show the player that there is no more, and a message detailing 
their score and name is displayed.
*/

function clickCheckDesktop(evt, box1, box2, box3, name){
    var mousePos = getMouseXYD(evt);
    console.log("click: "+mousePos.x+", "+mousePos.y);

    var box1State = checkContainer(mousePos.x, mousePos.y, box1, box1);
    var box2State = checkContainer(mousePos.x, mousePos.y, box1, box2);
    var box3State = checkContainer(mousePos.x, mousePos.y, box1, box3);

    var isBox1 = box1State.box_click;
    var isBox2 = box2State.box_click;
    var isBox3 = box3State.box_click;
    var isCorrect = box1State.correct;


    if (isBox1 || isBox2 || isBox3){
        context.clearRect(0,0,WIDTH,HEIGHT);
        console.log("boxclick");
        var old_canvas = document.getElementById("gameAreaDesktop");
        var new_canvas = old_canvas.cloneNode(true);
        old_canvas.parentNode.replaceChild(new_canvas, old_canvas);
        context = new_canvas.getContext('2d');
        if (isCorrect){
            correct_chosen = true;
            str = "Well done, "+name+"! That was the correct image";
            displayGuess(str);
            if (loop == 2){
                score += 1;
                context.fillStyle = "black";
                context.beginPath();
                context.rect(0,0,WIDTH,HEIGHT);
                context.fill();
                console.log("Score: "+score+" out of 3");
                document.getElementById('demo').innerText = name+", you got a score of: "+score+" out of 3, good job!";
            }
            else{
                loop += 1;
                score += 1;
                gameLoopD(new_canvas,score,loop, name);
            }

        }
        else{
            str = "Unlucky "+name+", that was not the correct image";
            displayGuess(str);
            if (loop == 2){
                context.fillStyle = "black";
                context.beginPath();
                context.rect(0,0,WIDTH,HEIGHT);
                context.fill();
                console.log("Score: "+score+" out of 3");
                document.getElementById('demo').innerText = name+", you got a score of: "+score+" out of 3, good job!";
            }
            else{
                loop += 1;
                gameLoopD(new_canvas,score,loop, name);
            }
            
        }
    }
}

function clickCheckMobileMedium(evt, box1, box2, box3, name){
    var mousePos = getMouseXYMM(evt);
    console.log("click: "+mousePos.x+", "+mousePos.y);

    var box1State = checkContainer(mousePos.x, mousePos.y, box1, box1);
    var box2State = checkContainer(mousePos.x, mousePos.y, box1, box2);
    var box3State = checkContainer(mousePos.x, mousePos.y, box1, box3);

    var isBox1 = box1State.box_click;
    var isBox2 = box2State.box_click;
    var isBox3 = box3State.box_click;
    var isCorrect = box1State.correct;


    if (isBox1 || isBox2 || isBox3){
        context.clearRect(0,0,WIDTH,HEIGHT);
        console.log("boxclick");
        var old_canvas = document.getElementById("gameAreaMobileMedium");
        var new_canvas = old_canvas.cloneNode(true);
        old_canvas.parentNode.replaceChild(new_canvas, old_canvas);
        context = new_canvas.getContext('2d');
        if (isCorrect){
            correct_chosen = true;
            str = "Well done, "+name+"! That was the correct image";
            displayGuess(str);
            if (loop == 2){
                score += 1;
                context.fillStyle = "black";
                context.beginPath();
                context.rect(0,0,WIDTH,HEIGHT);
                context.fill();
                console.log("Score: "+score+" out of 3");
                document.getElementById('demo').innerText = name+", you got a score of: "+score+" out of 3, good job!";
            }
            else{
                loop += 1;
                score += 1;
                gameLoopMM(new_canvas,score,loop, name);
            }

        }
        else{
            str = "Unlucky "+name+", that was not the correct image";
            displayGuess(str);
            if (loop == 2){
                context.fillStyle = "black";
                context.beginPath();
                context.rect(0,0,WIDTH,HEIGHT);
                context.fill();
                console.log("Score: "+score+" out of 3");
                document.getElementById('demo').innerText = name+", you got a score of: "+score+" out of 3, good job!";
            }
            else{
                loop += 1;
                gameLoopMM(new_canvas,score,loop, name);
            }
            
        }
    }
}

function clickCheckMobileSmall(evt, box1, box2, box3, name){
    var mousePos = getMouseXYMS(evt);
    console.log("click: "+mousePos.x+", "+mousePos.y);

    var box1State = checkContainer(mousePos.x, mousePos.y, box1, box1);
    var box2State = checkContainer(mousePos.x, mousePos.y, box1, box2);
    var box3State = checkContainer(mousePos.x, mousePos.y, box1, box3);

    var isBox1 = box1State.box_click;
    var isBox2 = box2State.box_click;
    var isBox3 = box3State.box_click;
    var isCorrect = box1State.correct;


    if (isBox1 || isBox2 || isBox3){
        any_chosen = true;
        context.clearRect(0,0,WIDTH,HEIGHT);
        console.log("boxclick");
        var old_canvas = document.getElementById("gameAreaMobileSmall");
        var new_canvas = old_canvas.cloneNode(true);
        old_canvas.parentNode.replaceChild(new_canvas, old_canvas);
        context = new_canvas.getContext('2d');
        if (isCorrect){
            correct_chosen = true;
            str = "Well done, "+name+"! That was the correct image";
            displayGuess(str);
            if (loop == 2){
                score += 1;
                context.fillStyle = "black";
                context.beginPath();
                context.rect(0,0,WIDTH,HEIGHT);
                context.fill();
                console.log("Score: "+score+" out of 3");
                document.getElementById('demo').innerText = name+", you got a score of: "+score+" out of 3, good job!";
            }
            else{
                loop += 1;
                score += 1;
                gameLoopMS(new_canvas,score,loop, name);
            }

        }
        else{
            str = "Unlucky "+name+", that was not the correct image";
            displayGuess(str);
            if (loop == 2){
                context.fillStyle = "black";
                context.beginPath();
                context.rect(0,0,WIDTH,HEIGHT);
                context.fill();
                console.log("Score: "+score+" out of 3");
                document.getElementById('demo').innerText = name+", you got a score of: "+score+" out of 3, good job!";
            }
            else{
                loop += 1;
                gameLoopMS(new_canvas,score,loop, name);
            }
            
        }
    }
}

function displayResult(str) {
    var outputArea = document.getElementById('guessarea');
    var myElement = document.createElement("p");
    var textNode = document.createTextNode(str);
    myElement.appendChild(textNode);
    if (outputArea.firstChild)
        outputArea.replaceChild(myElement, outputArea.firstChild);
    else
        outputArea.appendChild(myElement);
}

function displayGuess(str) {
    var outputArea = document.getElementById('output_area');
    var myElement = document.createElement("p");
    var textNode = document.createTextNode(str);
    myElement.appendChild(textNode);
    if (outputArea.firstChild)
        outputArea.replaceChild(myElement, outputArea.firstChild);
    else
        outputArea.appendChild(myElement);
}

/*
The 6 functions below draw the star and triangle for each screen size using the canvas draw commands.
All the numbers used in the co-ordinates for the lines relate to ensuring the star or triangle looks correct.
*/

function drawStarD(context,x,y) {
    var starx = x+75;
    var stary = y+5;
    context.fillStyle = "black";
    context.beginPath();
    context.moveTo(starx,stary);
    context.lineTo(starx+22,stary+47);
    context.lineTo(starx+74,stary+52.5);
    context.lineTo(starx+36,stary+88);
    context.lineTo(starx+44,stary+137);
    context.lineTo(starx,stary+114);
    context.lineTo(starx-44.8,stary+137);
    context.lineTo(starx-36,stary+88);
    context.lineTo(starx-72,stary+52);
    context.lineTo(starx-22,stary+46);
    context.lineTo(starx,stary);
    context.closePath();
    context.fill();
}
function drawStarMM(context,x,y) {
    var starx = x+50;
    var stary = y+2;
    context.fillStyle = "black";
    context.beginPath();
    context.moveTo(starx,stary);
    context.lineTo(starx+14.7,stary+31.5);
    context.lineTo(starx+50,stary+35);
    context.lineTo(starx+24,stary+59);
    context.lineTo(starx+30.5,stary+92);
    context.lineTo(starx,stary+76);
    context.lineTo(starx-30,stary+92);
    context.lineTo(starx-24,stary+59);
    context.lineTo(starx-50,stary+35);
    context.lineTo(starx-14.7,stary+31.5);
    context.lineTo(starx,stary);
    context.closePath();
    context.fill();
}
function drawStarMS(context,x,y) {
    var starx = x+25;
    var stary = y+1;
    context.fillStyle = "black";
    context.beginPath();
    context.moveTo(starx,stary);
    context.lineTo(starx+7,stary+15);
    context.lineTo(starx+25,stary+17.5);
    context.lineTo(starx+12,stary+29);
    context.lineTo(starx+15,stary+46);
    context.lineTo(starx,stary+38);
    context.lineTo(starx-15,stary+46);
    context.lineTo(starx-12,stary+29);
    context.lineTo(starx-25,stary+17.5);
    context.lineTo(starx-7,stary+15);
    context.lineTo(starx,stary);
    context.closePath();
    context.fill();
}


function drawTriangleD(context,x,y) {
    var trix = x+75;
    var triy = y+10;
    context.fillStyle = "black";
    context.beginPath();
    context.moveTo(trix, triy);
    context.lineTo(trix+65, triy+125);
    context.lineTo(trix-65, triy+125);
    context.lineTo(trix, triy);
    context.closePath();
    context.fill();
}

function drawTriangleMM(context,x,y) {
    var trix = x+50;
    var triy = y+7;
    context.fillStyle = "black";
    context.beginPath();
    context.moveTo(trix, triy);
    context.lineTo(trix+43, triy+83);
    context.lineTo(trix-43, triy+83);
    context.lineTo(trix, triy);
    context.closePath();
    context.fill();
}

function drawTriangleMS(context,x,y) {
    var trix = x+25;
    var triy = y+3;
    context.fillStyle = "black";
    context.beginPath();
    context.moveTo(trix, triy);
    context.lineTo(trix+21, triy+41);
    context.lineTo(trix-21, triy+41);
    context.lineTo(trix, triy);
    context.closePath();
    context.fill();
}

/*

These 3 functions generate the unique co-ordinates for each box, ensuring that none overlap or extend beyond the bounds of the canvas.
This is achieved by using a while loop that will loop until all 3 of the sets of the co-ordinates are sufficiently far from eachother and the canvas walls, 
so as to meet the requirement stated above.

*/


function findcoordsDesktop(){
    var x1 = Math.random()*WIDTH;
    var y1 = Math.random()*HEIGHT;
    var rw = 150;
    var rh = 150;
    var x2 = Math.random()*WIDTH;
    var y2 = Math.random()*HEIGHT;
    var x3 = Math.random()*WIDTH;
    var y3 = Math.random()*HEIGHT;

    while
    //Top left corner
     (((((y3 > 300 || x3 > 500) || ((y3 >= y1 && y3 <= y1+rh) && (x3 >= x1 && x3 <= x1+rw)) || ((y3 >= y2 && y3 <= y2+rh) && (x3 >= x2 && x3 <= x2+rw))) ||
     ((y2 > 300 || x2 > 500) || ((y2 >= y1 && y2 <= y1+rh) && (x2 >= x1 && x2 <= x1+rw)) || (y2 >= y3 && y2<= y3+rh) && (x2 >= x3 && x2 <= x3+rw))) || 
     ((y1 > 300 || x1 > 500) || ((y1 >= y3 && y1 <= y3+rh) && (x1 >= x3 && x1 <= x3+rw)) || ((y1 >= y2 && y1 <= y2+rh) && (x1 >= x2 && x1 <= x2+rw)))) ||
     
     //Top right corner
     ((((y3 > 300 || x3 > 500) || ((y3 >= y1 && y3 <= y1+rh) && (x3+rw >= x1 && x3+rw <= x1+rw)) || ((y3 >= y2 && y3 <= y2+rh) && (x3+rw >= x2 && x3+rw <= x2+rw))) ||
     ((y2 > 300 || x2 > 500) || ((y2 >= y1 && y2 <= y1+rh) && (x2+rw >= x1 && x2+rw <= x1+rw)) || (y2 >= y3 && y2<= y3+rh) && (x2+rw >= x3 && x2+rw <= x3+rw))) || 
     ((y1 > 300 || x1 > 500) || ((y1 >= y3 && y1 <= y3+rh) && (x1+rw >= x3 && x1+rw <= x3+rw)) || ((y1 >= y2 && y1 <= y2+rh) && (x1+rw >= x2 && x1+rw <= x2+rw)))))
     
     {
        var x3 = Math.random()*WIDTH;
        var y3 = Math.random()*HEIGHT;
        var x2 = Math.random()*WIDTH;
        var y2 = Math.random()*HEIGHT;
        var x1 = Math.random()*WIDTH;
        var y1 = Math.random()*HEIGHT;
    }
    var box1 = {x: x1, y: y1, w: rw, h: rh};
    var box2 = {x: x2, y: y2, w: rw, h: rh};
    var box3 = {x: x3, y: y3, w: rw, h: rh};
    return {box1, box2, box3};
}

function findcoordsMobileM(){
    var x1 = Math.random()*WIDTH;
    var y1 = Math.random()*HEIGHT;
    var rw = 100;
    var rh = 100;
    var x2 = Math.random()*WIDTH;
    var y2 = Math.random()*HEIGHT;
    var x3 = Math.random()*WIDTH;
    var y3 = Math.random()*HEIGHT;
    while
    //Top left corner
     (((((y3 > 200 || x3 > 300) || ((y3 >= y1 && y3 <= y1+rh) && (x3 >= x1 && x3 <= x1+rw)) || ((y3 >= y2 && y3 <= y2+rh) && (x3 >= x2 && x3 <= x2+rw))) ||
     ((y2 > 200 || x2 > 300) || ((y2 >= y1 && y2 <= y1+rh) && (x2 >= x1 && x2 <= x1+rw)) || (y2 >= y3 && y2<= y3+rh) && (x2 >= x3 && x2 <= x3+rw))) || 
     ((y1 > 200 || x1 > 300) || ((y1 >= y3 && y1 <= y3+rh) && (x1 >= x3 && x1 <= x3+rw)) || ((y1 >= y2 && y1 <= y2+rh) && (x1 >= x2 && x1 <= x2+rw)))) ||
     
     //h200 w300
     //Top right corner
     ((((y3 > 200 || x3 > 300) || ((y3 >= y1 && y3 <= y1+rh) && (x3+rw >= x1 && x3+rw <= x1+rw)) || ((y3 >= y2 && y3 <= y2+rh) && (x3+rw >= x2 && x3+rw <= x2+rw))) ||
     ((y2 > 200 || x2 > 300) || ((y2 >= y1 && y2 <= y1+rh) && (x2+rw >= x1 && x2+rw <= x1+rw)) || (y2 >= y3 && y2<= y3+rh) && (x2+rw >= x3 && x2+rw <= x3+rw))) || 
     ((y1 > 200 || x1 > 300) || ((y1 >= y3 && y1 <= y3+rh) && (x1+rw >= x3 && x1+rw <= x3+rw)) || ((y1 >= y2 && y1 <= y2+rh) && (x1+rw >= x2 && x1+rw <= x2+rw)))))
     
     {
        var x3 = Math.random()*WIDTH;
        var y3 = Math.random()*HEIGHT;
        var x2 = Math.random()*WIDTH;
        var y2 = Math.random()*HEIGHT;
        var x1 = Math.random()*WIDTH;
        var y1 = Math.random()*HEIGHT;
    }
    var box1 = {x: x1, y: y1, w: rw, h: rh};
    var box2 = {x: x2, y: y2, w: rw, h: rh};
    var box3 = {x: x3, y: y3, w: rw, h: rh};
    return {box1, box2, box3};
}

function findcoordsMobileS(){
    var x1 = Math.random()*WIDTH;
    var y1 = Math.random()*HEIGHT;
    var rw = 50;
    var rh = 50;
    var x2 = Math.random()*WIDTH;
    var y2 = Math.random()*HEIGHT;
    var x3 = Math.random()*WIDTH;
    var y3 = Math.random()*HEIGHT;
    while
    //Top left corner
     (((((y3 > 150 || x3 > 200) || ((y3 >= y1 && y3 <= y1+rh) && (x3 >= x1 && x3 <= x1+rw)) || ((y3 >= y2 && y3 <= y2+rh) && (x3 >= x2 && x3 <= x2+rw))) ||
     ((y2 > 150 || x2 > 200) || ((y2 >= y1 && y2 <= y1+rh) && (x2 >= x1 && x2 <= x1+rw)) || (y2 >= y3 && y2<= y3+rh) && (x2 >= x3 && x2 <= x3+rw))) || 
     ((y1 > 150 || x1 > 200) || ((y1 >= y3 && y1 <= y3+rh) && (x1 >= x3 && x1 <= x3+rw)) || ((y1 >= y2 && y1 <= y2+rh) && (x1 >= x2 && x1 <= x2+rw)))) ||
     
     //Top right corner
     ((((y3 > 150 || x3 > 200) || ((y3 >= y1 && y3 <= y1+rh) && (x3+rw >= x1 && x3+rw <= x1+rw)) || ((y3 >= y2 && y3 <= y2+rh) && (x3+rw >= x2 && x3+rw <= x2+rw))) ||
     ((y2 > 150 || x2 > 200) || ((y2 >= y1 && y2 <= y1+rh) && (x2+rw >= x1 && x2+rw <= x1+rw)) || (y2 >= y3 && y2<= y3+rh) && (x2+rw >= x3 && x2+rw <= x3+rw))) || 
     ((y1 > 150 || x1 > 200) || ((y1 >= y3 && y1 <= y3+rh) && (x1+rw >= x3 && x1+rw <= x3+rw)) || ((y1 >= y2 && y1 <= y2+rh) && (x1+rw >= x2 && x1+rw <= x2+rw)))))
     
     //h150 w200
     {
        var x3 = Math.random()*WIDTH;
        var y3 = Math.random()*HEIGHT;
        var x2 = Math.random()*WIDTH;
        var y2 = Math.random()*HEIGHT;
        var x1 = Math.random()*WIDTH;
        var y1 = Math.random()*HEIGHT;
    }
    var box1 = {x: x1, y: y1, w: rw, h: rh};
    var box2 = {x: x2, y: y2, w: rw, h: rh};
    var box3 = {x: x3, y: y3, w: rw, h: rh};
    return {box1, box2, box3};
}

//This allows for a random integer to be obtainted within a given range.

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/*
The 3 functions below draw each of the 3 images, starting with a white box behind each image, and then using the variable 
'source1' to determine which of the images the elements in 'arrnum' are representing. arrnum is the array of numbers that 
represents the 3 images, and is defined in the drawShapes functions.
*/


function imageplotD(context, box, arrnum, num){

    const imagearray = ["images/catdrawing.jpeg", "images/dogdrawing.jpeg", "images/chickendrawing.jpeg", "images/horsedrawing.jpeg"];
    const namearray = ["cat", "dog", "chicken", "horse"];
    var x = box.x;
    var y = box.y;
    var rw = box.w;
    var rh = box.h;

    context.beginPath();
    context.rect(x,y,rw,rh);
    context.fillStyle = "white";
    context.fill();


    var img = new Image();
    img.onload = function() {
        context.drawImage(img,x,y);
    }
    
    var source1 = arrnum[num];

    if (source1 <= 4){
        img.src = imagearray[source1-1];
        var guess = namearray[source1-1];
    }
    else {
        if (source1 == 5){
            drawStarD(context,x,y);
            var guess = 'star';
        }
        else{
            drawTriangleD(context,x,y);
            var guess = 'triangle';
        }
    }
    return(guess);
}

function imageplotMM(context, box, arrnum, num){

    const imagearray = ["images/catdrawing100px.png", "images/dogdrawing100px.png", "images/chickendrawing100px.png", "images/horsedrawing100px.png"];
    const namearray = ["cat", "dog", "chicken", "horse"];
    var x = box.x;
    var y = box.y;
    var rw = box.w;
    var rh = box.h;

    context.beginPath();
    context.rect(x,y,rw,rh);
    context.fillStyle = "white";
    context.fill();


    var img = new Image();
    img.onload = function() {
        context.drawImage(img,x,y);
    }
    
    var source1 = arrnum[num];

    if (source1 <= 4){
        img.src = imagearray[source1-1];
        var guess = namearray[source1-1];
    }
    else {
        if (source1 == 5){
            drawStarMM(context,x,y);
            var guess = 'star';
        }
        else{
            drawTriangleMM(context,x,y);
            var guess = 'triangle';
        }
    }
    return(guess);
}

function imageplotMS(context, box, arrnum, num){

    const imagearray = ["images/catdrawing50px.png", "images/dogdrawing50px.png", "images/chickendrawing50px.png", "images/horsedrawing50px.png"];
    const namearray = ["cat", "dog", "chicken", "horse"];
    var x = box.x;
    var y = box.y;
    var rw = box.w;
    var rh = box.h;

    context.beginPath();
    context.rect(x,y,rw,rh);
    context.fillStyle = "white";
    context.fill();


    var img = new Image();
    img.onload = function() {
        context.drawImage(img,x,y);
    }
    
    var source1 = arrnum[num];

    if (source1 <= 4){
        img.src = imagearray[source1-1];
        var guess = namearray[source1-1];
    }
    else {
        if (source1 == 5){
            drawStarMS(context,x,y);
            var guess = 'star';
        }
        else{
            drawTriangleMS(context,x,y);
            var guess = 'triangle';
        }
    }
    return(guess);
}

/*
In this function, arrnum is defined and given 3 values to hold - aech a unique number between 1 and 6 inclusive.
This is important as each number represents one of the 6 images, and so to avoid any duplicate images, the numbers 
must all be different. This is done by nesting a while loop inside the for loop below, such that as the for loop 
increments, if the new integer chosen is already an element of arrnum, it cannot be accepted and a new number must be chosen.
*/

function drawshapesD(context, box1, box2, box3){
    context.clearRect(0,0, WIDTH, HEIGHT);
    var source = getRandomIntInclusive(1, 6);
    const arrnum = [];

    for (let i = 0; i<3; i++){
        while (arrnum.includes(source)){
            var source = getRandomIntInclusive(1, 6);
        }
        arrnum[i] = source;
    }
    console.log(arrnum);

    var guess1 = imageplotD(context, box1, arrnum, 0);
    var guess2 = imageplotD(context, box2, arrnum, 1);
    var guess3 = imageplotD(context, box3, arrnum, 2);

    console.log(guess1, guess2, guess3);

    return{guess1, guess2, guess3};

}

function drawshapesMM(context, box1, box2, box3){
    context.clearRect(0,0, WIDTH, HEIGHT);
    var source = getRandomIntInclusive(1, 6);
    const arrnum = [];

    for (let i = 0; i<3; i++){
        while (arrnum.includes(source)){
            var source = getRandomIntInclusive(1, 6);
        }
        arrnum[i] = source;
    }
    console.log(arrnum);

    var guess1 = imageplotMM(context, box1, arrnum, 0);
    var guess2 = imageplotMM(context, box2, arrnum, 1);
    var guess3 = imageplotMM(context, box3, arrnum, 2);

    console.log(guess1, guess2, guess3);

    return{guess1, guess2, guess3};

}

function drawshapesMS(context, box1, box2, box3){
    context.clearRect(0,0, WIDTH, HEIGHT);
    var source = getRandomIntInclusive(1, 6);
    const arrnum = [];

    for (let i = 0; i<3; i++){
        while (arrnum.includes(source)){
            var source = getRandomIntInclusive(1, 6);
        }
        arrnum[i] = source;
    }
    console.log(arrnum);

    var guess1 = imageplotMS(context, box1, arrnum, 0);
    var guess2 = imageplotMS(context, box2, arrnum, 1);
    var guess3 = imageplotMS(context, box3, arrnum, 2);

    console.log(guess1, guess2, guess3);

    return{guess1, guess2, guess3};

}

/*
getMouseXY is a function that will take the mouse click event and use this to establish the exact position of the mouse cursor 
when it was clicked. This value is then returned to be used for checkContainer.
*/


function getMouseXYD(evt) {
    var canvas = document.getElementById('gameAreaDesktop');
    var boundingRect = canvas.getBoundingClientRect();
    var offsetX = boundingRect.left;
    var offsetY = boundingRect.top;
    var w = (boundingRect.width-canvas.width)/2;
    var h = (boundingRect.height-canvas.height)/2;
    offsetX += w;
    offsetY += h;
    // use clientX and clientY as getBoundingClientRect is used above
    var mx = Math.round(evt.clientX-offsetX);
    var my = Math.round(evt.clientY-offsetY);
    return {x: mx, y: my}; // return as an object
}

function getMouseXYMM(evt) {
    var canvas = document.getElementById('gameAreaMobileMedium');
    var boundingRect = canvas.getBoundingClientRect();
    var offsetX = boundingRect.left;
    var offsetY = boundingRect.top;
    var w = (boundingRect.width-canvas.width)/2;
    var h = (boundingRect.height-canvas.height)/2;
    offsetX += w;
    offsetY += h;
    // use clientX and clientY as getBoundingClientRect is used above
    var mx = Math.round(evt.clientX-offsetX);
    var my = Math.round(evt.clientY-offsetY);
    return {x: mx, y: my}; // return as an object
}

function getMouseXYMS(evt) {
    var canvas = document.getElementById('gameAreaMobileSmall');
    var boundingRect = canvas.getBoundingClientRect();
    var offsetX = boundingRect.left;
    var offsetY = boundingRect.top;
    var w = (boundingRect.width-canvas.width)/2;
    var h = (boundingRect.height-canvas.height)/2;
    offsetX += w;
    offsetY += h;
    // use clientX and clientY as getBoundingClientRect is used above
    var mx = Math.round(evt.clientX-offsetX);
    var my = Math.round(evt.clientY-offsetY);
    return {x: mx, y: my}; // return as an object
}

/*
checkContainer is a short function that simply take the x and y co-ordinates of the mouse click, as well as 
the dimensions of the first box (i.e. the correct image), and one of the 3 boxes as the 4 parameters.
Using these parameters, the function checks the position of the click and the position of each box, returning 
two booleans after each mouse event - 'box_click', and 'correct'

'box_click' is the boolean that establishes if any of the 3 box have been selected, while 'correct' will 
allow the program to figure out if the correct box has been selected. This is an important distinction as 
the game is required to loop after each box click, not only after each correct box click, while the score 
should only change after each correct box click. Thus, two booleans was necessary here.
*/


function checkContainer(x, y, box1, box) {
    var box_click = false;
    correct = false
    if ((x>=box.x)
    && (x<=box.x+box.w)
    && (y>=box.y)
    && (y<=box.y+box.h)){
        box_click = true;
        if (box.x == box1.x && box.y == box1.y){
            console.log("Correct box");
            correct = true;
        }
        else{
            console.log("Incorrect box");
            correct = false;
        }
    }
    return{box_click, correct};
}



/*
The if statements below determine which of the 3 sets of functions to run through - either desktop, mobile medium (for tablets), or mobile small (for phones). 

In addition, they establish which of the 3 button to create the event for, and which canvas is correct.
*/

if (window.matchMedia("(min-width: 800px)").matches) {
    var buttonElement = document.getElementById('startButtonDesktop');
    console.log(buttonElement);
    buttonElement.addEventListener('click', AskNameDesktop, false);

    var canvas = document.getElementById('gameAreaDesktop');
    console.log(canvas);
    
    var context = canvas.getContext('2d');
}

else if (window.matchMedia("(max-width: 799px)").matches && (window.matchMedia("(min-width: 500px)").matches)){
    var buttonElement = document.getElementById('startButtonMobileMedium');
    console.log(buttonElement);
    buttonElement.addEventListener('click', AskNameMobileM, false);

    var canvas = document.getElementById('gameAreaMobileMedium');
    console.log(canvas);
    
    var context = canvas.getContext('2d');
}

else if (window.matchMedia("(max-width: 499px)").matches){
    var buttonElement = document.getElementById('startButtonMobileSmall');
    console.log(buttonElement);
    buttonElement.addEventListener('click', AskNameMobileS, false);

    var canvas = document.getElementById('gameAreaMobileSmall');
    console.log(canvas);
    
    var context = canvas.getContext('2d');
}

const WIDTH = canvas.width; // assumes width and height are fixed
const HEIGHT = canvas.height;

var score = 0;
var loop = 0;
