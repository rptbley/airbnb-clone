const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const db = require('../db');
const moment = require('moment');
const fs = require('fs');
const cookie = require('cookie');

router.post("/upload", async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie);

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const now = moment().format('YYYY-MM-DD hh:mm:ss');
        const now2 = moment().format('YYYYmmDDhhmmss');
        const parsedName = files.file.newFilename + now2;
        const originalName = files.file.originalFilename;
        const userId = Number(cookies.userId);

        const result = await db(`insert into photo(type, userno, originalname, parsedname, uploadtime) value("room", ?, ?, ?, ?)`,
        [userId, originalName, parsedName, now]);
        if(result.affectedRows > 0) {
            const path = `${__dirname}/../public/static/image/${parsedName}.jpg`;
            fs.rename(files.file.filepath, path, function(err) {
                if(err) throw err;
                return res.status(200).json({
                    parsedName: parsedName
                })
            })    
        }
    })
})

router.post("/delete", async (req, res) => {
    const { photoName } = req.body;
    
    const result = await db("delete from photo where parsedname like ?", [photoName]);
    if(result.affectedRows > 0) {
        const path = `${__dirname}/../public/static/image/${photoName}.jpg`;
        fs.unlinkSync(path, (err) => {
            console.log(err)
            return res.json({
                msg: "파일 삭제 실패"
            })
        })

        return res.json({
            msg: "파일 삭제 완료"
        })
    }
})

module.exports = router;