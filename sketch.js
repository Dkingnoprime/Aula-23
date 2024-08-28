const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var back;
var food;
var roberto;
var robertoTriste;
var robertoComendo;
var robertoPiscante;

function preload() {
  back = loadImage("background.png");
  food = loadImage("melon.png");
  roberto = loadImage("Roberto.png");
  robertoComendo = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  robertoPiscante = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  robertoTriste = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  robertoPiscante.playing = true;
  robertoComendo.playing = true;
  robertoTriste.playing = true;
} 

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  robertoPiscante.frameDelay = 16;
  robertoComendo.frameDelay = 20;

  robertoSprite = createSprite(380, 590, 100, 120);
  //robertoSprite.addImage(roberto);
  robertoSprite.addAnimation("piscando",robertoPiscante);
  robertoSprite.addAnimation("comendo",robertoComendo);
  robertoSprite.addAnimation("amuado",robertoTriste);
  robertoSprite.scale = 0.3;

  buttonImg = createImg("pitocante.jpg");
  buttonImg.position(225,20);
  buttonImg.size(50,50);
  buttonImg.mouseClicked(drop);

  ground = new Ground(200,680,600,20);
  rope = new Rope(10,{
    x: 250, y: 30
  }) 

  var fruitOption = {
    density: 0.001
  }

  fruit = Bodies.circle(300,90,25,fruitOption);
  Matter.Composite.add(rope.body, fruit);
  fruit_com = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(back,width/2, height/2, 500, 700)

  ground.show();
  rope.show();
  
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y,100,100);
  }

  if (collide(fruit,roberto)==true) {
    roberto.changeAnimation("comendo");
  }
  
  if (collide(fruit,ground.body)==true) {
    roberto.changeAnimation("amuado");
  }
 
  Engine.update(engine);
  
  drawSprites();
}

function drop() {
  rope.break();
  fruit_com.detach();
  fruit_com = null;
}

function collide(body,sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.x, sprite.y);
    if (d<=10) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else{
      return false
    }
  }
}

