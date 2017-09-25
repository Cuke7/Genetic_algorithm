function Dot(id) {
  this.x = width/5;
  this.y = height/5;
  this.size=20;
  this.red=random(0,256);
  this.green=random(0,256);
  this.blue=random(0,256);
  this.array_x=[];
  this.array_y=[];
  this.speed=10;
  this.length=final_time;
  this.alive=true;
  this.score=0;
  this.id=id;
  this.mut_rate=5; // %

  this.init=function(){
    for (var i = 0; i < final_time; i++) {
      this.array_x.push(random(-1,1));
      this.array_y.push(random(-1,1));
    }
  }

  this.construct=function(parent1, parent2){
    for (var i = 0; i < final_time; i++) {
      if(random(0,1)<0.5){
        this.array_x[i]=parent1.array_x[i]
        this.array_y[i]=parent1.array_y[i]
      }else{
        this.array_x[i]=parent2.array_x[i]
        this.array_y[i]=parent2.array_y[i]
      }
    }
    if(random(0,100)<this.mut_rate){
      this.array_x[i]=random(-1,1);
      this.array_y[i]=random(-1,1);
    }
  }

  this.show=function(){
    noStroke();
    fill(this.red, this.green, this.blue);
    ellipse(this.x,this.y,this.size, this.size)
  }

  this.move=function(index) {
    this.score=1/dist(this.x, this.y, goal.x, goal.y);
    this.x+=this.array_x[index]*this.speed;
    this.y+=this.array_y[index]*this.speed;
  }
}
