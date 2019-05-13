
const table = $('table');
const dot = document.createElement('button');
$(dot).addClass('target');

// Clear Window in Game
const clearWindow = document.createElement('div');
clearWindow.classList.add('d-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'w-100', 'h-100');
clearWindow.textContent = 'tekst';

// ========= TEXT NOTIFICATIONS =========
// const tEmpty = document.createElement('p');
// const tGameOver = document.createTextNode('Game Over');

// tEmpty.append(tGameOver);


let points = 0;
let $position = $('td');

let i = 0;


// Generate random position for game target
function positionRandom() {
    return Math.floor(Math.random() * $position.length) + 1;
  }

// First position of target
let positionStart = positionRandom();
$position[positionStart].append(dot);

$('tr').on('click', function(event) {
    if (event.target.tagName == 'BUTTON') {
        $(event.target).remove();
        points++;
        let posRandom = positionRandom();
        $('#div-points').text(points);
        $position[posRandom].append(dot);
    } if (event.target.tagName == 'TD') {
        points = 0;
        $('#div-points').text(points);
        $('table').remove();
        $('#main-game').append(clearWindow);
        $(clearWindow).append('<p>test</p>');

    }
});