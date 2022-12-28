const { Pool } = require('pg');

async function connect() {    
    if (global.connection) {
        return global.connection.connect();
    }
    const pool = new Pool({
        connectionString: 'postgres://jgulxddd:frOBYhhQ0UTs9MnCIvJSH0B_aU3oz77g@babar.db.elephantsql.com:5432/jgulxddd'
    });
    console.log("Criou pool de conexões no PostgreSQL!");
    global.connection = pool;

    return pool.connect();
}

module.exports = { connect };