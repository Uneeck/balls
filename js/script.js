var balls = [];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gameArea = {
	clear: function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},
	start: function(){
		canvas.width = 600;
		canvas.height = 600;
		setInterval(move,10);
	}
}

function newBall(x,y,dx,dy) {
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
	wallCollision();
	gameArea.clear();
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

function deleteBall(){
	balls.pop();
}

gameArea.start();
