document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os links dentro das <li>
    const navLinks = document.querySelectorAll(".mainTransparencia ul li a");
    const sections = document.querySelectorAll(".mainTransparencia article section");

    // Função para mostrar a seção correspondente e esconder as outras
    const showSection = (sectionId) => {
        sections.forEach((section) => {
            if (section.id === sectionId) {
                section.style.display = "block"; // Exibe a seção correspondente
            } else {
                section.style.display = "none"; // Oculta as demais
            }
        });
    };

    // Adiciona o evento de clique aos links
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Evita o comportamento padrão do link
            const targetId = link.getAttribute("href"); // Obtém o ID do link
            showSection(targetId); // Exibe a seção correspondente
        });
    });

    // Exibe apenas a primeira seção ao carregar a página
    if (sections.length > 0) {
        showSection(sections[0].id);
    }
});