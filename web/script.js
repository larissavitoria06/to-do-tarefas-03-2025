const carros = [
    { id: 1, nome: 'Fiat Uno', preco: 100 },
    { id: 2, nome: 'Volkswagen Gol', preco: 120 },
    { id: 3, nome: 'Chevrolet Onix', preco: 150 }
];

const form = document.getElementById('form-cadastro');
const selectCarro = document.getElementById('carro');

carros.forEach(carro => {
    const option = document.createElement('option');
    option.value = carro.id;
    option.textContent = carro.nome;
    selectCarro.appendChild(option);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('cliente').value;
    const cpf = document.getElementById('cpf').value;
    const dataLocacao = document.getElementById('data-locacao').value;
    const dataDevolucao = document.getElementById('data-devolucao').value;
    const carroId = parseInt(selectCarro.value);

    if (!carroId) {
        alert('Selecione um carro!');
        return;
    }

    const carroSelecionado = carros.find(carro => carro.id === carroId);

    const locacao = {
        nome,
        cpf,
        dataLocacao,
        dataDevolucao,
        carro: carroSelecionado
    };

    const locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
    locacoes.push(locacao);
    localStorage.setItem('locacoes', JSON.stringify(locacoes));

    alert('Locação cadastrada com sucesso!');
    form.reset();
});