var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var curLevel = 0;
var started = false;
var correct = true;

// Start: detect the keyboard press
$(document).keypress(() => {
    if (!started) {
        nextSequence();
        started = true;
        correct = true;
    }
});


// User play: user's answer
$(".btn").click(function () {
    console.log("clicked!");

    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // Adds to the array
    userClickedPattern.push(userChosenColor);

    // Check answer
    correct = checkAns(gamePattern[curLevel], userClickedPattern[curLevel]);
    curLevel++; // move to next

    // If the length are the same
    if (gamePattern.length === userClickedPattern.length) {
        // clear the user click history
        userClickedPattern = [];
        // restart from the beginning (checking answer)
        curLevel = 0;
        // Move to next
        if (correct) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
})

function nextSequence() {
    $("#level-title").html("Level " + level);

    // Randomly pick a color
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    // Animation
    animatePress(randomChosenColor);
    // Sound
    playSound(randomChosenColor);
    // Add to the gamePattern
    gamePattern.push(randomChosenColor);

    // Move to the next level
    level++;
}

// Play sound based on the para
function playSound(clickedButton) {
    var audio = new Audio("sounds/" + clickedButton + ".mp3");
    audio.play();
}

// Flashing animation
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

// Check answer
function checkAns(game, user) {
    if (game !== user) {
        // Reset everything
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        correct = false;
        console.log(correct);
        started = false;

        gameOver();
        return correct;
    } 
    console.log(correct);
    return correct;
}

// Game over animation/page
function gameOver() {
    // Game over message
    $("#level-title").html("Game Over, Press Any Key to Restart");
    // Play wrong
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    // Red background
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200); 
}
