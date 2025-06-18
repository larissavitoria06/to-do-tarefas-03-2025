document.getElementById('form-cadastro').addEventListener('submit', async function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  try {
    const response = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email })
    });

    
    const cadastroSalvo = JSON.parse(localStorage.getItem('cadastro')) || [];

    cadastroSalvo.push(novocadastro);

    localStorage.setItem('cadastro', JSON.stringify(cadastroSalvo));

    if (response.ok) {
      alert(' cadastrado com sucesso!');
      this.reset();
    } else {
      alert('Erro ao cadastrar usuário');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar ao servidor');
  }
});
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
 
  });
});
