var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// Function to start the game
function startGame() {
  $("body").removeClass("end-body");
  $("h1").show();
  $(".end-container")
    .addClass("container")
    .removeClass("end-container");
  $(".scorecard").remove();
  if (!started) {
    $("h1").html("Level " + level);
    nextSequence();
    started = true;
  }
}

//starting the game
$(".start").click(startGame);

// User generated button clicks
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");

  // Storing the user generated sequence
  userClickedPattern.push(userChosenColor);

  // Adding sound and animation to button click
  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// System generated pattern
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").html("Level " + level);

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
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Adding animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Checking the answers
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1500);
    }
  } else {
    $("body").addClass("end-body");
    playSound("wrong");
    $("h1").hide();
    $(".container")
    .addClass("end-container")
    .removeClass("container")
    .after('<div class = "scorecard"><h1>Game Over ! <br> Your Score is ' + level + '</h1><h1><div class="start">Restart</div></h1></div>');
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    $(".start").click(startGame); // Re-attach event listener to the restart button
  }
}

// Restarting the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
