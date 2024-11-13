//Script de efeito de rolagem
document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
        var scrollPosition = window.scrollY;
        var halfWindowHeight = window.innerHeight / 2;
        var page1Top = 350;
        var page2Top = document.querySelector('.page2').offsetTop - halfWindowHeight;
        var page3Top = document.querySelector('.page3').offsetTop - halfWindowHeight;
        var page4Top = document.querySelector('.page4').offsetTop - halfWindowHeight;

        if (scrollPosition > page1Top && scrollPosition < page2Top) {
            document.querySelector('.page1-title').classList.add('page1-title-active');
            document.querySelector('.page1-desc').classList.add('page1-desc-active');
            document.querySelector('.plate1').classList.add('plate1-active');

            document.querySelector('.pg2-green-back').classList.remove('pg2-green-back-active');
            document.querySelector('.pg2-white-desc').classList.remove('pg2-white-desc-active');
            document.querySelector('.pg2-photo-wrap').classList.remove('pg2-photo-wrap-active');
            document.querySelector('.pg2-photo').classList.remove('pg2-photo-active');
            document.querySelector('.grapes').classList.remove('grapes-active');

            document.querySelector('.pg3-red-back').classList.remove('pg3-red-back-active');
            document.querySelector('.pg3-white-desc').classList.remove('pg3-white-desc-active');
            document.querySelector('.pg3-photo-wrap').classList.remove('pg3-photo-wrap-active');
            document.querySelector('.pg3-photo').classList.remove('pg3-photo-active');
            document.querySelector('.leafs').classList.remove('leafs-active');

            document.querySelector('.pg4-bezh-back').classList.remove('pg4-bezh-back-active');
            document.querySelector('.pg4-white-desc').classList.remove('pg4-white-desc-active');
            document.querySelector('.pg4-photo-wrap').classList.remove('pg4-photo-wrap-active');
            document.querySelector('.pg4-photo').classList.remove('pg4-photo-active');
            document.querySelector('.dessert').classList.remove('dessert-active');
        } else if (scrollPosition > page2Top && scrollPosition < page3Top) {
            document.querySelector('.pg2-green-back').classList.add('pg2-green-back-active');
            document.querySelector('.pg2-white-desc').classList.add('pg2-white-desc-active');
            document.querySelector('.pg2-photo-wrap').classList.add('pg2-photo-wrap-active');
            document.querySelector('.pg2-photo').classList.add('pg2-photo-active');
            document.querySelector('.grapes').classList.add('grapes-active');

            document.querySelector('.page1-title').classList.remove('page1-title-active');
            document.querySelector('.page1-desc').classList.remove('page1-desc-active');
            document.querySelector('.plate1').classList.remove('plate1-active');

            document.querySelector('.pg3-red-back').classList.remove('pg3-red-back-active');
            document.querySelector('.pg3-white-desc').classList.remove('pg3-white-desc-active');
            document.querySelector('.pg3-photo-wrap').classList.remove('pg3-photo-wrap-active');
            document.querySelector('.pg3-photo').classList.remove('pg3-photo-active');
            document.querySelector('.leafs').classList.remove('leafs-active');

            document.querySelector('.pg4-bezh-back').classList.remove('pg4-bezh-back-active');
            document.querySelector('.pg4-white-desc').classList.remove('pg4-white-desc-active');
            document.querySelector('.pg4-photo-wrap').classList.remove('pg4-photo-wrap-active');
            document.querySelector('.pg4-photo').classList.remove('pg4-photo-active');
            document.querySelector('.dessert').classList.remove('dessert-active');
        } else if (scrollPosition > page3Top && scrollPosition < page4Top) {
            document.querySelector('.pg3-red-back').classList.add('pg3-red-back-active');
            document.querySelector('.pg3-white-desc').classList.add('pg3-white-desc-active');
            document.querySelector('.pg3-photo-wrap').classList.add('pg3-photo-wrap-active');
            document.querySelector('.pg3-photo').classList.add('pg3-photo-active');
            document.querySelector('.leafs').classList.add('leafs-active');

            document.querySelector('.page1-title').classList.remove('page1-title-active');
            document.querySelector('.page1-desc').classList.remove('page1-desc-active');
            document.querySelector('.plate1').classList.remove('plate1-active');

            document.querySelector('.pg2-green-back').classList.remove('pg2-green-back-active');
            document.querySelector('.pg2-white-desc').classList.remove('pg2-white-desc-active');
            document.querySelector('.pg2-photo-wrap').classList.remove('pg2-photo-wrap-active');
            document.querySelector('.pg2-photo').classList.remove('pg2-photo-active');
            document.querySelector('.grapes').classList.remove('grapes-active');

            document.querySelector('.pg4-bezh-back').classList.remove('pg4-bezh-back-active');
            document.querySelector('.pg4-white-desc').classList.remove('pg4-white-desc-active');
            document.querySelector('.pg4-photo-wrap').classList.remove('pg4-photo-wrap-active');
            document.querySelector('.pg4-photo').classList.remove('pg4-photo-active');
            document.querySelector('.dessert').classList.remove('dessert-active');
        } else if (scrollPosition > page4Top) {
            document.querySelector('.pg4-bezh-back').classList.add('pg4-bezh-back-active');
            document.querySelector('.pg4-white-desc').classList.add('pg4-white-desc-active');
            document.querySelector('.pg4-photo-wrap').classList.add('pg4-photo-wrap-active');
            document.querySelector('.pg4-photo').classList.add('pg4-photo-active');
            document.querySelector('.dessert').classList.add('dessert-active');

            document.querySelector('.page1-title').classList.remove('page1-title-active');
            document.querySelector('.page1-desc').classList.remove('page1-desc-active');
            document.querySelector('.plate1').classList.remove('plate1-active');

            document.querySelector('.pg2-green-back').classList.remove('pg2-green-back-active');
            document.querySelector('.pg2-white-desc').classList.remove('pg2-white-desc-active');
            document.querySelector('.pg2-photo-wrap').classList.remove('pg2-photo-wrap-active');
            document.querySelector('.pg2-photo').classList.remove('pg2-photo-active');
            document.querySelector('.grapes').classList.remove('grapes-active');

            document.querySelector('.pg3-red-back').classList.remove('pg3-red-back-active');
            document.querySelector('.pg3-white-desc').classList.remove('pg3-white-desc-active');
            document.querySelector('.pg3-photo-wrap').classList.remove('pg3-photo-wrap-active');
            document.querySelector('.pg3-photo').classList.remove('pg3-photo-active');
            document.querySelector('.leafs').classList.remove('leafs-active');
        }
    });
});


//Script para o cardápio do dia
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Carregar o arquivo JSON
        const response = await fetch('cardapio.json');
        const data = await response.json();

        // Obter data atual
        const hoje = new Date();
        const diaAtual = hoje.getDate();
        const mesAtual = hoje.toLocaleString('pt-BR', { month: 'long' });
        const anoAtual = hoje.getFullYear();

        // Procurar os dados do dia atual no JSON
        const cardapioRegular = data.cardapio_regular.find(item => 
            item.mes.toLowerCase() === mesAtual.toLowerCase() && item.ano === anoAtual
        );

        if (cardapioRegular) {
            const diaData = cardapioRegular.dias.find(d => d.dia === diaAtual);

            if (diaData) {
                // Título com a data
                document.querySelector('.page1-desc h3').textContent = `${diaAtual} de ${mesAtual}`;

                // Desjejum
                const desjejumContainer = document.querySelector('.page2 .pg2-white-desc');
                desjejumContainer.innerHTML = "<hr class='hr1'><h3>DESJEJUM</h3><hr class='hr2'>";

                diaData.desjejum.forEach(item => {
                    const p = document.createElement("p");
                    p.textContent = `${item.item1} & ${item.item2}`;
                    desjejumContainer.appendChild(p);
                    desjejumContainer.appendChild(document.createElement("hr"));
                });

                // Almoço
                const almocoContainer = document.querySelector('.page3 .pg3-white-desc');
                almocoContainer.innerHTML = `<hr class="hr1"><h3>ALMOÇO</h3><hr class="hr2"><h2>${diaData.almoco[0].prato_do_dia}</h2><hr class="hr3">`;

                diaData.almoco[0].almoco_do_dia.forEach(almocoItems => {
                    let almocoText = '';
                    let i = 1;
                    
                    // Adicionar todos os itens de almoco_do_dia dinamicamente
                    while (almocoItems[`item${i}`]) {
                        almocoText += `${almocoItems[`item${i}`]} & `;
                        i++;
                    }
                    
                    // Remover o último "& " extra e adicionar ao contêiner
                    almocoText = almocoText.slice(0, -3);
                    const p = document.createElement("p");
                    p.textContent = almocoText;
                    almocoContainer.appendChild(p);
                    almocoContainer.appendChild(document.createElement("hr"));
                });

                // Sobremesa
                const sobremesaContainer = document.querySelector('.page4 .pg4-white-desc');
                sobremesaContainer.innerHTML = "<hr class='hr1'><h3>SOBREMESA</h3><hr class='hr2'>";

                diaData.sobremesa.forEach(item => {
                    const h2 = document.createElement("h2");
                    h2.textContent = item.item1;
                    sobremesaContainer.appendChild(h2);
                    sobremesaContainer.appendChild(document.createElement("hr"));
                });
            }
        }
    } catch (error) {
        console.error('Erro ao carregar o cardápio:', error);
    }
});
