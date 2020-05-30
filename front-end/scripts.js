// ---- create a reusable image tile:
function draw_ship(spacing_x, spacing_y){
    my_canvas = document.getElementById("screen")
    ctx = my_canvas.getContext("2d")
    ship_image = new Image()
    ship_image.src = 'images/spaceship.png'
    let start_x = 0
    let start_y = 10
    let x = start_x + spacing_x
    let y = start_y + spacing_y
    let w = 50
    let h = 50
    ship_image.onload = () => {
        ctx.drawImage(ship_image, x, y, w, h);
    }

}

function draw() {
    let ctx = document.getElementById('screen').getContext('2d')
     // create a spacing for y, increment by tile_height/width which is set to 50 atm.

    var tile_width = 50
    var tile_height = 50
    var x_spacing = tile_width + 10
    var y_spacing = tile_height + 10

    for (var i = 0; i < 3; i++) {

        for (var j = 0; j < 9; j++) {
          draw_ship(x_spacing, y_spacing)
          x_spacing += tile_width
        }
        // after inner for loop is done, reset x_spacing, and increment y_spacing
        x_spacing = tile_width + 10
        y_spacing += tile_height

      }
    }

window.addEventListener('load', (event) => {

    draw();
});