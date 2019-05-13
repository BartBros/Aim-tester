
const table = $('table');
const dot = document.createElement('button');
$(dot).addClass('target');

let points = 0;
let $position = $('td');

let i = 0;

$position[i].append(dot);

$('tr').on('click', function(event) {
    if (event.target.tagName == 'BUTTON') {
        $(event.target).remove();
        i++;
        points++;
        $('#div-points').text(points);
        $position[i].append(dot);

}
});