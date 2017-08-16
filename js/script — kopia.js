var balls = [];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var upPressed = false;
var downPressed = false;
var wPressed = false;
var sPressed = false;
document.addEventListener("keyup", keyUp, false);
document.addEventListener("keydown", keyDown, false);
var player1_position = {
	x: 20,
	y: canvas.height/2+100,
	dy: 3
};

var player2_position = {
	x: canvas.width+460,
	y: canvas.height/2+100,
	dy: 3
};

var gameArea = {
	clear: function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},
	start: function(){
		canvas.width = 800;
		canvas.height = 500;
		setInterval(move,10);
	}
}




	
function keyDown(e){
	if (e.keyCode == 38){
		upPressed = true;
	} else if (e.keyCode == 40){
		downPressed = true;
	} else if (e.keyCode == 87){
		wPressed = true;
	} else if (e.keyCode == 83){
		sPressed = true;
	} 
}

function keyUp(e){
	if (e.keyCode == 38){
		upPressed = false;
	} else if (e.keyCode == 40){
		downPressed = false;
	} else if (e.keyCode == 87){
		wPressed = false;
	} else if (e.keyCode == 83){
		sPressed = false;
	}
}


function player_move(){
	if (upPressed){
		player1_position.y -= player1_position.dy;
	} else if(downPressed){
		player1_position.y += player1_position.dy;
	} else if (wPressed) {
		player2_position.y -= player2_position.dy;
	} else if (sPressed) {
		player2_position.y += player2_position.dy;
	}
}

function player_out(){
	if (player1_position.y < 0){
		player1_position.y = 0;
	} else if (player1_position.y > 400){
		player1_position.y = 400;
	} else if (player2_position.y < 0){
		player2_position.y = 0;
	} else if (player2_position.y > 400){
		player2_position.y = 400;
	}
}

function randomColor() {
  		var letters = '0123456789ABCDEF';
  		var color = '#';
  		for (var i = 0; i < 6; i++) {
    	color += letters[Math.floor(Math.random() * 16)];
  		}
  		return color;
};

function player1(){
	ctx.beginPath();
	ctx.rect(player1_position.x,player1_position.y,20,100);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function player2(){
	ctx.beginPath();
	ctx.rect(player2_position.x,player2_position.y,20,100);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}



function newBall(x,y,dx,dy) {
	var color = randomColor();
	this.dx = dx;
	this.dy = dy;
	this.x = x;
	this.y = y;
	var ball_img = document.getElementById("ball");
	ctx.drawImage(ball_img, x, y, 30, 30);
    this.updates = function(){
    ctx.drawImage(ball_img, this.x, this.y, 30, 30);
    }

}

function createBalls(){
	var x = (canvas.width) - Math.floor(Math.random()*400+50);
	var y = (canvas.height) - Math.floor(Math.random()*400+50);
	var dx = Math.floor(Math.random()*3+1);
	var dy = Math.floor(Math.random()*3+1);
	balls.push(new newBall(x,y,dx,dy));
	
}

function move(){
	player_move();
	wallCollision();
	playerCollision();
	gameArea.clear();
	player1();
	player2();
	player_out();
	for (var i = 0; i < balls.length; i++){
		balls[i].x += balls[i].dx;
		balls[i].y += balls[i].dy;
		balls[i].updates();
	}
}

function wallCollision(){
	for (var i = 0; i<balls.length; i++){
		if(balls[i].x > canvas.width - 30 || balls[i].x < 0){
			balls[i].dx = -balls[i].dx;
		} else if (balls[i].y > canvas.height -30 || balls[i].y < 0){
			balls[i].dy = -balls[i].dy;
		}
	}
}

function playerCollision() {
	for (var i = 0; i < balls.length; i++){
		if(balls[i].x < player1_position.x+40){
			console.log(player1_position.y+100 - balls[i].y)
		if(player1_position.y+100 - balls[i].y < 150){
			balls[i].dx = -balls[i].dx;
		}
	}
	}
}

function deleteBall(){
	balls.pop();
	console.log(balls);
}

gameArea.start();
