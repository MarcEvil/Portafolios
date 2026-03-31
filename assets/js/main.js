/**
 * M_MARDONES.SYS - Hacker Animation Engine
 */

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const scrambleText = (element) => {
    let iteration = 0;
    const originalText = element.dataset.value;
    let interval = null;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
        element.innerText = element.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");
        
        if(iteration >= originalText.length) {
            clearInterval(interval);
        }
        
        iteration += 1 / 3;
    }, 30);
};

// Configurar elementos con el efecto al cargar
document.addEventListener("DOMContentLoaded", () => {
    const hackerElements = document.querySelectorAll('.hacker-effect');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Guardar el valor original si no existe
                if (!entry.target.dataset.value) {
                    entry.target.dataset.value = entry.target.innerText;
                }
                scrambleText(entry.target);
                // Si quieres que solo pase una vez, descomenta la siguiente línea:
                // observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });

    hackerElements.forEach(el => {
        el.dataset.value = el.innerText;
        observer.observe(el);
    });
});
