function Goal(x,y){
  this.x=4*width/5;
  this.y=4*height/5;
  this.size=20;

  this.show=function(){
    stroke(255);
    noFill();
    ellipse(this.x,this.y,this.size, this.size)
  }
}
