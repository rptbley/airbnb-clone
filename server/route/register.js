const express = require("express");
const router = express.Router();
const db = require('../db');
const moment = require("moment");

router.post("/registerRoom", async (req, res) => {
    const { hostId, roomInfo } = req.body;

    if(!hostId || !roomInfo) {
        return res.json({
            msg: "필수 정보가 없습니다."
        })
    }

    const result = await db("insert into room(hostid, roomInfo) value(?, ?)",[hostId, JSON.stringify(roomInfo)]);
    
    if(result.affectedRows > 0) {
        return res.json({
            msg: "등록에 성공하였습니다."
        })
    }
})

module.exports = router;