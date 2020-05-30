const canvas = document.querySelector('screen')
const ctx = canvas.getContext('2d')
let img = new Image();
img.src = './images/spaceship.png'
drawImage(img, 10, 10)