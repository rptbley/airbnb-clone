const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("../db");
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
    const {email, firstname, lastname, birthday, password, profileImage} = req.body;

    // 필수 데이터 확인
    if(!email || !firstname || !lastname || !birthday || !password) {
        return res.json({
            msg: "필수 데이터가 없습니다."
        })
    }
    // 유저 중복 확인
    const userChk = await db('select * from user where email like ?', [email]);
    if(userChk.length > 0) {
        return res.json({
            msg: "이미 가입된 이메일입니다."
        })
    }
    // 회원가입 진행 및 가입 정보 리턴
    const hashPw = bcrypt.hashSync(password, 8);
    const userIns = await db('insert into user(email, firstname, lastname, birthday, password, profileImage) value(?, ?, ?, ?, ?, ?)',
     [email, firstname, lastname, birthday, password, profileImage]);
    if(userIns.affectedRows <= 0) {
        return res.json({
            msg: "오류가 발생했습니다. 다시 시도해주세요."
        })
    }

    const userInfo = await db('select id, email, firstname, lastname, birthday, profileImage from user where email like ?', [email]);
    const token = jwt.sign(String(userInfo[0].id), process.env.JWT_SECRET);
    
    return res.setHeader(
        "Set-Cookie",
        `access_token=${token}; path=/; expires=${new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toUTCString()}; httponly`
    ).json({
        isLogged: true,
        msg: "회원가입에 성공하였습니다.",
        userInfo: userInfo[0]
    })
})

module.exports = router;