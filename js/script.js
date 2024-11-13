//Script para esconder o sidebar ao rolar até o topo
window.addEventListener("scroll", function() {
    const sideBar = document.getElementById("sideBar");
    const sidebarMenu = document.getElementById("sideBarMenu");
    const articleWidth = document.getElementsByTagName("article")[0];

    // Verifica se a largura da tela é maior que 768px
    if (window.innerWidth > 768) {
        if (window.scrollY > 250 && window.scrollY < 700) { 
            sideBar.style.display = "block";
            sidebarMenu.style.display = "flex";
            articleWidth.style.width = "85%";
        } else { 
            sideBar.style.display = "none";
            sidebarMenu.style.display = "none";
            articleWidth.style.width = "100%";
        }
    } else {
        // Garante que o sidebar permaneça oculto em telas pequenas
        sideBar.style.display = "none";
        sidebarMenu.style.display = "none";
        articleWidth.style.width = "100%";
    }
});

//Script navbar responsiva
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.navBar').classList.toggle('active');
});