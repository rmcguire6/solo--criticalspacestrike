const canvas = document.getElementById('screen')
canvas.width = 1820
canvas.height = 700
const ctx = canvas.getContext('2d')
const tile_width = 100
const tile_height = 100
const half_tile = 50



function Ship (spacing_x, spacing_y) {
    ship_image = new Image()
    ship_image.src = 'images/spaceship.png'
    ship_image.onload = () => {
        ctx.drawImage(ship_image, spacing_x, spacing_y, tile_width, tile_height);
    }
}

function draw_row(row_position, offset){
    for (var j = 0; j < 8; j++) {
        Ship((canvas.width / 9) * j + tile_width + offset, (canvas.height/4) * row_position + half_tile)
    }
}

function draw_player(player_x,player_y){
    Ship(player_x, player_y)
}

function draw_enemies() {
    draw_row(0, tile_width)
    draw_row(1, -half_tile) 
    draw_row(2, half_tile)
}
function start_game () {
    console.log('game started')
    let score = 0
    let lives = 3   
    draw_player((canvas.width / 2 - half_tile), canvas.height - 1.5 * tile_height)
    draw_enemies()
}
function run_game() {
    start_game()
}
window.addEventListener('load', (event) => {
    run_game();
});