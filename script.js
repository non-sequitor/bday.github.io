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
ball.src='https://lh3.googleusercontent.com/-r-sSCNf8H4c/X3BlET8OX9I/AAAAAAAABko/r0lQw6ENn_4IC0ztKEulUAeaP4gzvxwRwCK8BGAsYHg/s384/2020-09-27.png';

var paddle=new Image();
paddle.src='https://lh3.googleusercontent.com/-WEp3h_hbvTo/X0j-o3zQlVI/AAAAAAAADBc/wb2QgbBTGCMYp-iHun_cpCNHgvI792K_QCK8BGAsYHg/s512/2020-08-28.jpg';

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
