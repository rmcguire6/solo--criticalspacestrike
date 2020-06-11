const canvas = document.getElementById('screen')
canvas.width = 1400
canvas.height = 700
const ctx = canvas.getContext('2d')
const tile_width = 100
const tile_height = 100
const half_tile = 50
const quarter_tile = 25
const player_y = canvas.height - tile_height - half_tile -16
const player_dx = 50
const min_left = tile_width
const max_right = canvas.width -  2 * tile_width
const enemy_width = Math.floor(canvas.width / 9)
const enemy_height = Math.floor(canvas.height / 5)
const row_dx = 20
const num_ships = 6
const row_width = (num_ships - 1) * enemy_width

let player_x = canvas.width / 2 - half_tile
let row = [{x:min_left, y: half_tile, direction: 1}, {x: 3 * tile_width, y: enemy_height + half_tile, direction: -1},{x: min_left + half_tile,y: 2 * enemy_height + half_tile ,direction: 1}]
let ships = [[],[],[]]
let score = 0
let fuel = num_ships * 2

function Ship (spacing_x, spacing_y) {
    ship_image = new Image()
    ship_image.src = 'images/spaceship.png'
    ship_image.onload = () => {
        ctx.drawImage(ship_image, spacing_x, spacing_y, tile_width, tile_height);
    }
}
function initialize_enemies(){
    let new_x = -1
    for (let i=0; i < 3; i ++) {
        for (let j = 0; j < num_ships; j++) {
            new_x = enemy_width * j + row[i].x
            ships[i][j] = true
            console.log('initial ', ships[i][j])
            Ship(new_x, row[i].y)
        }
    }
}
function draw_row(row_x, row_y, row_number){
    let new_x = -1
    for (let j = 0; j < num_ships; j++) {
        new_x = enemy_width * j + row_x
        if (ships[row_number][j]) {
            Ship(new_x, row_y)
        }
    }
}

function draw_player(x){
    player = new Image()
    player.src = 'images/rocket.png'
    player.onload = () => {
        ctx.drawImage(player, x, player_y, tile_width, tile_height)
    }
}

function start_game () {
    console.log('game started')
    draw_player(player_x)
    initialize_enemies()
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
        draw_row(row[i].x, row[i].y, i)
    }
}

function animate_enemy() {
    setInterval(move_enemies,150)
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
function how_many_ships_hit(){
    let ship_hit = 0
    let ship_left = -1
    let ship_right = canvas.width + 10
    let laser_left = player_x + 43
    let laser_right = laser_left + 10
    for (let k = 2; k > -1; k--) {
        for (let j = 0; j < num_ships; j++) {
            ship_left = enemy_width * j + row[k].x
            ship_right = ship_left + tile_width
            if ((ship_left <= laser_right  & laser_right <= ship_right) || (ship_left <= laser_left & laser_left <= ship_right)) {
                if (ships[k][j]) {
                ships[k][j] = false
                ship_hit += 1
                }
            }
        }
    }
    return ship_hit
}
function clear_laser() {
    ctx.clearRect(player_x  + 43, 0, 10, player_y)
}
function draw_laser() {
    clear_laser()
    ctx.fillStyle = '#ffff00'
    ctx.fillRect(player_x + 43, 0, 10, player_y)
}
function shoot_laser () {
    let display_fuel
    if (fuel > 0) {
        draw_laser()
        let hits = how_many_ships_hit()
        score = hits * 200 + score
        fuel -= 1
        display_fuel = fuel
    } else {
        clear_laser()
        display_fuel = 'GAME OVER'
    }
    document.getElementById('score').innerHTML = score
    document.getElementById('fuel').innerHTML = display_fuel
}

window.addEventListener('load', (event) => {
    start_game()
})

