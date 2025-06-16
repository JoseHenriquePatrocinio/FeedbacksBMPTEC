const { debug } = require('console');
const fs = require('fs');
const path = require('path');

function listarArquivosGerados(pastaArquivos) {
  return new Promise((resolve, reject) => {
    const arquivos = [];

    fs.readdir(pastaArquivos, { withFileTypes: true }, (err, directories) => {
      if (err) {
        return reject('Erro ao ler a pasta principal');
      }
      directories.filter(dir => dir.isDirectory()).forEach(squadDir => {
        const squadPath = path.join(pastaArquivos, squadDir.name);

        fs.readdir(squadPath, (err, files) => {
          if (err) {
            return reject(`Erro ao ler a pasta do squad ${squadDir.name}`);
          }

          files.forEach(file => {
            
            const filePath = path.join(squadPath, file);
            const stats = fs.statSync(filePath);
            const dateCreated = stats.birthtime.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            
            arquivos.push({
              nome: file,
              squad: squadDir.name,
              dataHora: dateCreated,
              downloadUrl: `/arquivos/${squadDir.name}/${file}`
            });
          });

          if (squadDir === directories[directories.length - 1]) {
            resolve(arquivos);
          }
        });
      });
    });
  });
}

module.exports = listarArquivosGerados;
