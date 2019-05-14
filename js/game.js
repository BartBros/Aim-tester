
// ========= GAME VARIABLES =========
let points;
let shots;
let bullets;
let topScore = 0;


const duck = document.createElement('img');
$(duck).attr('id', 'duck');
$(duck).attr('src', '../img/duck_outline_target_yellow.png');
$(duck).width(50).height(50);

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


// ========= FUNCTIONS =========
function startGame() {
    $('#main-game').empty();
    $('#main-game').append(gameField);
    $(clearWindow).empty();
    points = 0;
    bullets = 3;
    $('#points').text(points);
    $('#bullets').text(bullets);
}


// ========= TEXT NOTIFICATIONS =========

// Game Over
const nGameOver = document.createElement('p');
$(nGameOver).css('color','red').css('text-shadow', '1px 1px 2px rgb(0, 0, 0)');
$(nGameOver).text('Game Over');

// Try Again
const nTryAgain = document.createElement('p');
$(nTryAgain).css('color','green').css('text-shadow', '1px 1px 2px rgb(0, 0, 0)');
$(nTryAgain).addClass('pointer');
$(nTryAgain).text('Try Again');

// Game Over
const nTopScore = document.createElement('p');
$(nTopScore).css('color','rgb(255, 230, 0)').css('text-shadow', '1px 1px 2px rgb(0, 0, 0)');
$(nTopScore).text('Congratulations! You Gained new Top Score!');

// ========= MAIN GAME ACTIONS =========

startGame();

const table = $('table');   // Whole table is playing field
let $position = $('td');    // Table cell is position for target


// Generate random position for game target
function positionRandom() {
    return Math.floor(Math.random() * $position.length) + 1;
  }

// First position of target
let positionStart = positionRandom();
$position[positionStart].append(duck);

$('#main-game').on('click', function(event) {               // Target hit correct
    if (event.target.id == 'duck') {
        $(event.target).remove();
        points++;
        let posRandom = positionRandom();
        $('#points').text(points);
        $position[posRandom].append(duck);
        if (bullets < 3 ) {
            bullets += 1;
            $('#bullets').text(bullets);
        }

    } if (event.target.tagName == 'TD') {           // Hit outside the target
        if (bullets > 1) {
            bullets -= 1;
            $('#bullets').text(bullets);
        } else {
            bullets -= 1;
            $('#bullets').text(bullets);
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
        }
    });

// ========= MENU ELEMENTS =========

$('#main-game').on('click', function(event) {
    if (event.target == nTryAgain) {
        startGame();
    }  
});