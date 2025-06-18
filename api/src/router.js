const mongoose = require('mongoose');
const { Schema } = mongoose;

const tarefaSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'Nome da tarefa é obrigatório'],
    },
    descricao: {
        type: String,
        required: [true, 'Descrição da tarefa é obrigatória'],
    },
    prioridade: {
        type: String,
        enum: ['baixa', 'média', 'alta'],
        required: [true, 'Prioridade é obrigatória'],
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Usuário é obrigatório'],
    }
}, {
    timestamps: true,
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;
