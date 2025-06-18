document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value.trim();
    const setor = document.getElementById('setor').value.trim();
    const usuario = document.getElementById('usuario').value;
    const prioridade = document.getElementById('propriedade').value;

    if (!descricao || !setor || !usuario || !prioridade) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novaTarefa = {
      descricao,
      setor,
      usuario,
      prioridade,
      dataCadastro: new Date().toLocaleString()
    };

    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefasSalvas.push(novaTarefa);

    localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));

    alert('Tarefa cadastrada com sucesso!');

    form.reset(); 
  });
});
