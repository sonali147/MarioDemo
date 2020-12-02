
var ground1, ground2;
var mario;
var block1, block2, block3, block1Sensor, block2Sensor, block3Sensor;
var turtle1, turtle1SensorLeft, turtle1SensorRight, turtle1SensorTop;
var edges;

var turtle1State = true;

function preload(){

}


function setup(){
  createCanvas(1000, 400);
  ground1= createSprite(300, 380, 600, 40);
  ground1.shapeColor = "brown";

  ground2= createSprite(840, 380, 320, 40);
  ground2.shapeColor = "brown";

  mario = createSprite(50, 50, 20, 30);
  mario.shapeColor = "red";

  
  block1 = createSprite(100, 280, 30, 30);
  block1.shapeColor = "green";
  mushroom1 = createSprite(130,280,30,30);
  mushroom1.shapeColor = "white";
  turtle1 = createSprite(130, 257, 15, 15);
  turtle1.velocityX = 4;
  turtle1.shapeColor = "purple";
  turtle1SensorLeft = createSprite(120, 257, 2, 15);
  turtle1SensorLeft.velocityX = 4;
  turtle1SensorRight = createSprite(140, 257, 2, 15);
  turtle1SensorRight.velocityX = 4;
  turtle1SensorTop = createSprite(130, 247, 17, 5);
  turtle1SensorTop.velocityX = 4;
  block2 = createSprite(130, 280, 30, 30);
  block2.shapeColor = "lightgreen";
  block3 = createSprite(160, 280, 30, 30);
  block3.shapeColor = "green";
  block1Sensor = createSprite(80, 255, 10, 20);
  block2Sensor = createSprite(130, 300, 30, 10);
  block3Sensor = createSprite(180, 255, 10, 20);
  
  edges = createEdgeSprites();
}


function draw(){
  background("cornflowerblue");

  //camera.position.x = mario.x;
  //camera.position.y = 300;
  //console.log(mario.velocityX);
  //console.log(mario.velocityY);

  if(keyDown("space") || keyDown("up")){
    mario.velocityY = -8;
  }
  
  if(keyDown("left")){
    mario.x = mario.x - 5;
  }
  if(keyDown("right")){
    mario.x = mario.x + 5;
  }

  mario.velocityY += 0.5;
  block2.velocityY += 0.5;

  if(mario.isTouching(block2) && mario.isTouching(block2Sensor)){
    block2.velocityY = -5;
    mushroom1.velocityY = -1;
  }

  if(mushroom1.y <= 250 ){
    mushroom1.velocityY = 0;
  }

  if(mario.isTouching(mushroom1) && mushroom1.y === 250){
    mushroom1.destroy();
    mario.scale = 1.5;
  }

  if(mario.bounceOff(turtle1SensorTop)){
    turtle1State = false;
    turtle1.velocityX = 0;
    turtle1.velocityY = 4;
    mario.velocityX = 0;
    turtle1SensorLeft.setVelocity(0,0);
    turtle1SensorRight.setVelocity(0,0);
    turtle1SensorTop.destroy();
  }


  mario.collide(ground1);
  mario.collide(ground2);
  mario.collide(block1);
  mario.collide(block2);
  mario.collide(block3);
  block2.collide(block2Sensor);
  mario.bounceOff(edges[0]);
  mario.bounceOff(edges[1]);
  mario.bounceOff(edges[2]);
  if (turtle1State){
    turtle1.bounceOff(block1Sensor);
    turtle1.bounceOff(block3Sensor);
  }
  turtle1SensorLeft.bounceOff(block1Sensor);
  turtle1SensorLeft.collide(turtle1);
  turtle1SensorRight.bounceOff(block3Sensor);
  turtle1SensorRight.collide(turtle1);
  turtle1SensorTop.bounceOff(block1Sensor);
  turtle1SensorTop.bounceOff(block3Sensor);

  drawSprites();
}