//Create variables here
var dog,dog1,happyDog;
var database,foodS,foodStock,add,feed;
var fedTime,lastFed,foodObj;
var form,name1,name2,bottle,img;
var bedroom,washroom,garden,gameState=0;
var game,lazy,menu,bedb,gardenb,washb,feedb,currentTime,image1;



function preload()
{
	//load images here
  dog1 = loadImage("images/Dog.png");
  happyDog = loadImage("images/Happy.png");
  lazy = loadImage("images/Lazy.png");
  img = loadImage("images/milk.png");

  bedroom = loadImage("images/Bed Room.png");
  washroom = loadImage("images/Wash Room.png");
  garden = loadImage("images/Garden.png");
  image1 = loadImage("images/bg.jpg");
}




function setup() {
	createCanvas(600, 600);

  dog = createSprite(300,450);
  dog.addImage(dog1);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  bottle = createSprite(200,475);
  bottle.addImage(img);
  bottle.scale = 0.1;
  bottle.visible = false;
  

  foodObj = new food();

  form = new Form();
  form.display();

  game = new Game();
  game.getState();

  add = document.getElementById("abc");

  feed = createButton("FEED DOG");
  feed.position(630,201);
  feed.mousePressed(feedDog);
  feed.hide();

  
  
  bedb = createButton("Bedroom");
  bedb.position(500,40-10);
  bedb.hide();

  gardenb = createButton("Garden");
  gardenb.position(500,70);
  gardenb.hide();

  washb = createButton("Washroom");
  washb.position(500,110);
  washb.hide();

  feedb = createButton("Kitchen");
  feedb.position(500,150);
  feedb.hide();

  currentTime = hour();
}





function draw() { 
 
  

  lastFed = database.ref("lastFed");
  lastFed.on("value",function(data){
    lastFed=data.val();
  });
   
  if(gameState != 0){
  background(46,139,87);
  
  menu = createButton("Take "+name1+" to");
  menu.position(390,50);
  

drawSprites();
  //add styles here

  fill(255);
  textSize(25);
  stroke(255,0,0);
  text("Bottles remaining: "+foodS,10,210);


  if(lastFed>12){
  text("Last Fed: "+lastFed%12 + " PM",10,180);
  } else if(lastFed<12){
    text("Last Fed: "+lastFed + " AM",10,180);
  }else{
    text("Last Fed: 12 Noon",10,180);
  }


  fill(11,230,219);
  textSize(20);
  noStroke();
  

  textSize(30);
  fill("red");
  stroke(255,0,0);
  strokeWeight(1.5);
  
  text("Your Pet: "+name1,300,120);
  text("Hello "+name2,20,120);


  if(gameState === "hungry"){
    foodObj.display();
    dog.visible = true;
    text(name1,width/2-50,550);

    add.style.display="inline-block";
    feed.show();

  } else {
    add.style.display="none";
    feed.hide();
    
    dog.visible=false;
  }


  
  menu.mousePressed(function (){
    
    bedb.show();
    gardenb.show();
    washb.show();
    feedb.show();
    
  });

  bedb.mousePressed(function(){
    bedb.hide();
    gardenb.hide();
    washb.hide();
    feedb.hide();
    currentTime = lastFed+2;
    });

    washb.mousePressed(function(){
    bedb.hide();
    gardenb.hide();
    washb.hide();
    feedb.hide();
    currentTime = lastFed+3;
    });

    gardenb.mousePressed(function(){
    bedb.hide();
    gardenb.hide();
    washb.hide();
    feedb.hide();
    currentTime = lastFed+1;
    });

    feedb.mousePressed(function(){
    bedb.hide();
    gardenb.hide();
    washb.hide();
    feedb.hide();
    currentTime = lastFed+5;
    });
    
    
  if(currentTime==lastFed || currentTime==(lastFed+1)){
    game.update("playing");
    foodObj.playing();
    text("Look how "+name1+" is playing!!",150,100);
    
  } else if(currentTime==lastFed+2){
    game.update("sleeping");
    foodObj.bedroom();
    text(name1+" is Sleeping",200,100);

  } else if(currentTime>lastFed+2&&currentTime<lastFed+4){
    game.update("bathing");
    foodObj.washroom();
    text("Let "+name1+" bath",200,100)

  } else {
    game.update("hungry");

  }
  //menu.mousePressed();
  
}

}




function readStock(data){

foodS = data.val();
foodObj.getFoodStock();
}




function feedDog(){

  bottle.visible = true;
  add.style.display="none";
  feed.hide();
  dog.addImage(happyDog);

if(foodS>0){
  foodS = foodS-1;
}

  database.ref("/").update({
    food: foodS,
    lastFed: hour()
  });
}





function addFood(){

  bottle.visible = false;

  dog.addImage(dog1);

  if(foodS<20){
  foodS++;
  }

  database.ref("/").update({
    food: foodS
  })
}

function goTo(){
  open("https://sarang73.whjr.site/");
}