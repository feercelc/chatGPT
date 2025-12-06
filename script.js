// Animação: aparece enquanto rola
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll(".story, .image-section").forEach(el => {
    observer.observe(el);
});

// Botão secreto no rodapé
document.getElementById("magicButton").addEventListener("click", () => {
    alert("✨ Final secreto desbloqueado: você oficialmente sobreviveu à LORE DOS GIFS ✨");
});
