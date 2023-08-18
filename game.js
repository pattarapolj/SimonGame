// alert('gi');
let buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = []
let Level = 0
let started = 0

function nextSequence() {
    Level += 1
    userClickedPattern = []
    $('#level-title').html('Level ' + Level);
    let randomNumber = Math.floor(Math.random() * 4);
    randomChoosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChoosenColour);
    $('#' + randomChoosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
}

function clickHandler(target) {
    let userChosenColour = target;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
}

function playSound(name) {
    let sound = new Audio('sounds/' + name + '.mp3');
    sound.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

function gameover() {
    let deadSound = new Audio('sounds/wrong.mp3');
    deadSound.play();
    $('body').addClass('game-over')
    setTimeout(function() {
        $('body').removeClass('game-over')
    }, 200);
    $('#level-title').html('Game Over, Press Any Key to Restart');
    startOver();
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 500);
        }
    }
    else {
        //dead
        gameover();
    }

}

function startOver() {
    Level = 0;
    gamePattern = [];
    started = 0;
    userClickedPattern = [];
    removeClickListener()
}

function removeClickListener() {
        $('.btn').off()
}
function addClickListener() {
    $('.btn').click(function(e){
        clickHandler(e.target.id)
    });
}


$(document).keypress(function() {
    if (started === 0) {
        nextSequence();
        addClickListener();
        started = 1;
    }
})

