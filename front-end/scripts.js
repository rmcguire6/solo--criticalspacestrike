// ---- create a reusable image tile:
function start_game () {
    console.log('game started')
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
    let h = 100
    ship_image.onload = () => {
        ctx.drawImage(ship_image, x, y, w, h);
    }
}

function draw() {
    let ctx = document.getElementById('screen').getContext('2d')
     // create a spacing for y, increment by tile_height/width which is set to 50 atm.

    var tile_width = 100
    var tile_height = 80
    var x_spacing = tile_width + 20
    var y_spacing = tile_height + 10

    for (var i = 0; i < 3; i++) {

        for (var j = 0; j < 8; j++) {
          draw_ship(x_spacing, y_spacing)
          x_spacing += tile_width * 2

        }
        // after inner for loop is done, reset x_spacing, and increment y_spacing
        x_spacing = tile_width + 50
        y_spacing += tile_height + 50

      }
      draw_ship( tile_width * 8, tile_height * 6)
    }

window.addEventListener('load', (event) => {

    draw();
});