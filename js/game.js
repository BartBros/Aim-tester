
// ========= GAME VARIABLES =========
let points;
let shots;
let bullets;
let topScore = 0;
let escapeDuckSeconds = 0;
let counterToEscapeDuck; 
let table;
let position;
$('.bullet').remove();


const duck = document.createElement('img');
$(duck).attr('id', 'duck');
$(duck).attr('src', '../img/duck.png');
$(duck).width(50).height(50);

const shot = document.createElement('img');
$(shot).attr('id', 'shot');
$(shot).attr('src', '../img/shot_brown_small.png');
$(shot).width(20).height(20);

// Game field
const gameField = document.createElement('table');
$(gameField).addClass('table w-100 h-100').addClass('pistol');

for (let i = 0; i < 9; i++) {
    const tableRow = document.createElement('tr');
    $(gameField).append(tableRow);
    for (let i = 0; i < 14; i++) {
        const tableCell = document.createElement('td');
        $(tableRow).append(tableCell);
    }
}


// Clear Window in Game
const clearWindow = document.createElement('div');
$(clearWindow).addClass('d-flex flex-column justify-content-center align-items-center w-100 h-100 bg-empty');

const bullet = $('<img>').attr({
    'src' : '../img/bullet.png'
});
$(bullet).addClass('bullet');
// ========= FUNCTIONS =========
function startGame() {
    $('#main-game').empty();
    $('#main-game').append(gameField);
    $('td').empty();
    points = 0;
    bullets = 3;
    $('#points').text(points);

    $('#bullets').empty();
    $('#bullets').append(bullet);
    $(bullet).clone().appendTo('#bullets');
    $(bullet).clone().appendTo('#bullets');
    
    table = $('table');   // Whole table is playing field
    $position = $('td');    // Table cell is position for target
    createFirstDuck();
    escape();   //Start count to duck escape
}

function gameOver() {
    escapeStop(); //Start count to duck escape
    $('table').remove();
    
    $('#main-game').append(clearWindow);
        if (points > topScore) {
            $(clearWindow).append(nGameOver)
            .append(nTopScore)
            .append(nTryAgain);   
            topScore = points;
            $('#top-score').text(topScore);
        } else {
            $(clearWindow).append(nGameOver)
            .append(nTryAgain);
        }
}
function positionRandom() {
    return Math.floor(Math.random() * $position.length) + 1;
  }

function createFirstDuck() {
    let positionStart = positionRandom();
    $position[positionStart].append(duck);
}

function escape() {
    counterToEscapeDuck = setInterval(function() {
        escapeDuckSeconds++;
        if (escapeDuckSeconds == 3) {
            $(duck).remove();
            $($position[$position.length / 2]).append(nDuckFlewAway);
            setTimeout(function() {
                gameOver();
            }, 2000);
        }
    }, 1000);
}

function escapeStop() {
    clearInterval(counterToEscapeDuck);
    escapeDuckSeconds = 0;
}


// ========= TEXT NOTIFICATIONS =========

// Game Over
const nGameOver = document.createElement('p');
$(nGameOver).addClass('n-game-over');
$(nGameOver).text('Game Over');

// Duck is gone!
const nDuckFlewAway = document.createElement('p');
$(nDuckFlewAway).addClass('n-flew-away');
$(nDuckFlewAway).text('The duck flew away!');

// Try Again
const nTryAgain = document.createElement('p');
$(nTryAgain).addClass('n-try-again');
$(nTryAgain).addClass('pointer');
$(nTryAgain).text('Try Again');

// New Top Score
const nTopScore = document.createElement('p');
$(nTopScore).addClass('n-top-score');
$(nTopScore).text('Congratulations! You Gained new Top Score!');

// ========= MAIN GAME ACTIONS =========

startGame();    // First Game Field created




$('#main-game').on('click', function(event) { // Target hit correct
    if (event.target.id == 'duck') {
        escapeStop();
        $(event.target).remove();
        points++;
        let posRandom = positionRandom();
        $('#points').text(points);
        $position[posRandom].append(duck);
        escape();

        // Max 3 bullets
        if (bullets < 3 ) {
            bullets += 1;
            $(bullet).clone().appendTo('#bullets');
        }

    } if (event.target.tagName == 'TD') {           // Hit outside the target
        
        if (bullets > 1) {
            bullets -= 1;
            $('.bullet').last().remove();
            

        // Bullets = 0 then Game Over
        } else {
            bullets -= 1;
            $('.bullet').last().remove();
            $(duck).remove();
            gameOver();  
        }
    } 
});


// ========= MENU ELEMENTS =========

$('#main-game').on('click', function(event) {
    if (event.target == nTryAgain) {
        startGame();
        createFirstDuck();
    }  
});