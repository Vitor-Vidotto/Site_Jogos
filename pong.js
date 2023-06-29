// Define os elementos da tela do pong
const canvas = document.getElementById("pong");
const ctx = canvas.getContext('2d');

// Define os sons
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
comScore.src = "sounds/comScore.mp3";
userScore.src = "sounds/userScore.mp3";

// Cria a Bola
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}

// Cria a barra do player
const user = {
    x : 0, 
    y : (canvas.height - 100)/2, 
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// Cria a barra do bot
const com = {
    x : canvas.width - 10,
    y : (canvas.height - 100)/2, 
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// Cria a área do jogo
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}

// Cria o objeto retangular, que será usado como as barras
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// Cria a bola, que será usada como bola
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// Estabelece os controles
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    user.y = evt.clientY - rect.top - user.height/2;
}

// Resetar a posição da bola
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

// Cria os limites da área do jogo
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// Cria o texto
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

// Cria colisão
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// Função para que o jogo tenha placar
function update(){
    
    if( ball.x - ball.radius < 0 ){
        com.score++;
        comScore.play();
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        userScore.play();
        resetBall();
    }
    
    // Velocidade da bola
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // Computador controla, o criador disse que era possivel vencer, não consegui marcar um ponto, boa sorte
    com.y += ((ball.y - (com.y + com.height/2)))*0.1;
    
    // Cria colisão co os limites (paredes do jogo)
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        wall.play();
    }
    
    // Detecta quem tocou na bola (o bot ou o player)
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;
    
    // Gera a consequencia de colisão para a bola
    if(collision(ball,player)){
        hit.play();
        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint / (player.height/2);
        
        let angleRad = (Math.PI/4) * collidePoint;
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);

        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        ball.speed += 0.1;
    }
}

// Função para gerar todos os objetos ao mesmo tempo
function render(){
    
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    
    drawText(user.score,canvas.width/4,canvas.height/5);

    drawText(com.score,3*canvas.width/4,canvas.height/5);

    drawNet();

    drawRect(user.x, user.y, user.width, user.height, user.color);

    drawRect(com.x, com.y, com.width, com.height, com.color);

    drawArc(ball.x, ball.y, ball.radius, ball.color);
}
function game(){
    update();
    render();
}

let framePerSecond = 50;

//cria o loop do jogo
let loop = setInterval(game,1000/framePerSecond);

