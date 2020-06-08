const canvas = document.getElementById('screen')
canvas.width = 1900
canvas.height = 700
const ctx = canvas.getContext('2d')
const tile_width = 100
const tile_height = 100
const half_tile = 50
const quarter_tile = 25
const player_y = canvas.height - tile_height - half_tile -16
const player_dx = 25
const min_left = tile_width
const max_right = canvas.width -  2 * tile_width
const enemy_width = Math.floor(canvas.width / 9)
const enemy_height = Math.floor(canvas.height / 5)
const row_dx = 20
const row_width = 6 * enemy_width

let player_x = canvas.width / 2 - half_tile
let row = [{x:min_left, y: half_tile, direction: 1}, {x: 3 * tile_width, y: enemy_height + half_tile, direction: -1},{x: min_left + half_tile,y: 2 * enemy_height + half_tile ,direction: 1}]

function Ship (spacing_x, spacing_y) {
    ship_image = new Image()
    ship_image.src = 'images/spaceship.png'
    ship_image.onload = () => {
        ctx.drawImage(ship_image, spacing_x, spacing_y, tile_width, tile_height);
    }
}

function draw_row(row_x, row_y){
    for (let j = 0; j < 7; j++) {
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

function start_game () {
    let score = 0
    let lives = 3
    console.log('game started')
    draw_player(player_x)
    animate_enemy()
}

function move_enemies () {
    ctx.clearRect(0, 0, canvas.width, enemy_height + half_tile)
    ctx.clearRect(0, enemy_height + half_tile, canvas.width, enemy_height)
    ctx.clearRect(0, 2 * enemy_height + quarter_tile, canvas.width, Math.floor(2.3 * tile_height))
    for (let i=0; i < 3; i ++) {
        row[i].x +=  row_dx * row[i].direction
        if (row[i].direction < 0) {
            if (row[i].x < min_left) {
                row[i].x = min_left
                row[i].direction = 1
            }
        } else {
            if (row[i].x + row_width > max_right) {
                row[i].x = max_right - row_width
                row[i].direction = -1
            }
        }
        draw_row(row[i].x, row[i].y)
    }
}

function animate_enemy() {
    setInterval(move_enemies,600)
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
    if (player_x < min_left) {
        player_x = min_left
        }
    draw_player(player_x)
}
function shoot_laser () {
        ctx.clearRect(player_x  + 43, 0, 10, player_y)
        ctx.fillStyle = '#ffff00'
        ctx.fillRect(player_x + 43, 0, 10, player_y)
}
window.addEventListener('load', (event) => {
    start_game()
})

