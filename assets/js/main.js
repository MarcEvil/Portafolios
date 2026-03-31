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
                if (index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * 42)];
            })
            .join("");

        if (iteration >= originalText.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;
    }, 30);
};

// Observador para activar la animación al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            scrambleText(entry.target);
            observer.unobserve(entry.target); // Animación solo una vez
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hacker-effect').forEach(el => {
    el.dataset.value = el.innerText; // Guarda el texto real
    observer.observe(el);
});