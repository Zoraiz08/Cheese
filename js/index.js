const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const radar = document.querySelector('.radar')

const beep = new Audio('beep-329314.mp3')
beep.volume = 0.5
canvas.width = 400
canvas.height = 400

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)
const cheese = new Cheese({ x: 50, y: 50 });

let touching = false;
let moved = false;
let typeChoosen = false;


function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = 'rgb(211, 203, 89)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  if (touching) {
    radar.style.opacity = '1' // animar
    beep.play()
    if(moved){
        if (typeChoosen === false) {
            cheese.chooseType()
        }
        cheese.draw(c)
        radar.style.opacity = '0.5' // animar
    }



  } else {
    moved = false
    typeChoosen = false
    radar.style.opacity = '0' // animar
  }


}
animate()
