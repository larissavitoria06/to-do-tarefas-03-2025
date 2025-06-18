import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GerenciamentoTarefas = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [usuario, setUsuario] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [tarefaAtual, setTarefaAtual] = useState(null);

  useEffect(() => {
    const fetchUsuariosETarefas = async () => {
      try {
        const usuariosResponse = await axios.get('http://localhost:3000/usuarios');
        const tarefasResponse = await axios.get('http://localhost:3000/tarefas');
        
        setUsuarios(usuariosResponse.data);
        setTarefas(tarefasResponse.data);
      } catch (error) {
        console.log('Erro ao carregar os dados', error);
      }
    };

    fetchUsuariosETarefas();
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors([]);

  if (!nome || !descricao || !prioridade || !usuario) {
    setErrors(['Todos os campos são obrigatórios']);
    return;
  }

  const tarefaData = { nome, descricao, prioridade, usuario };

  try {
    if (tarefaAtual) {
      await axios.put(`http://localhost:3000/tarefas/${tarefaAtual._id}`, tarefaData);
      setMessage('Tarefa editada com sucesso!');
    } else {
      await axios.post('http://localhost:3000/tarefas', tarefaData);
      setMessage('Cadastro concluído com sucesso!');
    }

    setNome('');
    setDescricao('');
    setPrioridade('');
    setUsuario('');
    setTarefaAtual(null);

    const tarefasResponse = await axios.get('http://localhost:3000/tarefas');
    setTarefas(tarefasResponse.data);
  } catch (error) {
    console.log('Erro ao salvar tarefa', error);
    setMessage('Erro ao salvar tarefa');
    }
  };
};

  const handleDelete = async (tarefaId) => {
    try {
      await axios.delete(`http://localhost:3000/tarefas/${tarefaId}`);
      setMessage('Tarefa excluída com sucesso!');

      const tarefasResponse = await axios.get('http://localhost:3000/tarefas');
      setTarefas(tarefasResponse.data);
    } catch (error) {
      console.log('Erro ao excluir tarefa', error);
      setMessage('Erro ao excluir tarefa');
    }
  };

  const handleEdit = (tarefa) => {
    setTarefaAtual(tarefa);
    setNome(tarefa.nome);
    setDescricao(tarefa.descricao);
    setPrioridade(tarefa.prioridade);
    setUsuario(tarefa.usuario._id);
  };

  return (
    <div>
      <h1>Gerenciamento de Tarefas</h1>
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

        <button type="submit">{tarefaAtual ? 'Editar Tarefa' : 'Cadastrar Tarefa'}</button>
      </form>

      <h2>Tarefas Cadastradas</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Prioridade</th>
            <th>Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa._id}>
              <td>{tarefa.nome}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.prioridade}</td>
              <td>{tarefa.usuario.nome}</td>
              <td>
                <button onClick={() => handleEdit(tarefa)}>Editar</button>
                <button onClick={() => handleDelete(tarefa._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

export default GerenciamentoTarefas;
