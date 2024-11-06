//Script para esconder o sidebar ao rolar até o topo
window.addEventListener("scroll", function() {
    const sideBar = document.getElementById("sideBar");
    const sidebarMenu = document.getElementById("sideBarMenu");
    if (window.scrollY > 250 && this.window.scrollY < 700) { 
        sideBar.style.display = "block";
        sidebarMenu.style.display = "block";
    }
    else { 
        sideBar.style.display = "none";
        sidebarMenu.style.display = "none"; 
    }
});