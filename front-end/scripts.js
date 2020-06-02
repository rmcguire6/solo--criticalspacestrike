// ---- create a reusable image tile:
function start_game () {
    console.log('game started')
    let score = 0
    let lives = 3
    move_enemies()
}

function move_enemies () {
    console.log('enemies are moving')
}

function draw_ship(spacing_x, spacing_y){
    my_canvas = document.getElementById("screen")
    ctx = my_canvas.getContext("2d")
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
    let ctx = document.getElementById('screen').getContext('2d')
    var tile_width = 100
    var tile_height = 100
    var x_spacing = tile_width
    var y_spacing = tile_height

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 8; j++) {
          draw_ship(x_spacing, y_spacing)
          x_spacing += tile_width * 2
        }
        x_spacing = tile_width
        y_spacing += tile_height + 30
      }
      draw_ship( tile_width * 8, tile_height * 5)
    }

window.addEventListener('load', (event) => {

    draw();
});