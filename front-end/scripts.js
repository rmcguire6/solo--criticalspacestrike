function draw() {
    let ctx = document.getElementById('screen').getContext('2d')
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 9; j++) {
            ctx.save();
            ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
            ctx.translate(10 + j * 100, 10 + i * 200);
            ctx.fillRect(0, 0, 50, 100);
            ctx.restore();
        }
    }
}