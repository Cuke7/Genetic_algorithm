var dot=[]; // Array containing our dots in the current gen
var dot2=[] // Array for the next gen;
var obstacle1;
var obstacle2;
var goal; // The white circle dots hqve to reach
var time=0; // Units of time
var final_time=100;
var framerate=300;
var dot_number=50; // Number of dots per gen
var gen_number=1;
var total_score=0;
var show=true;
var pick=[];
var paused=false;

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.position(window.innerWidth/2-width/2, window.innerHeight/2-height/2);
  canvas.parent('myContainer');
  frameRate(framerate);
  background(0);
  goal=new Goal();
  init_dot(dot_number); // Fill the dot array and call the init method for each dot
  noStroke();
}

function draw() {
  if(!paused){
    background(0);

    goal.show();

    if(time<final_time-1){
      for (var i = 0; i < dot.length; i++) { // For all dots
        if(dot[i].alive){
          collide_goal(dot[i]);    // Check if the dot hits the goal
          dot[i].move(time);
          if(show){
            dot[i].show();
          }
        }
      }

      time++;

      if(time>final_time-2){ // If we are out of time
        //console.log("The end !");
        for (var j = 0; j < dot.length; j++) {
          total_score=total_score+dot[j].score;
        }
        for (var k = 0; k < dot.length; k++) {
          dot[k].score=Math.round(dot[k].score/total_score*100);
          //console.log("N"+dot[k].id+" scored : "+dot[k].score)
        }
      }
    }else{
      clicked();
    }
  }
}

function clicked2(){
  if(paused){
    paused=false;
  }else{
    paused=true;
  }
}

function restart(){
  dot2=[];
  dot=[];
  init_dot(dot_number);
  time=0;
  paused=false;
  gen_number=1;
  total_score=0;
  show=true;
  pick=[];
  document.getElementById("generation").innerHTML="Generation n°1";
  document.getElementById("finaltext").innerHTML="";
}


function clicked(){
  //console.log("Button clicked")
  pick=[];
  for (var i = 0; i < dot.length; i++) {
    for (var j = 0; j < dot[i].score; j++) {
      pick.push(dot[i].id);
    }
  }

  for (var i = 0; i < dot.length; i++) {
    pick_index1=floor(random(0,pick.length));
    pick_index2=floor(random(0,pick.length));
    //console.log(pick_index1+":"+pick_index2);
    dot2.push(new Dot(i));
    dot2[i].init();
    dot2[i].construct(dot[pick[pick_index1]],dot[pick[pick_index2]]);
  }
  dot=dot2;
  time=0;
  dot2=[];
  gen_number++;
  total_score=0
  console.log("Generation n"+gen_number);
  //console.log(pick);
  document.getElementById("generation").innerHTML="Generation n°"+gen_number;
}


function init_dot(number){
  for (var i = 0; i <number; i++) {
    dot.push(new Dot(i));
  }
  for (var i = 0; i < dot.length; i++) {
    dot[i].init(); // Fill the x and y array with random values
  }
}

function collide_goal(dot){
  if(dist(dot.x,dot.y,goal.x,goal.y)<goal.size/2){
    console.log("A dot just won !");
    paused=true;
    document.getElementById("finaltext").innerHTML="A dot just won !";
  }
}
