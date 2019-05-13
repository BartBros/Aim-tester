
const table = $('table');
const dot = document.createElement('button');
$(dot).addClass('target');

let points = 0;
let $position = $('td');

let i = 0;

$position[i].append(dot);

// $('.target').on('click', function(event) {
//     $(event.target).remove();
//     i++;
//     $position[i].append(dot);
// });

$('tr').on('click', function(event) {
    if (event.target.tagName == 'BUTTON') {
        $(event.target).remove();
        i++;
        points++;
        $('#div-points').text(points);
        $position[i].append(dot);

}
});



// $('table').on('click', function(event){
//     if (event.target.tagName == 'BUTTON') {
//         if (event.target.className == 'target') {
//             position.removeChild();
            
//         }

//     }


// });

// listUL.addEventListener('click', (event) => {
//     if (event.target.tagName == 'BUTTON') {
//       if (event.target.className == 'remove') {
//         let li = event.target.parentNode;
//         let ul = li.parentNode;
//         ul.removeChild(li); 
//       }
//     }
// })