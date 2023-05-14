var canvas=document.getElementById("myCanvas");
var ctx	  = canvas.getContext('2d');
ctx.fillStyle="#000000";
ctx.fillRect(0,0,canvas.width,canvas.height);

var x=(canvas.width/4)+ Math.floor(Math.random()*81)-10;
var y=(canvas.height-150)+Math.floor(Math.random()*81)-10;
var dx=+2;
var dy=-2;
var ballRadius=50;
var paddleHeight=10;
var paddleWidth=150;
var paddleX= (canvas.width-paddleWidth)/2
var rightPressed=false;
var leftPressed=false;
var brickColumnCount=6;
var brickRowCount=4;
var brickHeight=20;
var brickWidth=75;
var brickPadding=10;
var brickOffsetLeft=60;
var brickOffsetTop=30;
var score=0;
var bear_lives=1;
var paused=false;

var ball=new Image();
ball.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1VqP84lewlq8kjkIpNoj5IHp8nlek0BUmg&usqp=CAU';

var paddle=new Image();
paddle.src='data:image/jpeg;base64,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';

var face=new Image();
face.src='https://lh3.googleusercontent.com/-zY59bOEdVIQ/X3BtJPSYJJI/AAAAAAAABl4/8RK02Dl2JhoYoHRU30ZFz1wpC_OPkfHeQCK8BGAsYHg/s126/face.jpg';

var sad_bear=new Image();
sad_bear.src='https://media.tenor.com/images/815eb7a53786b88c6ef2e838f98d8075/tenor.gif';

var still_waiting=new Image();
still_waiting.src='https://ih1.redbubble.net/image.552312101.6479/flat,750x1000,075,f.u3.jpg';

var end1=new Image();
end1.src='https://media.tenor.com/images/74835a48b66d7d9ac8112b0e11e1151b/tenor.gif';

var end2=new Image();
end2.src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4O_oDGrqZ-MCD4z3meVuAYQazVCySyWTXOQ&usqp=CAU';


var bricks=[];
for (var c=0;c<brickColumnCount;c++){
	bricks[c]=[];
	for (var r=0; r<brickRowCount; r++){
		bricks[c][r]={x:0,y:0, status:1};
	}
}

document.addEventListener("keyup",keyUpHandler);
document.addEventListener("keydown",keyDownHandler);

function drawBricks(){
	for (var c=0; c<brickColumnCount; c++){
		for (var r=0; r<brickRowCount; r++){
			if(bricks[c][r].status==1){
				var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
			
				bricks[c][r].x=brickX;
				bricks[c][r].y=brickY;
			
				ctx.beginPath();
				ctx.rect(brickX,brickY,brickWidth,brickHeight);
				ctx.fillStyle="white";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}


function keyDownHandler(e){
	if (e.keyCode==39){
		rightPressed=true;
	}
	else if(e.keyCode==37){
		leftPressed=true;
	}	
}

function keyUpHandler(e){
	if (e.keyCode==39){
		rightPressed=false;
	}
	else if(e.keyCode==37){
		leftPressed=false;
	}
}

function drawBall(){
	ctx.drawImage(ball, x,y,ballRadius, ballRadius);
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle="Red";
	ctx.fill();
	ctx.closePath();
}

function collisionDetection(){
	for( var c=0; c<brickColumnCount;c++){
		for(var r=0;r<brickRowCount;r++){
			var b= bricks[c][r];
			if(b.status==1){
				if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
					dy=-dy;
					b.status=0;
					score++;
					if(score==brickColumnCount*brickRowCount){
							
						paused=true;
						ctx.clearRect(0,0,canvas.width,canvas.height);
						
						ctx.font="16px Arial";
						ctx.fillStyle="#FFFFFF";
						ctx.fillText("Bear you did it! ",150,100);
						ctx.drawImage(still_waiting,150,150);
						
						
					}
				}
			}
		}
	}
}

function textForBear(){
	ctx.beginPath();
	ctx.font="16px Arial";
	ctx.fillStyle=("#0095DD",1);
	ctx.drawImage(face,14,40,35,35);
	ctx.fillText(score,8,20);
	ctx.fill();
	ctx.closePath();
}

function bearLives(){
	ctx.font="16x Arial";
	ctx.fillStyle="Yellow";
	ctx.fillText("Bear_Lives: "+bear_lives, canvas.width-105, 20);
}

function move(){
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	textForBear();
	bearLives();
	collisionDetection();	
	
	if(y+dy<0+ballRadius){
		dy=-(dy);
	}
	
	else if(y+dy>canvas.height-ballRadius){

		if(x>paddleX-10 && x<paddleX+paddleWidth+10){
			dy=-dy;
		
		}
		else{
			bear_lives=bear_lives-1;
			if (!bear_lives){
				
				
				paused=true;
				
				ctx.clearRect(0,0,canvas.width,canvas.height);
				
				ctx.fillStyle='#000000';
				ctx.font='25pt Ariel';
				ctx.fillText("You..didn't ...make ...it", canvas.width/3,canvas.height/3);
				ctx.fillStyle='#0000ff';
				ctx.drawImage(sad_bear,250,200);
				
				br=0;
						while(True){
							br+=1;
							if(br==30){
								ctx.drawImage(still_waiting,200,200,500,500);
							}
						}
				
				
				
				
				
				
			}
			else{
				x=(canvas.width/2)+Math.floor(Math.random()*81)-10;
				y=(canvas.height-30)+Math.floor(Math.random()*81)-10;
				dx=2;
				dy=-2;
				paddleX= (canvas.width-paddleWidth)/2;
			}
		}
	}

	if(x+dx<0+ballRadius || x+dx>canvas.width-ballRadius ){
		dx=-(dx);
	}

	if (rightPressed && paddleX<canvas.width-paddleWidth){
		paddleX+=4;
	}

	else if(leftPressed && paddleX>0){
		paddleX-=4;
	}
	
	
	
	x+=dx;
	y+=dy;
	
	if (score==10){
		paused=true;
		
		ctx.fillStyle='#000000';
		ctx.font='16px Ariel';
		ctx.fillText("That's seriously boring -_-",250,300);
		
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		ctx.font='20pt Helvetica';
		ctx.fillStyle='#000000';
		ctx.fillText("Happy Birthdate, Bear",150,100);
		ctx.drawImage(end2,200,250);
	}
	
	if (!paused){
		requestAnimationFrame(move);
	}
}

document.addEventListener("mousemove",mouseMoveHandler,false);

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > 0 && relativeX < canvas.width){
		paddleX=relativeX - paddleWidth/2;
	}
}	

move();
