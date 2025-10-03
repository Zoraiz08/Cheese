const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const beep = new Audio('beep-329314.mp3')
canvas.width = 576
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)
const cheese = new Cheese({ x: 100, y: 100 });

let touching = false;
let moved = false;


function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  if (touching) {
    beep.play()
  } else {moved = false}
  if(moved && touching){
    cheese.draw(c)
  }

}
animate()
