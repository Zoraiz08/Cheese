const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const radar = document.querySelector('.radar')

const beep = new Audio('beep-329314.mp3')
beep.volume = 0.5
beep.loop = true
canvas.width = 400
canvas.height = 400

const cheese = new Cheese();

let touching = false;
let moved = false;
let typeChoosen = false;
let audioUnlocked = false;

// Función simple para desbloquear audio
async function unlockAudio() {
  if (audioUnlocked) return;
  
  try {
    beep.load();
    await beep.play();
    beep.pause();
    beep.currentTime = 0;
    audioUnlocked = true;
    console.log('🔊 Audio desbloqueado');
  } catch (error) {
    console.log('Audio se desbloqueará en el próximo toque');
  }
}

// Intenta desbloquear en CUALQUIER interacción
document.addEventListener('touchstart', unlockAudio);
document.addEventListener('touchend', unlockAudio);
document.addEventListener('mousedown', unlockAudio);
document.addEventListener('click', unlockAudio);

// También intenta al cargar
window.addEventListener('load', unlockAudio);

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = 'rgb(211, 203, 89)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  if (touching) {
    radar.style.opacity = '1'
    
    // Intenta desbloquear si aún no está
    if (!audioUnlocked) {
      unlockAudio();
    }
    
    // Inicia el beep continuo si está pausado
    if (beep.paused && audioUnlocked) {
      beep.play().catch(error => {
        console.log('Error reproduciendo beep:', error);
        // Intenta desbloquear de nuevo
        audioUnlocked = false;
      });
    }
    
    if(moved){
        if (typeChoosen === false) {
            cheese.chooseType()
        }
        cheese.draw(c)
        radar.style.opacity = '0.5'
    }

  } else {
    moved = false
    typeChoosen = false
    radar.style.opacity = '0'
    
    // Detiene el beep cuando dejas de tocar
    if (!beep.paused) {
      beep.pause();
      beep.currentTime = 0;
    }
  }
}

animate()