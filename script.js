const box = document.getElementById('box');
const foodBiteSound = new Audio("bite.mp3");
const hit = new Audio("hit.mp3");
let gameOver = document.getElementById('game-over');
const gameOverSound = new Audio("gameover.mp3");
const gameMusic = new Audio("music.mp3");
const snakeVoice = new Audio("snakeVOice.mp3");

let snakeArr =[{x:10 , y:10}];
let position = 'right';
const lower = 2 ;
const upper = 18;
var head ;
var p ;
var q ;
var t ;
let score = 0 ;
function drawSnake()
{
        snakeVoice.play();
        box.innerHTML = "" ;
        snakeArr.forEach((element) => {
        let snakeElement = document.createElement('div');
        snakeElement.classList.add('snake');
        box.appendChild(snakeElement);
        snakeElement.style.gridRow = element.y;
        snakeElement.style.gridColumn = element.x;
    });
    drawFood();
   
}

function drawFood()
{ 
    gameMusic.play();
    let foodElement = document.createElement('div');
    foodElement.classList.add('food');
    box.appendChild(foodElement);
    foodElement.style.gridRow = q;
    foodElement.style.gridColumn = p;
    
}


function moving()
{
     head = {...snakeArr[0]};

    if(position == 'right')
    {
        head.x++ ;
    }
    else if(position == 'left')
    {
        head.x--;
    }
    else if(position == 'up')
    {
        head.y--;
    }
    else if(position == 'down')
    {
        head.y++ ;
    }
    snakeArr.unshift(head);
    
    if((head.x == p) && (head.y == q))
    {
        
        foodBiteSound.play();
        p =  parseInt(lower + ((upper-lower)*Math.random()));
        q   = parseInt(lower + ((upper-lower)*Math.random()));
        score++;
        document.getElementById('score').innerHTML = "SCORE : "+score;
    }
    else{
        snakeArr.pop();
    }
    
}

function colide()
{
    snakeVoice.pause();
    gameMusic.pause();
    hit.play();
    gameOverSound.play();   
    clearInterval(t);
    gameOver.innerHTML = "GAME OVER";
    gameOver.classList.add('game-over');
    box.innerHTML = "" ;
    snakeArr =[{x:10 , y:10}];
    position = 'right';
    score = 0 ;
    document.getElementById('score').innerHTML = "SCORE : "+score;
}

function collision()
{
    if(((head.x < 0)||(head.x)>20) ||((head.y < 0)||(head.y)>20))
    {
       colide();
    }
    snakeArr.forEach((element) => {
        if((head.x == element.x) && (head.y == element.y) && element != snakeArr[0] )
        {
            colide();
        }
    });
    
}

document.addEventListener("keydown" ,event=>{
    if((event.keyCode == 37 || event.key == "a") && position!= 'right')
    {
        position = 'left' ;
    }
    else if((event.keyCode == 38 || event.key == 'w' ) && position != 'down')
    {
        position = 'up';
    }
    else if((event.keyCode == 39 || event.key == 'd' ) && position != 'left')
    {
        position = 'right' ;
    }
    else if((event.keyCode == 40 || event.key == 's' ) && position!= 'up')
    {
        position = 'down' ;
    }
})

function hitonwall()
{
    hit.play();
}
p =  parseInt(lower + ((upper-lower)*Math.random()));
q   = parseInt(lower + ((upper-lower)*Math.random()));

     function start()
     {
        gameMusic.play();
        gameOver.classList.remove('game-over');
        gameOver.innerHTML = "";
       t = setInterval(event =>{
             moving();
             drawSnake();
             collision();
         },200);
     }

     