import { toggleLightMode } from "./scripts/button-interactions.js";

document.addEventListener("DOMContentLoaded", () => {
    const lightModeButton = document.getElementById("lightmode-button");
    const title = document.querySelector('.animated-title');
    const letters = title.querySelectorAll('span');
    
    lightModeButton.addEventListener("click", () => {
        toggleLightMode();
    })
    letters.forEach((letter, index) => {
        const angle = (360 / letters.length) * index;
        const radius = 100; // Puedes ajustar este valor para cambiar la distancia de las letras desde el centro
        const x = radius * Math.cos(angle * (Math.PI / 180));
        const y = radius * Math.sin(angle * (Math.PI / 180));
        
        letter.style.left = `calc(50% + ${x}px)`;
        letter.style.top = `calc(50% + ${y}px)`;
        letter.style.animationDelay = `${index * 0.2}s`; // Ajustar el delay de la animación para cada letra
    });
});
