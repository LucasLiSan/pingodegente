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


// Script para o cardápio do dia
document.addEventListener("DOMContentLoaded", async () => {
    let currentDate = new Date();

    const loadCardapio = async (date) => {
        try {
            // Carregar o arquivo JSON
            const response = await fetch('cardapio.json');
            const data = await response.json();

            // Obter data atual em formato compatível com JSON
            const diaAtual = date.getDate();
            const mesAtual = date.toLocaleString('pt-BR', { month: 'long' });
            const anoAtual = date.getFullYear();

            // Procurar os dados do mês e ano no JSON
            const cardapioRegular = data.cardapio_regular.find(item => 
                item.mes.toLowerCase() === mesAtual.toLowerCase() && item.ano === anoAtual
            );

            if (cardapioRegular) {
                const diaData = cardapioRegular.dias.find(d => d.dia === diaAtual);

                if (diaData) {
                    // Atualizar a data exibida no cabeçalho
                    document.querySelector('#day').textContent = diaAtual;
                    document.querySelector('#mouth').textContent = mesAtual;

                    // Configurar imagem do Desjejum
                    const desjejumContainer = document.querySelector('.page2 .pg2-white-desc');
                    desjejumContainer.innerHTML = "<hr class='hr1'><h3>DESJEJUM</h3><hr class='hr2'>";
                    diaData.desjejum.forEach(desjejumItems => {
                        let desjejumText = '';
                        let i = 1;

                        // Itera dinamicamente sobre os itens de desjejum
                        while (desjejumItems[`item${i}`]) {
                            desjejumText += `${desjejumItems[`item${i}`]} & `;
                            i++;
                        }

                        // Remove o último "& " extra
                        desjejumText = desjejumText.slice(0, -3);
                        const p = document.createElement("p");
                        p.textContent = desjejumText;
                        desjejumContainer.appendChild(p);
                        desjejumContainer.appendChild(document.createElement("hr"));

                        // Definir imagem de fundo para Desjejum
                        if (desjejumItems.pic) {
                            document.querySelector('.pg2-photo').style.backgroundImage = `url("/assets/imgs/Cardapio/${desjejumItems.pic}")`;
                        }
                    });

                    // Configurar imagem do Almoço
                    const almocoContainer = document.querySelector('.page3 .pg3-white-desc');
                    almocoContainer.innerHTML = `<hr class="hr1"><h3>ALMOÇO</h3><hr class="hr2"><h2>${diaData.almoco[0].prato_do_dia}</h2><hr class="hr3">`;
                    diaData.almoco[0].almoco_do_dia.forEach(almocoItems => {
                        let almocoText = '';
                        let i = 1;
                        while (almocoItems[`item${i}`]) {
                            almocoText += `${almocoItems[`item${i}`]} & `;
                            i++;
                        }
                        almocoText = almocoText.slice(0, -3);
                        const p = document.createElement("p");
                        p.textContent = almocoText;
                        almocoContainer.appendChild(p);
                        almocoContainer.appendChild(document.createElement("hr"));
                    });

                    // Definir imagem de fundo para Almoço
                    if (diaData.almoco[0].pic) {
                        document.querySelector('.pg3-photo').style.backgroundImage = `url("/assets/imgs/Cardapio/${diaData.almoco[0].pic}")`;
                    }

                    // Configurar imagem da Sobremesa
                    const sobremesaContainer = document.querySelector('.page4 .pg4-white-desc');
                    sobremesaContainer.innerHTML = "<hr class='hr1'><h3>SOBREMESA</h3><hr class='hr2'>";
                    diaData.sobremesa.forEach(sobremesaItems => {
                        let sobremesaText = '';
                        let i = 1;

                        // Itera dinamicamente sobre os itens de sobremesa
                        while (sobremesaItems[`item${i}`]) {
                            sobremesaText += `${sobremesaItems[`item${i}`]} & `;
                            i++;
                        }

                        // Remove o último "& " extra
                        sobremesaText = sobremesaText.slice(0, -3);
                        const h2 = document.createElement("h2");
                        h2.textContent = sobremesaText;
                        sobremesaContainer.appendChild(h2);
                        sobremesaContainer.appendChild(document.createElement("hr"));

                        // Definir imagem de fundo para Sobremesa
                        if (sobremesaItems.pic) {
                            document.querySelector('.pg4-photo').style.backgroundImage = `url("/assets/imgs/Cardapio/${sobremesaItems.pic}")`;
                        }
                    });
                } else {
                    console.log('Nenhum cardápio encontrado para o dia selecionado.');
                }
            }
        } catch (error) {
            console.error('Erro ao carregar o cardápio:', error);
        }
    };

    // Carregar o cardápio do dia atual inicialmente
    await loadCardapio(currentDate);

    // Funções de navegação entre os dias
    document.getElementById("prevDay").addEventListener("click", async () => {
        currentDate.setDate(currentDate.getDate() - 1);
        await loadCardapio(currentDate);
    });

    document.getElementById("nextDay").addEventListener("click", async () => {
        currentDate.setDate(currentDate.getDate() + 1);
        await loadCardapio(currentDate);
    });
});
