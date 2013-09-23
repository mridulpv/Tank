// inner variables
// http://games.sify.com/casual-games/arcade-35-71/battle-city-1208-71/play.html
var canvas, context; // canvas and context objects
var imgBrick, imgSteel, imgWater, imgForest, imgTank1,imgTank2,imgBullet,imgLife1,imgLife2; // images
var aMap; // map array
var oTank1; // tank object
var oTank2;
var oBullet1;
var oBullet2;

var iCellSize = 16; // cell wide
var iXCnt = 39; // amount of X cells
var iYCnt = 39; // amount of Y cells
var GameOver=false;

// objects :
function Tank1(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.i = 0;
    this.image = image;
}
function Tank2(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.i = 0;
    this.image = image;
}
function Bullet(x, y,w,h,image,lock,fire,dir) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.i = 0;
    this.image = image;
    this.lock=false;
    this.dir=0;
    this.fire=setInterval(function(){},1000);
}

// functions
function clear() { // clear canvas function
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawScene() { // main drawScene function
    clear(); // clear canvas

    // fill background
    context.fillStyle = '#111';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // save current context
    context.save();
	// draw tank
    context.drawImage(oTank1.image, oTank1.i*oTank1.w, 0, oTank1.w, oTank1.h, oTank1.x, oTank1.y, oTank1.w, oTank1.h);
	context.drawImage(oTank2.image, oTank2.i*oTank2.w, 0, oTank2.w, oTank2.h, oTank2.x, oTank2.y, oTank2.w, oTank2.h);
    // walk through our array
    for (var y = 0; y < iYCnt; y++) { 
        for (var x = 0; x < iXCnt; x++) {
            switch (aMap[y][x]) {
                case 0: // skip
                    break;
                case 1: // draw brick block
                    context.drawImage(imgBrick, 0, 0, iCellSize, iCellSize, x*iCellSize, y*iCellSize, iCellSize, iCellSize);
                    break;
                case 2: // draw steel block
                    context.drawImage(imgSteel, 0, 0, iCellSize, iCellSize, x*iCellSize, y*iCellSize, iCellSize, iCellSize);
                    break;
                case 3: // draw forest block
                    context.drawImage(imgForest, 0, 0, iCellSize, iCellSize, x*iCellSize, y*iCellSize, iCellSize, iCellSize);
                    break;
                case 4: // draw water block
                    context.drawImage(imgWater, 0, 0, iCellSize, iCellSize, x*iCellSize, y*iCellSize, iCellSize, iCellSize);
                    break;
                
            }
        }
    }

    // restore current context
    context.restore();
	//draw Life
	context.drawImage(imgLife1, 0, 0, 48, 48, 18.5*iCellSize, 0*iCellSize, 48, 48);
	context.drawImage(imgLife2, 0, 0, 48, 48, 18.5*iCellSize, 36*iCellSize, 48, 48);
    
	//draw bullet
	context.drawImage(oBullet1.image,oBullet1.i*oBullet1.w, 0, oBullet1.w, oBullet1.h, oBullet1.x, oBullet1.y, oBullet1.w, oBullet1.h);
	context.drawImage(oBullet2.image,oBullet2.i*oBullet2.w, 0, oBullet2.w, oBullet2.h, oBullet2.x, oBullet2.y, oBullet2.w, oBullet2.h);
}
// -------------------------------------------------------------

// initialization
$(function(){
    canvas = document.getElementById('scene');
    canvas.width  = iXCnt * iCellSize;
    canvas.height = iYCnt * iCellSize;
    context = canvas.getContext('2d');

    // main scene Map array
    aMap = ([
      [3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 0, 2, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 0, 2, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 0, 2, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 3, 3, 3, 3, 3, 1, 1, 1, 0, 0, 0, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [3, 3, 3, 3, 3, 3, 1, 1, 1, 0, 0, 0, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [3, 3, 3, 3, 3, 3, 1, 1, 1, 0, 0, 0, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0],
    ]);

    // load images
    imgBrick = new Image();
    imgBrick.src = 'images/brick.png';
   
    imgSteel = new Image();
    imgSteel.src = 'images/steel.png';
   
    imgWater = new Image();
    imgWater.src = 'images/water.png';
   
    imgForest = new Image();
    imgForest.src = 'images/forest.png';
    
    imgLife1 = new Image();
    imgLife1.src = 'images/life1.png';
    
    imgLife2 = new Image();
    imgLife2.src = 'images/life1.png';

    imgTank1 = new Image();
    imgTank1.src = 'images/tank1.png';
    oTank1 = new Tank1(iCellSize*0, iCellSize*36, 48, 48, imgTank1);
    
    imgTank2 = new Image();
    imgTank2.src = 'images/tank2.png';
    oTank2 = new Tank2(iCellSize*23, iCellSize*0, 48, 48, imgTank2);

	imgBullet = new Image();
    imgBullet.src = 'images/bullet.png';
    oBullet1 = new Bullet(iCellSize*-1, iCellSize*37,iCellSize,iCellSize, imgBullet);
    oBullet2 = new Bullet(iCellSize*-1, iCellSize*37,iCellSize,iCellSize, imgBullet);
    
    $(window).keydown(function(event){ 
    	
    	// keyboard alerts
    	
    	if(event.keyCode > 0 && GameOver) return false;
    	// function to stop movement of bullet
    	function stop(oBullet)
    		{
    			oBullet.lock=false;
				oBullet.y =700;
				oBullet.x =700;
				clearInterval(oBullet.fire);
    		 }
		// function to set game over
		function gameover(x)
			{
			GameOver=true;
			if(x==1)
				alert("Player2 Win");
			else
				alert("Player1 Win");
			
			}
		// function to check collision of bullet over
		// life or tank of oponent	
		function kill(oBullet)
			{
			//colletion between bullet1 and tank2
			if(oBullet.y>=oTank2.y && oBullet.y<oTank2.y+48 && oBullet.x>=oTank2.x && oBullet.x<oTank2.x+48)
					{
		    	    imgTank2.src = 'images/tankburn.png';
					stop(oBullet);
					gameover(2);
					}
				
				
			else
				{
				//colletion between bullet2 and tank1
				if(oBullet.y>=oTank1.y && oBullet.y<oTank1.y+48 && oBullet.x>=oTank1.x && oBullet.x<oTank1.x+48)
					{
				    imgTank1.src = 'images/tankburn.png';
					stop(oBullet);
					gameover(1);
					}
				}
			//colletion between life1 and bullet
			if(oBullet.y>=36*iCellSize && oBullet.y<=36*iCellSize+48 && oBullet.x>=18.5*iCellSize && oBullet.x<=18.5*iCellSize+48)
					{
				    imgLife2.src = 'images/die.png';
					stop(oBullet);
					gameover(1);
					}
			//colletion between life2 and bullet
			if(oBullet.y>=0 && oBullet.y<=48 && oBullet.x>=18.5*iCellSize && oBullet.x<=18.5*iCellSize+48)
					{
		    	    imgLife1.src = 'images/die.png';
					stop(oBullet);
					gameover(2);
					}
			
			}
		function bulletmove(oTank,oBullet)
		    	{
				if(!oBullet.lock)
					{
					oBullet.lock=true;
					 	oBullet.dir=oTank.i;
					 	//up
						if(oBullet.dir==2)
					 		{
						 	oBullet.x = oTank.x+iCellSize;
						    oBullet.y = oTank.y;
					 		}
					 	//right
					 	if(oBullet.dir==0)
					 		{
						 	oBullet.x = oTank.x+iCellSize*2;
						    oBullet.y = oTank.y+iCellSize;
					 		}
					 	//left
					 	if(oBullet.dir==1)
					 		{
						 	oBullet.x = oTank.x;
						    oBullet.y = oTank.y+iCellSize;
					 		}
					 	//down
					 	if(oBullet.dir==3)
					 		{
						 	oBullet.x = oTank.x+iCellSize;
						    oBullet.y = oTank.y+iCellSize*2;
					 		}
				        
						interval=50;
						oBullet.dir=oTank.i;
						//var fire = oBullet.fire;
						oBullet.fire =setInterval(function()
							{
					        // checking collisions
					        //c=fire;
					        var iCurCelX = oBullet.x /iCellSize;
				       		var iCurCelY = oBullet.y/iCellSize;
					        if(oBullet.dir==0)
							    {
							    if(iCurCelX < iXCnt)
							    	{
									var iTest = aMap[iCurCelY][iCurCelX];
	
									if (iTest == 0 || iTest == 3 || iTest == 4) 
									   	{
								    	oBullet.x +=iCellSize;
								    	kill(oBullet);
								    	if(aMap[iCurCelY][iCurCelX+1] == 1)
								    		{
								    		rem = Math.floor(iCurCelY/3);
								    		aMap[rem*3][iCurCelX+1]=0;
								    		aMap[rem*3+1][iCurCelX+1]=0;
								    		aMap[rem*3+2][iCurCelX+1]=0;
								    		
								    		stop(oBullet);
								    		}
								    	else if(aMap[iCurCelY][iCurCelX+1] == 2)
								    		stop(oBullet);
								    	
									   	
								    	}
								    else
								    	{
								    //	if (iTest1 == 1 && iTest2 == 1) {
								    	//aMap[iCurCelY-1][iCurCelX]=0;
								    	//}
								    	stop(oBullet);
								    	}
								    }
								else
									stop(oBullet);
								drawScene();
						    	
						   	 	}
						   	 else if(oBullet.dir==1)
							    {
							    var iTest = aMap[iCurCelY][iCurCelX-1];
	
							    if (iTest == 0 || iTest == 3 || iTest == 4 || iTest==1 ) 
							       	{
						        	oBullet.x -=iCellSize;
						        	kill(oBullet);
						        	if(aMap[iCurCelY][iCurCelX-1] == 1)
						        		{
						        		rem = Math.floor(iCurCelY/3);
						        		aMap[rem*3][iCurCelX-1]=0;
						        		aMap[rem*3+1][iCurCelX-1]=0;
						        		aMap[rem*3+2][iCurCelX-1]=0;
						        		stop(oBullet)
						        		}
							    	if(oBullet.x<=-1)
							    		{
							    		stop(oBullet);
							    		}
							       	drawScene();
						        	}
						        else
						        	{
						        //	if (iTest1 == 1 && iTest2 == 1) {
						        	//aMap[iCurCelY-1][iCurCelX]=0;
						        	//}
						        	stop(oBullet);
						        	}
						    	
						   	 }
						   	 else if(oBullet.dir==2)
							    {
							   if (iCurCelY) 
									{
				           			var iTest = aMap[iCurCelY-1][iCurCelX];
	
									if (iTest == 0 || iTest == 3 || iTest == 4 || iTest==1) 
									   	{
								    	oBullet.y -=iCellSize;
								    	kill(oBullet);
								    	if(aMap[iCurCelY-1][iCurCelX] == 1)
								    		{
								    		rem = Math.floor(iCurCelX/3);
								    		aMap[iCurCelY-1][rem*3]=0;
								    		aMap[iCurCelY-1][rem*3+1]=0;
								    		aMap[iCurCelY-1][rem*3+2]=0;
								    		stop(oBullet);
								    		}
								    	
								    	}
								    else
								    	{
								    //	if (iTest1 == 1 && iTest2 == 1) {
								    	//aMap[iCurCelY-1][iCurCelX]=0;
								    	//}
								    	stop(oBullet);
								    	}
								    }
								  else
								    {
								    stop(oBullet);
								    }
								  drawScene();
						    	
						   	 	}
						   	  else if(oBullet.dir==3)
							    {
							    if (iCurCelY < iYCnt) 
									{
				           			var iTest = aMap[iCurCelY][iCurCelX];
	
									if (iTest == 0 || iTest == 3 || iTest == 4) 
									   	{
								    	oBullet.y +=iCellSize;
								    	kill(oBullet);
								    	if(aMap[iCurCelY+1][iCurCelX]==1)
								    		{
								    		rem = Math.floor(iCurCelX/3);
								    		aMap[iCurCelY+1][rem*3]=0;
								    		aMap[iCurCelY+1][rem*3+1]=0;
								    		aMap[iCurCelY+1][rem*3+2]=0;
								    		stop(oBullet)
								    		}
								    	else if(aMap[iCurCelY+1][iCurCelX] == 2)
								    		stop(oBullet);
								    	}
								    else
								    	{
								    //	if (iTest1 == 1 && iTest2 == 1) {
								    	//aMap[iCurCelY-1][iCurCelX]=0;
								    	//}
								    	stop(oBullet);
								    	}
								    }
								  else
								    {
								    stop(oBullet);
								    }
								  drawScene();
						    	
						   	 	}
				        },interval);
					}	 	
		         }
              
        switch (event.keyCode) {
        	
        	 case 16: // x Bullet for tank1
        	 	bulletmove(oTank1,oBullet1);
                break;
             case 32: // x Bullet for tank2
        	 	bulletmove(oTank2,oBullet2);
                break;
        	
            case 38: // Up key
                oTank1.i = 2;
				
                // checking collisions
                var iCurCelX = (3 * oTank1.x) / 48;
                var iCurCelY = (3 * oTank1.y) / 48;
                if (iCurCelY) 
                	{
                    var iTest1 = aMap[iCurCelY-1][iCurCelX];
                    var iTest2 = aMap[iCurCelY-1][iCurCelX+1];
                    var iTest3 = aMap[iCurCelY-1][iCurCelX+2];

                    if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3) && (iTest3 == 0 || iTest3 == 3)) {
                        oTank1.y-=iCellSize;
                        if (oTank1.y < 0) 
                        	{
                            oTank1.y = 0;
                        }
                    }
               		 }
                break;
            case 40: // Down key
                oTank1.i = 3;

                // checking collisions
                var iCurCelX = (3 * oTank1.x) / 48;
                var iCurCelY = (3 * oTank1.y) / 48;
                if (iCurCelY+2 < iYCnt) {
                    var iTest1 = aMap[iCurCelY+3][iCurCelX];
                    var iTest2 = aMap[iCurCelY+3][iCurCelX+1];
                    var iTest3 = aMap[iCurCelY+3][iCurCelX+2];

                    if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3) && (iTest3 == 0 || iTest3 == 3)) {
                        oTank1.y+=iCellSize;
                        if (oTank1.y > 576) { //iCellSize * (iYCnt-2)
                            oTank1.y = 576;
                        }
                    }
                }
                break;
            case 37: // Left key
                oTank1.i = 1;

                // checking collisions
                var iCurCelX = (3 * oTank1.x) / 48;
                var iCurCelY = (3 * oTank1.y) / 48;
                var iTest1 = aMap[iCurCelY][iCurCelX-1];
                var iTest2 = aMap[iCurCelY+1][iCurCelX-1];
                var iTest3 = aMap[iCurCelY+2][iCurCelX-1];

                if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3) && (iTest3 == 0 || iTest3 == 3)) {
                    oTank1.x-=iCellSize;
                    if (oTank1.x < 0) {
                        oTank1.x = 0;
                    }
                }
                break;
            case 39: // Right key
                oTank1.i = 0;

                // checking collisions
                var iCurCelX = (3 * oTank1.x) / 48;
                var iCurCelY = (3 * oTank1.y) / 48;
                var iTest1 = aMap[iCurCelY][iCurCelX+3];
                var iTest2 = aMap[iCurCelY+1][iCurCelX+3];
                var iTest3 = aMap[iCurCelY+2][iCurCelX+3];

                if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3) && (iTest3 == 0 || iTest3 == 3)) {
                    oTank1.x+=iCellSize;
                    if (oTank1.x > 576) { //iCellSize * (iXCnt-2)
                        oTank1.x = 576;
                    }
                }
                break;
             case 87: // Up key
                oTank2.i = 2;

                // checking collisions
                var iCurCelX = (3 * oTank2.x) / 48;
                var iCurCelY = (3 * oTank2.y) / 48;
                if (iCurCelY) {
                    var iTest1 = aMap[iCurCelY-1][iCurCelX];
                    var iTest2 = aMap[iCurCelY-1][iCurCelX+1];
                    var iTest3 = aMap[iCurCelY-1][iCurCelX+2];

                    if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3) && (iTest3 == 0 || iTest3 == 3)) {
                        oTank2.y-=iCellSize;
                        if (oTank2.y < 0) {
                            oTank2.y = 0;
                        }
                    }
                }
                break;
            case 83: // Down key
                oTank2.i = 3;

                // checking collisions
                var iCurCelX = (3 * oTank2.x) / 48;
                var iCurCelY = (3 * oTank2.y) / 48;
                if (iCurCelY+2 < iYCnt) {
                    var iTest1 = aMap[iCurCelY+3][iCurCelX];
                    var iTest2 = aMap[iCurCelY+3][iCurCelX+1];
                    var iTest3 = aMap[iCurCelY+3][iCurCelX+2];

                    if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3) && (iTest3 == 0 || iTest3 == 3)) {
                        oTank2.y+=iCellSize;
                        if (oTank2.y > 576) { //iCellSize * (iYCnt-2)
                            oTank2.y = 576;
                        }
                    }
                }
                break;
            case 65: // Left key
                oTank2.i = 1;

                // checking collisions
                var iCurCelX = (3 * oTank2.x) / 48;
                var iCurCelY = (3 * oTank2.y) / 48;
                var iTest1 = aMap[iCurCelY][iCurCelX-1];
                var iTest2 = aMap[iCurCelY+1][iCurCelX-1];
                var iTest3 = aMap[iCurCelY+2][iCurCelX-1];

                if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3) && (iTest3 == 0 || iTest3 == 3)) {
                    oTank2.x-=iCellSize;
                    if (oTank2.x < 0) {
                        oTank2.x = 0;
                    }
                }
                break;
            case 68: // Right key
                oTank2.i = 0;

                // checking collisions
                var iCurCelX = (3 * oTank2.x) / 48;
                var iCurCelY = (3 * oTank2.y) / 48;
                var iTest1 = aMap[iCurCelY][iCurCelX+3];
                var iTest2 = aMap[iCurCelY+1][iCurCelX+3];
                var iTest3 = aMap[iCurCelY+2][iCurCelX+3];

                if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3) && (iTest3 == 0 || iTest3 == 3)) {
                    oTank2.x+=iCellSize;
                    if (oTank2.x > 576) { //iCellSize * (iXCnt-2)
                        oTank2.x = 576;
                    }
                }
                break;
        }
    });

    setInterval(drawScene, 40); // loop drawScene
});
