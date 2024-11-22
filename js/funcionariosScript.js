// Função para carregar os dados do JSON
async function carregarHorarios() {
    try {
        const response = await fetch('./horario.json'); // Certifique-se de que horarios.json está na mesma pasta
        if (!response.ok) throw new Error('Erro ao carregar o arquivo JSON');
        const horarios = await response.json();
        gerarTabela(horarios);
    } catch (error) {
        console.error('Erro ao carregar os horários:', error);
    }
}

function gerarTabela(horarios) {
    const tabelaBody = document.querySelector('#tabelaHorarios tbody');
    let odr = 1;

    horarios.horarios_funcionarios[0].funcionarios.forEach(funcionario => {
        const tr = document.createElement('tr');

        // Se há observações, aplica colspan
        if (funcionario.obs) {
            const tdObs = document.createElement('td');
            tdObs.colSpan = 9;
            tdObs.textContent = `${funcionario.nome} (${funcionario.obs})`;
            tr.appendChild(tdObs);
            tabelaBody.appendChild(tr);
            return; // Pula para o próximo funcionário
        }

        // Coluna ODR
        const tdOdr = document.createElement('td');
        tdOdr.textContent = odr++;
        tr.appendChild(tdOdr);

        // Coluna Nome
        const tdNome = document.createElement('td');
        tdNome.textContent = funcionario.nome;
        tr.appendChild(tdNome);

        // Coluna Cargo
        const tdCargo = document.createElement('td');
        tdCargo.textContent = funcionario.cargo;
        tr.appendChild(tdCargo);

        if (funcionario.cat === 'APOIO') {
            // Categoria APOIO - Colspan em HTPC
            const tdEntrada = document.createElement('td');
            tdEntrada.textContent = funcionario.entrada.join(', ');
            tr.appendChild(tdEntrada);

            const tdAlmocoIn = document.createElement('td');
            tdAlmocoIn.textContent = funcionario.almocoIn || '-';
            tr.appendChild(tdAlmocoIn);

            const tdAlmocoOut = document.createElement('td');
            tdAlmocoOut.textContent = funcionario.almocoOut || '-';
            tr.appendChild(tdAlmocoOut);

            const tdSaida = document.createElement('td');
            tdSaida.textContent = funcionario.saida.join(', ');
            tr.appendChild(tdSaida);

            const tdHtpc = document.createElement('td');
            tdHtpc.colSpan = 2;
            tdHtpc.textContent = '-';
            tr.appendChild(tdHtpc);
        } else if (funcionario.cat === 'MAGISTÉRIO') {
            // Categoria MAGISTÉRIO
            const tdEntrada = document.createElement('td');
            tdEntrada.textContent = funcionario.entrada.join(', ');
            tr.appendChild(tdEntrada);

            const tdAlmoco = document.createElement('td');
            tdAlmoco.colSpan = 2;
            tdAlmoco.textContent = `${funcionario.almocoIn} - ${funcionario.almocoOut}`;
            tr.appendChild(tdAlmoco);

            const tdSaida = document.createElement('td');
            tdSaida.textContent = funcionario.saida.join(', ');
            tr.appendChild(tdSaida);

            const tdHtpcIn = document.createElement('td');
            tdHtpcIn.textContent = funcionario.htpcIn.join(', ') || '-';
            tr.appendChild(tdHtpcIn);

            const tdHtpcOut = document.createElement('td');
            tdHtpcOut.textContent = funcionario.htpcOut.join(', ') || '-';
            tr.appendChild(tdHtpcOut);
        }

        tabelaBody.appendChild(tr);
    });
}

// Chamada inicial
carregarHorarios();