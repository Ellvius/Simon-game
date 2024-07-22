
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// Detecting keyboard press and starting the game
$("body").keypress(function(){
  if(!started){
    $("h1").html("level " + level);
    nextSequence();
    started = true;
  }
});

// User generated button clicks
$(".btn").click(function (){

    var userChosenColor = $(this).attr("id");

    // Storing the user generated sequence
    userClickedPattern.push(userChosenColor);

    // Adding sound and animation to button click
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length -1);

});


// System generated pattern
function nextSequence() {

    userClickedPattern = [];

    level++;
    $("h1").html("level " + level);

    // Generate random pattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    // Storing the randomly generated sequence
    gamePattern.push(randomChosenColor);

    // Adding sound and animation
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}




// Function to play sound
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Adding animation
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout( function(){
    $("#" + currentColor).removeClass("pressed")
  }, 100 );
}

// checking the answers
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      
      setTimeout(function(){
        nextSequence()
      }, 1500);
    }

  }
  else {
    playSound("wrong");
    $("h1").html("Game over <br> Press A Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}


// Restarting the game
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}