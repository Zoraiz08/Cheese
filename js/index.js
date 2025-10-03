const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const radar = document.querySelector('.radar')

canvas.width = 400
canvas.height = 400

const cheese = new Cheese();

let touching = false;
let moved = false;
let typeChoosen = false;

// Web Audio API - Más confiable en iOS PWA
let audioContext = null;
let audioBuffer = null;
let sourceNode = null;
let isAudioReady = false;
let isPlaying = false;

// Inicializa Web Audio API
async function initAudio() {
  if (isAudioReady) return true;
  
  try {
    // Crea el contexto de audio (compatible con Safari)
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Resume el contexto si está suspendido (iOS lo requiere)
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    // Carga el archivo de audio
    const response = await fetch('beep-329314.mp3');
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    isAudioReady = true;
    console.log('🔊 Audio Web API listo');
    return true;
  } catch (error) {
    console.log('Error inicializando audio:', error);
    return false;
  }
}

// Reproduce el beep en loop
function playBeep() {
  if (!isAudioReady || !audioBuffer || isPlaying) return;
  
  try {
    // Crea un source node
    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true; // Loop infinito
    
    // Control de volumen
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5; // Volumen al 50%
    
    // Conecta: source -> gain -> destination
    sourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Reproduce
    sourceNode.start(0);
    isPlaying = true;
    console.log('🔊 Beep iniciado');
  } catch (error) {
    console.log('Error reproduciendo beep:', error);
    isPlaying = false;
  }
}

// Detiene el beep
function stopBeep() {
  if (!isPlaying || !sourceNode) return;
  
  try {
    sourceNode.stop();
    sourceNode.disconnect();
    sourceNode = null;
    isPlaying = false;
    console.log('🔇 Beep detenido');
  } catch (error) {
    console.log('Error deteniendo beep:', error);
  }
}

// Inicializa el audio con cualquier interacción del usuario
const initOnTouch = async () => {
  const success = await initAudio();
  if (success) {
    // Remueve los listeners una vez inicializado
    document.removeEventListener('touchstart', initOnTouch);
    document.removeEventListener('touchend', initOnTouch);
    document.removeEventListener('click', initOnTouch);
  }
};

document.addEventListener('touchstart', initOnTouch);
document.addEventListener('touchend', initOnTouch);
document.addEventListener('click', initOnTouch);

// También intenta al cargar
window.addEventListener('load', initAudio);

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = 'rgb(211, 203, 89)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  if (touching) {
    radar.style.opacity = '1'
    
    // Intenta inicializar audio si no está listo
    if (!isAudioReady) {
      initAudio();
    }
    
    // Reproduce el beep si está listo y no está sonando
    if (isAudioReady && !isPlaying) {
      playBeep();
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
    if (isPlaying) {
      stopBeep();
    }
  }
}

animate()