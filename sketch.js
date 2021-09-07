var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var qid =1
var form;
var answer;
var playerExists
var form2;
var title,guru;
var hero, heroin, song, movie;
var points = 30;
var db
var id
var resultPlayers = []

var userId 

var answerFlag = 0;

function preload(){
  gameback = loadImage("img/4.png")
  heroI = loadImage("img/hero2.png")
  heroinI = loadImage("img/heroin2.png")
  movieI = loadImage("img/movie2.png")
  songI = loadImage("img/song2.png")
  titleI = loadImage("img/title.png")
  guruI = loadImage("img/guru.png")
  ticketI = loadImage("img/ticket.png")
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  db = firebase.firestore()
  form = new Form()

  title = createSprite(width/2 + 20 , height/2 - 300)
  title.addImage(titleI)
  title.scale = 2.1;
  
  guru = createSprite(width/2 - 350 , height/2 - 100)
  guru.addImage(guruI)
  guru.scale = 1.8;
  
  hero = createSprite(width/2 - 115 , height/2 - 180)
  hero.addImage(heroI)
  hero.scale = 0.7;

  heroin = createSprite(width/2 + 156 , height/2 - 190)
  heroin.addImage(heroinI)
  heroin.scale = 0.66;

  song = createSprite(width/2 - 120 , height/2 - 60)
  song.addImage(songI)
  song.scale = 0.55;

  movie = createSprite(width/2 + 135 , height/2 - 80)
  movie.addImage(movieI)
  movie.scale = 0.65;

  if (gameState === 0){
    form.display()
    line(width/2, height/2 - 230, width/2, height/2)
    line(width/2 - 280, height/2 - 120, width/2 + 320, height/2 - 120)
   }  
}


function draw(){
  background(gameback)

  textSize(15)
  stroke(204, 36, 117)
  strokeWeight(1)
  fill(204, 36, 117)
  text("Bolly coins : " + points,width/2 + 570, height/2 - 360)
  
  if(gameState === 1 ){
    form.hide()
    form2.display()
    form2.getDataHints()
    form2.displayQuestions()
  }

  if (answerFlag === 4){
    answerFlag = 0;
    reset();
  }
  
  

  if(playerExists === false){
    addPlayer()
  }
  drawSprites();
}

function reset(){
  form2.show();
  points += 20;
  qid += 1;
  form2.clickFlag = 0
}

function keyPressed(){
  if(keyCode === 13 && gameState === 0){
    userId = form.input.value()
    if(userId!==''){
      if(form.validation(userId)){
        if(!checkPlayer(userId)){
          addPlayer()      
        }
      }  
    }
    else{
      alert('enter email to continue')
    }
  }
}

async  function checkPlayer(id){ 
  var localPlayer = []
  //Reading players from database to check if a player already exists
  await db.collection('Players')
          .onSnapshot((snapshot) => {
            var players = snapshot.docs.map((document) => document.data());
    localPlayer = players
    
    //if data avl in players collection
    if(localPlayer.length!== 0){     
      for (var q_id in localPlayer){
        //push the data with matching email ids
        if(id === localPlayer[q_id].email ){
          resultPlayers[0] = localPlayer[q_id]  
          
        }  
    }
    
    // Code when a player exists in database and when its a new player
    if(resultPlayers.length!==0){
      qid = resultPlayers[0].q_id 
      playerExists= true                
    }
    else{
      playerExists = false;   
    }
    }  
  })
}
async function addPlayer(){
    //Adding a player
      await db.collection("Players").add({email:userId,q_id:qid})
      playerExists = true
 
}