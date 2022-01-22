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
     [email, firstname, lastname, birthday, hashPw, profileImage]);
    if(userIns.affectedRows <= 0) {
        return res.json({
            msg: "오류가 발생했습니다. 다시 시도해주세요."
        })
    }

    const userInfo = await db('select id, email, firstname, lastname, birthday, profileImage from user where email like ?', [email]);
    const token = jwt.sign(String(userInfo[0].id), process.env.JWT_SECRET);

    res.cookie("access_token", token, {
        path: "/",
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 3),
        httpOnly: true
    })
    res.cookie("userId", userInfo[0].id, {
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 3),
        httpOnly: true
    })
    
    res.json({
        isLogged: true,
        msg: "회원가입에 성공하였습니다.",
        userInfo: {
            id: userInfo[0].id,
            email: userInfo[0].email,
            firstname: userInfo[0].firstname,
            lastname: userInfo[0].lastname,
            birthday: userInfo[0].birthday,
            profileImage: userInfo[0].profileImage
        }
    })
    return res;
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await db('select * from user where email like ?', [email]);
    if(user.length <= 0) {
        return res.json({
            msg: "아이디를 확인해주세요."
        })
    }

    const chkPw = bcrypt.compareSync(password, user[0].password);
    
    if(!chkPw) {
        return res.json({
            msg: "비밀번호를 확인해주세요."
        })
    }

    const token = jwt.sign(String(user[0].id), process.env.JWT_SECRET);
    
        res.cookie("access_token", token, {
            path: "/",
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 3),
            httpOnly: true
        })
        res.cookie("userId", user[0].id, {
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 3),
            httpOnly: true
        })
        res.json({
            isLogged: true,
            msg: "로그인에 성공하였습니다.",
            userInfo: {
                id: user[0].id,
                email: user[0].email,
                firstname: user[0].firstname,
                lastname: user[0].lastname,
                birthday: user[0].birthday,
                profileImage: user[0].profileImage
            }    
        })
        return res;
})

router.get("/me", async (req, res) => {
    const accessToken = req.headers.cookie;
    if(!accessToken) {
        return res.json({
            msg: "access_token이 없습니다."
        })
    }

    const userId = jwt.verify(accessToken, process.env.JWT_SECRET);
    
    const user = await db('select id, email, firstname, lastname, birthday, profileImage from user where id  = ?', [userId]);
    if(user[0] <= 0) {
        return res.json({
            msg: "해당 유저가 없습니다."
        })
    }

    return res.json({
        isLogged: true,
        userInfo: user[0]
    })
})

router.delete("/logout", async (req, res) => {
    return res.setHeader(
        "Set-Cookie",
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    ).json({
        msg: "로그아웃 되었습니다."
    })
})

module.exports = router;