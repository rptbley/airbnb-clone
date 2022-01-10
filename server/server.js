const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

db.connect((err) => {
    if(err) throw err;
    console.log('DB Connected')
});

const app = express();

app.use(cors({ origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 연결...')
})