let lastX = null;
let lastY = null;
const threshold = 10; 


window.addEventListener('touchstart', (event) => {
  touching = true;
  const touch = event.touches[0];
  lastX = touch.clientX; // reinicia aquí
  lastY = touch.clientY;

  beep.play().then(() => {
            beep.pause();
            beep.currentTime = 0;
            console.log("Audio desbloqueado en iOS");
     });
}, { once: true 

});

window.addEventListener('touchmove', (event) => {
  const touch = event.touches[0];
  if (lastX !== null && lastY !== null) {
    const dx = touch.clientX - lastX;
    const dy = touch.clientY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > threshold) {
      console.log("Movimiento grande detectado:", distance);
      moved = true;
    }
  }
  lastX = touch.clientX;
  lastY = touch.clientY;
});

window.addEventListener('touchend', () => {
  touching = false;
  // NO reseteamos lastX / lastY aquí
});

window.addEventListener('mousedown', (event) => {
    touching = true
})

window.addEventListener("mousemove", (e) => {
  if (lastX !== null && lastY !== null) {
    const dx = e.clientX - lastX; // cambio en X
    const dy = e.clientY - lastY; // cambio en Y
    const distance = Math.sqrt(dx * dx + dy * dy); // distancia total

    if (distance > threshold) {
        console.log("Movimiento grande detectado:", distance);
        moved = true;
    }
  }

  // Actualiza la última posición
  lastX = e.clientX;
  lastY = e.clientY;
});

window.addEventListener('mouseup', (event) => {
    touching = false
})