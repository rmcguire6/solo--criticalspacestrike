const canvas = document.getElementById('screen')
canvas.width = 1820
canvas.height = 700
const ctx = canvas.getContext('2d')

function start_game () {
    console.log('game started')
    let score = 0
    let lives = 3
    move_enemies()
}

function move_enemies () {
    console.log('enemies are moving')
}
function Ship (spacing_x, spacing_y, width, height) {
    ship_image = new Image()
    ship_image.src = 'images/spaceship.png'
    ship_image.onload = () => {
        ctx.drawImage(ship_image, spacing_x, spacing_y, width, height);
    }
}

function draw() {
    let tile_width = 100
    let tile_height = 100
    let x_spacing = tile_width
    let y_spacing = tile_height
    function drawRow(){
        for (var j = 0; j < 8; j++) {
          Ship(x_spacing, y_spacing, tile_width, tile_height)
          x_spacing += tile_width * 2
        }
    }
    for (var i = 0; i < 3; i++) {
        drawRow(tile_width)
        x_spacing = tile_width
        y_spacing += tile_height + 30
      }
      Ship( tile_width * 8, tile_height * 5, tile_width, tile_height)
    }

window.addEventListener('load', (event) => {
    draw();
});