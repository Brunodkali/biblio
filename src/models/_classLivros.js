const database = require('./_database.js')

async function selectLivros() {
    const client = await database.connect();
    const res = await client.query('SELECT * FROM livros');
    return res.rows;
}

async function insertLivros(insertLivro){
    const client = await database.connect();
    const sql = 'INSERT INTO livros(titulo, numeroPaginas, editora, autor) VALUES ($1, $2, $3, $4);';
    const values = [insertLivro.titulo, insertLivro.numeroPaginas, insertLivro.editora, insertLivro.autor];
    return await client.query(sql, values);
}

async function updateLivros(id, updateLivro){
    const client = await database.connect();
    const sql = 'UPDATE usuarios SET titulo=$1, numeroPaginas=$2, editora=$3, autor=$4 WHERE id=$5';
    const values = [updateLivro.titulo, updateLivro.numeroPaginas, updateLivro.editora, updateLivro.autor, id];
    return await client.query(sql, values);
}

async function deleteLivros(id){
    const client = await database.connect();
    const sql = 'DELETE FROM livros WHERE id=$1;';
    return await client.query(sql, [id]);
}

module.exports = { 
    selectLivros, 
    insertLivros,
    updateLivros,
    deleteLivros
}; 