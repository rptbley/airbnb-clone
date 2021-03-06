const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
;

const port = parseInt(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(morgan('dev'));
    server.use(cookieParser());
    server.use(express.static(path.join(__dirname, '../public/static')))
    server.use('/_next', express.static(path.join(__dirname, '../.next')))
    
    server.all('*', async (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if(err) throw err;
        console.log(`Ready on http://localhost:${port}`);
    })
})