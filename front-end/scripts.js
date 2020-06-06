const canvas = document.getElementById('screen')
canvas.width = 1820
canvas.height = 700
const ctx = canvas.getContext('2d')
const tile_width = 100
const tile_height = 100
const half_tile = 50
const player_y = canvas.height - 1.5 * tile_height
const player_dx = 25
const min_left = tile_width
const max_right = canvas.width - tile_width
const enemy_width = canvas.width / 9
const enemy_height = canvas.height / 4
const row1_y = half_tile
const row2_y = enemy_height + half_tile
const row3_y = 2 * enemy_height + half_tile

let player_x = canvas.width / 2 - half_tile
let row1_x = min_left
let row2_x = 2 * tile_width
let row3_x = min_left + half_tile

function Ship (spacing_x, spacing_y) {
    ship_image = new Image()
    ship_image.src = 'images/spaceship.png'
    ship_image.onload = () => {
        ctx.drawImage(ship_image, spacing_x, spacing_y, tile_width, tile_height);
    }
}

function draw_row(row_x, row_y){
    for (let j = 0; j < 8; j++) {
        Ship(enemy_width * j + row_x, row_y)
    }
}

function draw_player(x){
    player = new Image()
    player.src = 'images/spaceship.png'
    player.onload = () => {
        ctx.drawImage(player, x, player_y, tile_width, tile_height)
    }
}

function draw_enemies() {
    draw_row(row1_x,row1_y)
    draw_row(row2_x, row2_y)
    draw_row(row3_x,row3_y)
}

function start_game () {
    let score = 0
    let lives = 3
    console.log('game started')
    draw_player(player_x)
    draw_enemies()
}

function move_player_right () {
    ctx.clearRect(0, player_y, canvas.width, canvas.height)
    player_x +=  player_dx
    if (player_x > max_right) {
        player_x = max_right
        }
    draw_player(player_x)
}
function move_player_left () {
    ctx.clearRect(0, player_y, canvas.width, canvas.height)
    player_x -=  player_dx
    if (player_x < 0) {
        player_x = 0
        }
    draw_player(player_x)
}

function run_game() {
    start_game()
}
window.addEventListener('load', (event) => {
    run_game();
});