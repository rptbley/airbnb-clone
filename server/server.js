const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser( ));

app.use(express.static('public/static/'));

app.use("/user", require("./route/user"));
app.use("/photo", require("./route/photo"));
app.use("/register", require("./route/register"));
app.use("/place", require('./route/place'));
app.use("/room", require("./route/room"));

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 연결...')
})