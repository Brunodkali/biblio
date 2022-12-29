const database = require('./_database.js')

async function selectUsers() {
    const client = await database.connect();
    const res = await client.query('SELECT * FROM usuarios');
    return res.rows;
}

async function insertUsers(insertUser){
    const client = await database.connect();
    const sql = 'INSERT INTO usuarios(nome, email, senha) VALUES ($1, $2, $3);';
    const values = [insertUser.nome, insertUser.email, insertUser.senha];
    return await client.query(sql, values);
}

async function updateUsers(id, updateUser){
    const client = await database.connect();
    const sql = 'UPDATE usuarios SET nome=$1, email=$2, senha=$3 WHERE id=$4';
    const values = [updateUser.nome, updateUser.email, updateUser.senha, id];
    return await client.query(sql, values);
}

async function deleteUsers(id){
    const client = await database.connect();
    const sql = 'DELETE FROM usuarios where id=$1;';
    return await client.query(sql, [id]);
}

module.exports = { 
    selectUsers, 
    insertUsers,
    updateUsers,
    deleteUsers
}; 