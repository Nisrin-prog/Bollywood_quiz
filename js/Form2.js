class Form2 {

    constructor() {
      
      this.submit = createButton("SUBMIT")
      this.questions = [];
      this.hints = [];
      this.hid = 1;
      this.hero = createInput();
      this.heroine = createInput();
      this.song = createInput();
      this.movie = createInput();
      this.localdb = [];
      this.localdb2 = []
      this.answers = []
      this.hint3 = createButton("hint1");
      this.hint4 = createButton("hint2");
      this.hintFlag = false
      this.hintFlag2 = false
      this.clickFlag = 0;
      this.saveGame = createButton("Save Your Game")
      
    }
    
  async getData(){
    var localdb = []
    await db.collection('Questions')
            .onSnapshot((snapshot) => {
              var questions = snapshot.docs.map((document) => document.data());
      this.localdb = questions
      
    });  
  }
  async getDataHints(){
    var hints = []
    await db.collection("Hints")
      .where('h_id' ,'==', qid)
      .onSnapshot((snapshot)=>{
        hints = snapshot.docs.map((doc) => doc.data())
         
         this.localdb2 = hints
         this.hints = this.localdb2[0]
      }) 
  }
  

  show(){
    this.hero.show();
    this.heroine.show();
    this.song.show();
    this.movie.show();
  }
  hide(){
    this.hero.hide();
    this.heroine.hide();
    this.song.hide();
    this.movie.hide();
    this.submit.hide()
    this.saveGame.hide()
    this.hint3.hide()
    this.hint4.hide()
  }
  
  display(){
    
    push()
    textSize(60);
    fill(197, 57, 125);      
    stroke("white")
    strokeWeight(3)
    textFont("Georgia")
    text("Hero - ",displayWidth/2 - 300 , displayHeight/2 - 200)
    this.hero.position(displayWidth/2 - 300 , displayHeight/2 - 150);
    this.hero.size(250,25)

    text("Heroine - ",displayWidth/2 + 50 , displayHeight/2 - 200)
    this.heroine.position(displayWidth/2 + 50 , displayHeight/2 - 150);
    this.heroine.size(250,25)

    text("Song - ",displayWidth/2 - 300 , displayHeight/2 - 20)
    this.song.position(displayWidth/2 - 300 , displayHeight/2 + 40);
    this.song.size(250,25)

    text("Movie - ",displayWidth/2 + 50 , displayHeight/2 - 20)
    this.movie.position(displayWidth/2 + 50 , displayHeight/2 + 40);
    this.movie.size(250,25)
    pop()


    for (var q_id in this.localdb){
      if(qid === this.localdb[q_id].q_id ){
        this.questions = this.localdb[q_id]
        //console.log(this.questions)
      }
    }
    
    this.submit.position(displayWidth/2 + 520, displayHeight/2 + 120);
    this.submit.size(130,35);
    this.submit.mousePressed(async()=>{    
      answer = new Answers (this.hero.value(),this.heroine.value(),this.song.value(),this.movie.value()) 
      this.hintFlag = false;
      this.hint3.show()
      this.hintFlag2 = false;
      this.hint4.show()
      this.clickFlag +=1
     // answer.getAnswers()
    })
     
    if (this.clickFlag === 3){
      this.submit.attribute('disabled','')
      setInterval(()=>{
          this.submit.removeAttribute('disabled')
          this.clickFlag = 0
          console.log("works")
        },60000)
    }
    this.saveGame.position(displayWidth/2 + 520, displayHeight/2 + 160)
    this.saveGame.mousePressed(()=>{   
      form.update(userId)
     })
  }
  
  displayQuestions(){
    push()
    textSize(60);
    fill(197, 57, 125);
    stroke("white")
    strokeWeight(3)
    textFont("Georgia")
    text(this.questions.hero,(displayWidth/2 - 300)+170 , displayHeight/2 - 200)
    this.hero.position(displayWidth/2 - 300 , displayHeight/2 - 150);
    this.hero.size(250,25)

    text(this.questions.heroine,(displayWidth/2 + 50)+250 , displayHeight/2 - 200)
    this.heroine.position(displayWidth/2 + 50 , displayHeight/2 - 150);
    this.heroine.size(250,25)

    text(this.questions.song,(displayWidth/2 - 300)+170 , displayHeight/2 - 20)
    this.song.position(displayWidth/2 - 300 , displayHeight/2 + 40);
    this.song.size(250,25)

    text(this.questions.movie,(displayWidth/2 + 50)+200 , displayHeight/2 - 20)
    this.movie.position(displayWidth/2 + 50 , displayHeight/2 + 40);
    this.movie.size(250,)
    
    pop()
    
    fill(204, 36, 117)
    textSize(23);
    strokeWeight(1)
    text(this.hints.hint1,displayWidth/2 - 670 , displayHeight/2 + 250)
    text(this.hints.hint2,displayWidth/2 - 670 , displayHeight/2 + 300)
    
    textSize(35)
    text("Trivia about the movie : ",displayWidth/2 - 660, displayHeight/2 + 200)
    line(displayWidth/2, displayHeight/2 - 250, displayWidth/2, displayHeight/2 + 110)
    line(displayWidth/2 - 340, displayHeight/2 - 80, displayWidth/2 + 365, displayHeight/2 - 80)
   
    
      this.hint3.position(displayWidth/2 + 620 , displayHeight/2 - 200);
      this.hint3.style("color","purple")
      this.hint3.mousePressed(()=>{
        if(points >= 15){
          this.hint3.hide()
          points = points - 15
          this.hintFlag = true        
        }  
      })
      if (this.hintFlag === true){
        textSize(15);
        text(this.hints.hint3,displayWidth/2 + 470 , displayHeight/2 - 200)
      }
            
      this.hint4.position(displayWidth/2 + 620 , displayHeight/2 - 160);
      this.hint4.style("color","purple")
      this.hint4.mousePressed(()=>{ 
        if(points>= 15){       
          this.hint4.hide() 
          points = points - 15 
          this.hintFlag2 = true    
        }
      })
      if (this.hintFlag2 === true){
        textSize(15);
        text(this.hints.hint4,displayWidth/2 + 470 , displayHeight/2 - 160)          
        }
      
  }
}
