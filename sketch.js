var fairy, fairyImage;
var star, starImage, star_options;
var background, backgroundImage;
var renderStar;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;

function preload() {
  //preload the images here
  backgroundImage = loadImage("starnight.png");
  fairyImage = loadImage("fairy1.png");
  starImage = loadImage("star.png");
}

function setup() {
  createCanvas(800, 750);
  background = createSprite(400, 375, 800, 750);
  background.addImage(backgroundImage);
  background.scale = 0.5;

  engine = Engine.create();

  world = engine.world;

  star_options = { isStatic: true };

  fairy = createSprite(100, 500, 20, 20);
  fairy.addImage(fairyImage);
  fairy.scale = 0.2;
  fairy.debug = true;
  fairy.setCollider("rectangle", 0, 0, 600, 600);

  star = Bodies.rectangle(600, 200, 10, 10, star_options);
  World.add(world, star);

  renderStar = createSprite(star.position.x, star.position.y, 10, 10);
  renderStar.debug = true;
  renderStar.addImage(starImage);

  Engine.run(engine);
}

function draw() {
  background = "black";

  renderStar.x = star.position.x;
  renderStar.y = star.position.y;

  if (keyDown("left")) {
    fairy.x = fairy.x - 5;
  }

  if (keyDown("right")) {
    fairy.x = fairy.x + 5;
  }

  if (keyDown("down") && !fairy.isTouching(renderStar)) {
    Body.setStatic(star, false);
    fairy.velocityX = 20;
    Engine.update(engine);
  }

  if (fairy.isTouching(renderStar)) {
    Body.setStatic(star, true);
    fairy.velocityX = 0;
    Engine.update(engine);
  }
  drawSprites();
}
