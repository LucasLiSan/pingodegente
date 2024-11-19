// Carregar o JSON e preencher o HTML
document.addEventListener("DOMContentLoaded", () => {
    // Caminho para o arquivo JSON
    const jsonPath = "projetos.json";

    // Selecionar o elemento onde os projetos serão inseridos
    const projectsArticle = document.getElementById("projectsArticle");

    // Função para criar o HTML de cada projeto
    const createProjectHTML = (projeto) => {
        // Criação dos elementos dinamicamente
        const section = document.createElement("section");
        section.classList.add("projectsSection");

        // Cabeçalho do projeto
        const header = document.createElement("h1");
        header.textContent = projeto.projeto;
        section.appendChild(header);

        // Container de imagens (Rotator)
        const projectsContainer = document.createElement("div");
        projectsContainer.classList.add("projectsContainer");

        const rotatorWrap = document.createElement("div");
        rotatorWrap.classList.add("rotator-wrap");

        const rotator = document.createElement("ul");
        rotator.classList.add("rotator");

        // Adiciona cada imagem
        projeto.fotos.forEach((foto) => {
            const li = document.createElement("li");
            const div = document.createElement("div");
            const img = document.createElement("img");
            img.src = `assets/imgs/Projetos/${foto}`;
            img.alt = foto;
            div.appendChild(img);
            li.appendChild(div);
            rotator.appendChild(li);
        });

        rotatorWrap.appendChild(rotator);
        projectsContainer.appendChild(rotatorWrap);
        section.appendChild(projectsContainer);

        // Descrição do projeto
        const projectsDescription = document.createElement("div");
        projectsDescription.classList.add("projectsDescription");

        const projectGroup = document.createElement("h3");
        projectGroup.classList.add("projectGroup");
        projectGroup.textContent = projeto.participantes.join(", ");

        const projectDescription = document.createElement("p");
        projectDescription.classList.add("projectDescription");
        projectDescription.textContent = projeto.descricao;

        projectsDescription.appendChild(projectGroup);
        projectsDescription.appendChild(projectDescription);
        section.appendChild(projectsDescription);

        return section;
    };

    // Carregar e preencher os dados
    fetch(jsonPath)
        .then((response) => response.json())
        .then((data) => {
            const { projetos_escolares } = data;

            // Itera sobre os projetos e os insere no HTML
            projetos_escolares.forEach((projeto) => {
                const projectHTML = createProjectHTML(projeto);
                projectsArticle.appendChild(projectHTML);
            });
        })
        .catch((error) => console.error("Erro ao carregar o JSON:", error));
});
