const express = require('express');
const app = express();
const port = 3000;

// Array de objetos para representar o BD de livros
const livros = [
    { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', ano: 1899 },
    { id: 2, titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', ano: 1943 },
    { id: 3, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling', ano: 1997 },
    { id: 4, titulo: 'Cem Anos de Solidão', autor: 'Gabriel García Márquez', ano: 1967 },
    { id: 5, titulo: '1984', autor: 'George Orwell', ano: 1949 }
];

// Configuração da view engine EJS
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Rota principal
app.get('/', (req, res) => {
    res.render('index', { resultados: null });
});

// Rota para lidar com a busca de livros
app.get('/buscar', (req, res) => {
    const { tipo, termo } = req.query;
    let resultados = [];

    if (tipo === 'titulo') {
        resultados = livros.filter(livro => livro.titulo.toLowerCase().includes(termo.toLowerCase()));
    } else if (tipo === 'ano') {
        resultados = livros.filter(livro => livro.ano.toString() === termo);
    } else {
        resultados = livros; // Mostrar todos os livros se nenhum tipo de busca for especificado
    }

    res.render('index', { resultados });
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
