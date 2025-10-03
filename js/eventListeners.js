let lastX = null;
let lastY = null;

const threshold = 10; // píxeles mínimos de diferencia para considerarlo "grande"

// Touch events
window.addEventListener('touchstart', (event) => {
    touching = true

})
window.addEventListener('mousedown', (event) => {
    touching = true
})
// mouse move and touch move events
window.addEventListener('touchmove', (event) => {
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
})  // Fin del evento touchmove



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

// Mouse up and touch end events
window.addEventListener('touchend', (event) => {
    touching = false
})
window.addEventListener('mouseup', (event) => {
    touching = false
})