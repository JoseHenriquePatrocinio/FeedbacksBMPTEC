const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { successMessage, errorMessage } = require('./utils/responseMessages');
const listarArquivosGerados = require('./public/services/listarArquivosGerados');
const gerarQuestionario = require('./public/services/outputQuestionario');
const ziparConteudo = require('./public/services/ziparConteudos');
const excluirArquivos  = require('./public/services/excluirArquivos');


const pastaArquivos = path.join(__dirname, 'public', 'services', 'arquivos');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/arquivos', express.static(path.join(__dirname, 'public', 'services', 'arquivos')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.get('/questionario', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/questionario.html'));
});

app.get('/metasAnuais', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/metasAnuais.html'));
});

app.get('/api/arquivos', async (req, res) => {

  try {
    const arquivos = await listarArquivosGerados(pastaArquivos);
    res.json(arquivos);
  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    res.status(500).send('Erro ao listar arquivos gerados');
  }
});

app.get('/compactar', (req, res) => {
  ziparConteudo(res, pastaArquivos); 
});

app.delete('/excluirArquivos', async (req, res) => {
  try {
    const resultado = await excluirArquivos(pastaArquivos);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/submit', (req, res) => {
  const respostas = req.body;

  gerarQuestionario(respostas)
    .then((filePath) => {
      console.log(`Documento salvo em: ${filePath}`);
      res.status(200).send(successMessage());
    })
    .catch((error) => {
      console.error('Erro ao gerar o arquivo DOCX', error);
      res.status(500).send(errorMessage());
    });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
