# Informe Detallado del Proyecto Cheese

## Descripción General

Este proyecto es una aplicación web interactiva desarrollada en JavaScript, HTML y CSS, cuyo objetivo es mostrar y animar diferentes tipos de quesos en un canvas. Incluye elementos visuales como un radar animado y efectos de sonido para mejorar la experiencia del usuario.

## Estructura de Archivos

- `index.html`: Archivo principal HTML que estructura la página y enlaza los scripts y estilos.
- `style.css`: Archivo de estilos para la apariencia visual de la web.
- `js/Classes.js`: Contiene la clase `Cheese` y la lógica para gestionar los diferentes tipos de quesos y su renderizado en el canvas.
- `js/index.js`: Controla la lógica principal de la animación, interacción y renderizado en el canvas.
- `js/eventListeners.js`: (Si existe) Gestiona los eventos de usuario como clics o movimientos.
- `img/cheese/`: Carpeta con imágenes PNG de los diferentes tipos de quesos.

## Funcionalidades Principales

- **Renderizado de Quesos:** Se pueden mostrar diferentes tipos de quesos en el canvas, cada uno con su imagen correspondiente.
- **Animación de Entrada:** El queso puede animarse para entrar en pantalla desde un lado.
- **Radar Animado:** Un elemento visual `.radar` cuyaº opacidad se anima según la interacción del usuario.
- **Interacción:** El usuario puede interactuar con el canvas (por ejemplo, tocando o moviendo el ratón) para activar animaciones y sonidos.
- **Sonido:** Se reproduce un sonido tipo "beep" cuando el radar está activo.

## Detalles Técnicos

- **Canvas:** Se utiliza un elemento `<canvas>` para dibujar y animar los quesos.
- **Clase Cheese:** Gestiona la carga de imágenes, el tipo de queso y el método `draw` para renderizar en el canvas.
- **Animaciones:** Se usan transiciones CSS para la opacidad del radar y `requestAnimationFrame` para animaciones en el canvas.
- **Carga de Imágenes:** Se asegura que las imágenes estén cargadas antes de dibujarlas para evitar errores.

## Ejemplo de Código Relevante

```javascript
// Animación de entrada del queso
if (cheeseEntering) {
  if (cheese.x < finalX) {
    cheese.x += 10;
    if (cheese.x > finalX) cheese.x = finalX;
  } else {
    cheeseEntering = false;
  }
  cheese.draw(c);
  return;
}
```

```css
.radar {
  transition: opacity 0.5s;
}
```

## Mejoras Posibles

- Agregar más tipos de quesos y animaciones.
- Mejorar la interacción con el usuario (por ejemplo, arrastrar quesos).
- Añadir una interfaz para seleccionar el tipo de queso.
- Optimizar la carga de imágenes y recursos.

## Créditos

Desarrollado por Zoraiz08.

---

Este informe resume la estructura, funcionalidades y aspectos técnicos del proyecto Cheese.