const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const radar = document.querySelector('.radar')

const beep = new Audio('beep-329314.mp3')
beep.volume = 0.5
beep.loop = true // Loop continuo
canvas.width = 400
canvas.height = 400

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)
const cheese = new Cheese({ x: 50, y: 50 });

let touching = false;
let moved = false;
let typeChoosen = false;
let audioUnlocked = false;

// Función para desbloquear audio en iOS
function unlockAudio() {
  if (audioUnlocked) return;
  
  // Pre-carga el audio
  beep.load();
  
  // Intenta reproducir y pausar inmediatamente (desbloquea iOS)
  const playPromise = beep.play();
  
  if (playPromise !== undefined) {
    playPromise.then(() => {
      beep.pause();
      beep.currentTime = 0;
      audioUnlocked = true;
      console.log('🔊 Audio desbloqueado para iOS');
    }).catch(error => {
      console.log('Esperando interacción para desbloquear audio...', error);
    });
  }
}

// Desbloquea el audio al primer toque (crítico para iOS)
document.addEventListener('touchstart', unlockAudio, { once: true });
document.addEventListener('mousedown', unlockAudio, { once: true });

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = 'rgb(211, 203, 89)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  if (touching) {
    radar.style.opacity = '1' // animar
    
    // Inicia el beep continuo si está pausado
    if (beep.paused) {
      beep.play().catch(error => {
        console.log('Error reproduciendo beep:', error);
      });
    }
    
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
    
    // Detiene el beep cuando dejas de tocar
    if (!beep.paused) {
      beep.pause();
      beep.currentTime = 0; // Reinicia para la próxima vez
    }
  }

}
animate()