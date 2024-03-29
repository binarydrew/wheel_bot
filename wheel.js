var colors = ["#f1bb62", "#ee5d85", "#caeaf1", "#eb5b68", "#f8f082",            "#c5c452",  "#82cfcd",  "#cddf7f",
                "#f05622", "#c5de8e",
                "#ee5d85", "#dedee9"];
var directions = ["Forward", "Backward", "Turn Right", "Turn Left",
                  "Strafe Right", "Strafe Left"];

var time = ["1", "2", "3", "1", "2", "3"];

var url = "http://localhost:8071/motion-control/update";

function randomSort() {
    return( parseInt( Math.random()*10 ) %2 );
}

var rand_direction  = directions.sort(randomSort);


var rand_time = time.sort(randomSort)


var possibilities = []
for(var i=0; i < 6; i++) {
    possibilities.push((rand_direction[i] || "") +" "+(rand_time[i] || ""));
}
console.log(possibilities)



  var result;

  var startAngle = 0;
  var arc = Math.PI / 3;
  var spinTimeout = null;

  var spinArcStart = 10;
  var spinTime = 0;
  var spinTimeTotal = 0;

  var ctx;

  function draw() {
    drawRouletteWheel();
  }

  function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
      var outsideRadius = 200;
      var textRadius = 160;
      var insideRadius = 125;

      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,500,500);


      ctx.strokeStyle = "white";
      ctx.lineWidth = 0;

      ctx.font = 'bold 12px sans-serif';

      for(var i = 0; i < 6; i++) {
        var angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.fillStyle = "black";
        ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        var text = possibilities[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      //Arrow
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.fill();
    }
  }

  $("#button").click(function(){
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
  });

  function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
  }

  function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px sans-serif';
    var text = possibilities[index]
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();

    var result = text
    console.log(result);

    var splited = result.split("");
    var just_direction = (splited.exclude(/[123]/).join(''));
    console.log(just_direction)

    var find_time = result.match(/\d/g);
    just_time = find_time.join("");
    console.log(just_time)

    whatToDo(just_direction, just_time)
   }

  function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }

  draw();

function whatToDo(c_direction, c_time) {
  if (c_direction == "Forward ") {
    for(var i=0; i < c_time; i++) {
  $.ajax(url, { dataType: 'jsonp', data: { forward: 1 } } );
  console.log(c_time)
  }}
  else if (c_direction == "Backward ") {
    for(var i=0; i < c_time; i++) {
  $.ajax(url, { dataType: 'jsonp', data: { forward: -1 } } );
  console.log(c_time)
  }}
  else if (c_direction == "Turn Right ") {
    for(var i=0; i < c_time; i++) {
  $.ajax(url, { dataType: 'jsonp', data: { turn: 1 } } );
  console.log(c_time)
  }}
  else if (c_direction == "Turn Left ") {
    for(var i=0; i < c_time; i++) {
  $.ajax(url, { dataType: 'jsonp', data: { turn: -1 } } );
  console.log(c_time)
  }}
  else if (c_direction == "Turn Right ") {
    for(var i=0; i < c_time; i++) {
  $.ajax(url, { dataType: 'jsonp', data: { turn: 1 } } );
  console.log(c_time)
  }}
  else if (c_direction == "Strafe Right ") {
    for(var i=0; i < c_time; i++) {
  $.ajax(url, { dataType: 'jsonp', data: { strafe: 1 } } );
  console.log(c_time)
  }}
  else if (c_direction == "Strafe Right ") {
    for(var i=0; i < c_time; i++) {
  $.ajax(url, { dataType: 'jsonp', data: { strafe: 1 } } );
  console.log(c_time)
  }}
}

$(document).ready(function(){

  $("#forward").click(function(){
    $.ajax(url, { dataType: 'jsonp', data: { forward: 1 } } );
  });

  $("#backward").click(function(){
    $.ajax(url, { dataType: 'jsonp', data: { forward: -1 } } );
  });

  $("#left").click(function(){
    $.ajax(url, { dataType: 'jsonp', data: { turn: -1 } } );
  });

  $("#right").click(function(){
  $.ajax(url, { dataType: 'jsonp', data: { turn: 1 } } );
  });

  $("#st-left").click(function(){
    $.ajax(url, { dataType: 'jsonp', data: { strafe: -1 } } );
  });

  $("#st-right").click(function(){
    $.ajax(url, { dataType: 'jsonp', data: { strafe: 1 } } );
  });

  $(document).keydown(function(key){    //forward
    if (key.keyCode === 87 ){
      $.ajax(url, { dataType: 'jsonp', data: { forward: 1 } } );
    }
  });

  $('body').keyup(function(key){
    if(key.keyCode === 87){
      $.ajax(url, { dataType: 'jsonp', data: { forward: 0 } } );
    }
  });

  $(document).keydown(function(key){    //backward
    if (key.keyCode === 83 ){
      $.ajax(url, { dataType: 'jsonp', data: { forward: -1 } } );
    }
  });

  $('body').keyup(function(key){
    if(key.keyCode === 83){
      $.ajax(url, { dataType: 'jsonp', data: { forward: 0 } } );
    }
  });

  $(document).keydown(function(key){    //left
    if (key.keyCode === 65 ){
      $.ajax(url, { dataType: 'jsonp', data: { turn: -1 } } );
    }
  });

  $('body').keyup(function(key){
    if(key.keyCode === 65){
      $.ajax(url, { dataType: 'jsonp', data: { turn: 0 } } );
    }
  });


  $(document).keydown(function(key){    //right
    if (key.keyCode === 68 ){
      $.ajax(url, { dataType: 'jsonp', data: { turn: 1 } } );
    }
  });

  $('body').keyup(function(key){
    if(key.keyCode === 68){
      $.ajax(url, { dataType: 'jsonp', data: { turn: 0 } } );
    }
  });


  $(document).keydown(function(key){    //strafe left
    if (key.keyCode === 81 ){
      $.ajax(url, { dataType: 'jsonp', data: { strafe: -1 } } );
    }
  });

  $('body').keyup(function(key){
    if(key.keyCode === 81){
      $.ajax(url, { dataType: 'jsonp', data: { strafe: 0 } } );
    }
  });

  $(document).keydown(function(key){    //strafe right
    if (key.keyCode === 69 ){
      $.ajax(url, { dataType: 'jsonp', data: { strafe: 1 } } );
    }
  });

  $('body').keyup(function(key){
    if(key.keyCode === 69){
      $.ajax(url, { dataType: 'jsonp', data: { strafe: 0 } } );
    }
  });

});

