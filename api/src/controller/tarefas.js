import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastroTarefa = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [usuario, setUsuario] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.log('Erro ao carregar os usuários', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!nome || !descricao || !prioridade || !usuario) {
      setErrors(['Todos os campos são obrigatórios']);
      return;
    }

    try {
      const resposta = await axios.post('http://localhost:3000/tarefas', {
        nome,
        descricao,
        prioridade,
        usuario,
      });

      setMessage('Cadastro concluído com sucesso!');
      setNome('');
      setDescricao('');
      setPrioridade('');
      setUsuario('');
    } catch (error) {
      console.log('Erro ao cadastrar tarefa', error);
      setMessage('Erro ao cadastrar tarefa');
    }
  };

  return (
    <div>
      <h1>Cadastro de Tarefa</h1>
      {message && <p>{message}</p>}
      {errors.length > 0 && (
        <div style={{ color: 'red' }}>
          {errors.map((erro, index) => (
            <p key={index}>{erro}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Tarefa:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome da tarefa"
          />
        </div>

        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a descrição da tarefa"
          />
        </div>

        <div>
          <label>Prioridade:</label>
          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
          >
            <option value="">Selecione a prioridade</option>
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div>
          <label>Usuário:</label>
          <select
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario._id} value={usuario._id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Cadastrar Tarefa</button>
      </form>
    </div>
  );
};

export default CadastroTarefa;
