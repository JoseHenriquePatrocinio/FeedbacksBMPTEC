const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

function ziparConteudo(res, arquivosDir) {
  const outputFileName = 'arquivos_compactados.zip';
  const outputPath = path.join(__dirname, outputFileName);
  
  const output = fs.createWriteStream(outputPath);
  
  const archive = archiver('zip', {
    zlib: { level: 9 } 
  });

  output.on('close', () => {
    console.log(`Arquivo compactado com sucesso. Tamanho total: ${archive.pointer()} bytes.`);
    res.download(outputPath, outputFileName, () => {
      fs.unlinkSync(outputPath);
    });
  });

  archive.on('error', (err) => {
    console.error('Erro ao compactar:', err);
    res.status(500).send('Erro ao compactar os arquivos.');
  });

  res.attachment(outputFileName);

  archive.pipe(output);

  archive.directory(arquivosDir, false);

  archive.finalize();
}

module.exports =  ziparConteudo ;
