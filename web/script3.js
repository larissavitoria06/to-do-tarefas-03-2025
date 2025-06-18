document.addEventListener('DOMContentLoaded', () => {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

  const colunas = {
    'a-fazer': document.querySelector('#to-do-title').parentElement,
    'fazendo': document.querySelector('#in-progress-title').parentElement,
    'pronto': document.querySelector('#done-title').parentElement,
  };

  tarefas.forEach((tarefa, index) => {
    const status = tarefa.status || 'a-fazer';

    const card = document.createElement('article');
    card.className = 'task-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Tarefa de prioridade ${tarefa.prioridade}`);

    card.innerHTML = `
      <div class="task-info"><strong>Descrição:</strong> ${tarefa.descricao}</div>
      <div class="task-info"><strong>Setor:</strong> ${tarefa.setor}</div>
      <div class="task-info"><strong>Prioridade:</strong> ${tarefa.prioridade}</div>
      <div class="task-info"><strong>Vinculado a:</strong> ${tarefa.usuario}</div>
      <div class="task-actions">
        <button type="button" class="action-btn edit">Editar</button>
        <button type="button" class="action-btn delete">Excluir</button>
      </div>
      <form data-index="${index}">
        <fieldset class="status-radio-group">
          <legend class="sr-only">Status da tarefa</legend>
          <label><input type="radio" name="status${index}" value="a-fazer" ${status === 'a-fazer' ? 'checked' : ''}> A fazer</label>
          <label><input type="radio" name="status${index}" value="fazendo" ${status === 'fazendo' ? 'checked' : ''}> Fazendo</label>
          <label><input type="radio" name="status${index}" value="pronto" ${status === 'pronto' ? 'checked' : ''}> Pronto</label>
        </fieldset>
        <button type="submit" class="change-status-btn">Alterar Status</button>
      </form>
    `;

    colunas[status].appendChild(card);
  });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const index = form.dataset.index;
      const novoStatus = form.querySelector('input[type="radio"]:checked').value;

      tarefas[index].status = novoStatus;
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      location.reload();
    });
  });

  document.querySelectorAll('.delete').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      if (confirm('Deseja excluir esta tarefa?')) {
        tarefas.splice(i, 1);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        location.reload();
      }
    });
  });
});
