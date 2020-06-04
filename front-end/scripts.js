const canvas = document.getElementById('screen')
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
// ---- create a reusable image tile:
function draw_ship(spacing_x, spacing_y){
    ship_image = new Image()
    ship_image.src = 'images/spaceship.png'
    let start_x = 0
    let start_y = 0
    let x = start_x + spacing_x
    let y = start_y + spacing_y
    let w = 100
    let h = 90
    ship_image.onload = () => {
        ctx.drawImage(ship_image, x, y, w, h);
    }
}

function draw() {
    let tile_width = 100
    let tile_height = 100
    let x_spacing = tile_width
    let y_spacing = tile_height
    function drawRow(){
        for (var j = 0; j < 8; j++) {
          draw_ship(x_spacing, y_spacing)
          x_spacing += tile_width * 2
        }
    }
    for (var i = 0; i < 3; i++) {
        drawRow(tile_width)
        x_spacing = tile_width
        y_spacing += tile_height + 30
      }
      draw_ship( tile_width * 8, tile_height * 5)
    }

window.addEventListener('load', (event) => {
    draw();
});