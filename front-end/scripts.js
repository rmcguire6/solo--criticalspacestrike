const canvas = document.getElementById('screen')
canvas.width = 1820
canvas.height = 700
const ctx = canvas.getContext('2d')
const tile_width = 100
const tile_height = 100


function start_game () {
    console.log('game started')
    let score = 0
    let lives = 3
    move_enemies()
}

function move_enemies () {
    console.log('enemies are moving')
}
function Ship (spacing_x, spacing_y) {
    ship_image = new Image()
    ship_image.src = 'images/spaceship.png'
    ship_image.onload = () => {
        ctx.drawImage(ship_image, spacing_x, spacing_y, tile_width, tile_height);
    }
}

function draw() {
    function drawRow(row_position){
        for (var j = 0; j < 8; j++) {
            Ship((canvas.width / 8) * j + (tile_width / 2), (canvas.height/5) * row_position + (tile_height / 2))
        }
    }
    for (var i = 0; i < 3; i++) {
        drawRow(i) 
    }
        Ship( (canvas.width / 2) - (tile_width / 2), canvas.height - (tile_height * 1.5))
}

window.addEventListener('load', (event) => {
    draw();
});