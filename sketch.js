var END = 0;
var PLAY =1;
var gamestate = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FruitGroup, obstacleGroup;
var score;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  bg = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(windowWidth, windowHeight)
   
monkey = createSprite(100,height- 350 ,10 ,10);
monkey.addAnimation("running",monkey_running);
 monkey.scale = 0.1; 
  
ground = createSprite(100, 385, 1000, 10);
ground.visible  = false;
  console.log(monkey.y);
  
  score = 0;
  FruitGroup = new Group;
  obstacleGroup = new Group;
  
     
}


function draw() {
 background(bg);
  
  text("Score: "+ score, 500,50);     
  
   monkey.collide(ground);
 
  
if((touches.length > 0 || keyDown("SPACE")) &&monkey.y >= height-120) {
monkey.velocityY = -10;
touches = [];

  
if(gamestate === PLAY){
       if( keyDown("space") && monkey.y >= 100 ) {
        monkey.velocityY = -9;

       }
     
} 
else if(gamestate === END){
      

   
       ground.velocityX = 0;
       monkey.velocityY = 0
   
       obstacleGroup.setLifetimeEach(-1);
       FruitGroup.setLifetimeEach(-1);

       obstacleGroup.setVelocityXEach(0);
       FruitGroup.setVelocityXEach(0);
  
}
  
  if(obstacleGroup.isTouching(monkey)){
       gamestate = END;
       }
  
       if(FruitGroup.isTouching(monkey)){
          FruitGroup.destroyEach();
         score = score + 2
       }
  monkey.velocityY = monkey.velocityY + 0.5; 
  
  if(keyDown("R")) {
      reset();
    
    }
  
  banana();
  obstace();
  drawSprites(); 
}
 
 function obstace(){

  if(frameCount % 90=== 0){
     obstacles = createSprite(500, 350 ,10 ,10);
    obstacles.velocityX = -8
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.2;
    obstacles.lifetime = 300;
  obstacleGroup.add(obstacles);   

   obstacles.setCollider("circle",0,0,4);  
    obstacles.debug = false;
   }
  
}


function banana(){

  if (frameCount % 100 === 0){
      bana = createSprite(500 , 240, 10, 10);
    bana.velocityX = -7;
    bana.addImage(bananaImage);
    bana.scale= 0.1;
     FruitGroup.add(bana);
  }
  
  switch(score){
      
    case 10 : monkey.scale = 0.15 ;
      break;
    case 20 : monkey.scale = 0.18 ;
      break;
    case 30 : monkey.scale = 0.20 ;
      break;
      case 40 : monkey.scale = 0.24 ;
      break ;
      default: break ;
  }
  
  
 }

function reset(){
  gamstate = PLAY;
  obstacleGroup.destroyEach();
  FruitGroup.destroyEach();
    if(obstacleGroup.isTouching(monkey)){
       gamestate = END;
       }
  
       if(FruitGroup.isTouching(monkey)){
          FruitGroup.destroyEach();
         score = score + 2
       }
  monkey.velocityY = monkey.velocityY + 0.5; 
  
}
}