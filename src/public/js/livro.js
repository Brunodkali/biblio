const fs = require('fs').promises;

async function listarArquivosDoDiretorio(diretorio, arquivos) {
    if(!arquivos) {
        arquivos = [];
    }
    let listaDeArquivos = await fs.readdir(diretorio);
    
    for(let img in listaDeArquivos) {
        let stat = await fs.stat(diretorio + '/' + listaDeArquivos[img]);

        if(stat.isDirectory()) {
            await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[img], arquivos);
        }else {
            arquivos.push(diretorio + '/' + listaDeArquivos[img]);
        }
    }
    return arquivos;
}