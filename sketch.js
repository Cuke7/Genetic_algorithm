var dot=[]; // Array containing our dots in the current gen
var dot2=[] // Array for the next gen;
var obstacle1;
var obstacle2;
var goal; // The white circle dots hqve to reach
var time=0; // Units of time
var final_time=100;
//var framerate=300;
var dot_number=50; // Number of dots per gen
var gen_number=1;
var total_score=0;
var show=true;
var pick=[];
var paused=false;
var mut_rate=5; // In %
var speed=15; // how many pixels a dot will travel per time unit

function setup() {
  var canvas = createCanvas(600, 500);
  canvas.position(window.innerWidth/2-width/2, window.innerHeight/2-height/2);
  canvas.parent('myContainer');
  //frameRate(framerate);
  background(0);
  goal=new Goal();
  init_dot(dot_number); // Fill the dot array and call the init method for each dot
  noStroke();
  restart();
}

function draw() {
  if(!paused){
    background(0);

    goal.show();

    if(time<final_time-1){
      for (var i = 0; i < dot.length; i++) { // For all dots
        if(dot[i].alive){
          collide_goal(dot[i]);    // Check if the dot hits the goal
          dot[i].move(time);       //Move the dot dor a time unit
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
          dot[k].score=Math.round(dot[k].score/total_score*100); // Set all score property for all the dots
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
  // Initialise and constrain all the text box
  final_time = Number(document.getElementById("final_time").value);
  console.log(final_time);
  if(isNaN(final_time) || final_time < 5){
    final_time=100;
    document.getElementById("final_time").value=100;
  }
  dot_number = document.getElementById("dot_number").value;
  if(isNaN(dot_number) || dot_number < 5){
    dot_number=50;
    document.getElementById("dot_number").value=50;
  }
  mut_rate = document.getElementById("mut_rate").value;
  if(isNaN(mut_rate) || mut_rate < 1){
    mut_rate=5;
    document.getElementById("mut_rate").value=5;
  }
  speed = document.getElementById("speed").value;
  if(isNaN(speed) || speed < 2){
    speed=15;
    document.getElementById("speed").value=15;
  }
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
  }
}
