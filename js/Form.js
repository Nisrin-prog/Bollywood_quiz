class Form {
  constructor() {
    this.input = createInput("Email");
    this.play = createButton('PLAY');
   
    this.play.attribute('disabled','');  
    
    
  }
  
  display(){
    this.input.position(windowWidth/2 - 660 , windowHeight/2 - 330);

    this.play.position(windowWidth/2 - 90, windowHeight/2 + 70);
    this.play.size(210,70)
    this.play.style("fontSize","large")
    //userId = this.input.value()    
    
    this.play.mousePressed(()=>{
      gameState = 1;
      form2 = new Form2()
      form2.getData()
      
    }) 
  }
  hide(){
    this.input.hide();
    this.play.hide();
    

    hero.visible = false;
    heroin.visible = false;
    song.visible = false;
    movie.visible = false;
  }
  //Function to validate if its an email address
  validation(inputText){
    var mailformat = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    if(inputText.match(mailformat)) {
      this.play.removeAttribute('disabled');  
      return true;
    }
    else{
      alert("You have entered an invalid email address!");    //The pop up alert for an invalid email address
    
      return false;
    }
  }
  
  async update(id){
    var doc_id 
    await db.collection("Players").where("email", "==", id)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            doc_id = doc.id
            db.collection("Players").doc(doc_id).update({q_id: qid});
        });
   })
  }
}