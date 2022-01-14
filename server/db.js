const mysql = require('mysql2/promise')

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
}, (err) => {
    if(err) throw err;
    console.log("DB Connected");
});

const query = async (q, p) => {
    try {
        const conn = await db;
        const result = await conn.query(q, p);
        return result[0];
    } catch(err) {
        console.log(err);
    }
}

module.exports = query;