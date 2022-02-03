const express = require('express');
const router = express.Router();
const db = require('../db');

router.post("/roomList", async (req, res) => {
    const {
        location, latitude, longitude,
        checkInDate, checkOutDate,
        adultCount, childrenCount, infantsCount,
        limit, page
    } = req.body;

    let sqlQuery = `select * from room`;
    let wheres = ` where`;
    let locations;
    let date;
    let count;
    let test = [];
    if(latitude && longitude) {
        locations = ` json_extract(roominfo, '$.location.latitude') > ${Number(latitude) - 0.5}
                     and json_extract(roominfo, '$.location.latitude') < ${Number(latitude) + 0.5}
                     and json_extract(roominfo, '$.location.longitude') > ${Number(longitude) - 0.5}
                     and json_extract(roominfo, '$.location.longitude') < ${Number(longitude) + 0.5}
                    `
        test.push(locations);
    }

    if(checkInDate && checkOutDate) {
        date = ` json_extract(roominfo, '$.startDate') < ${checkInDate} or json_extract(roominfo, '$.endDate') > ${checkOutDate}`
        test.push(date);
    }

    if(adultCount || childrenCount) {
        count = ` json_extract(roominfo, '$.maximumGuestCount') < ${Number(adultCount) + (Number(childrenCount) * 0.5 || 0)}`
        test.push(count);
    }

    
    test.forEach((res, index) => {
        if(res !== undefined) {
            if(index === test.length - 1) {
                wheres = wheres + res;
            } else {
                wheres = wheres + res + ` and`;
            }
        }
    })

    if(test.length === 0) {
        wheres = ``;
    }
    
    try {
        const result = await db(sqlQuery + wheres + ` limit ?, ?`, [page, limit]);
        if(result.length <= 0) {
            return res.json({
                msg: "일치하는 숙소 없음"
            });
        }
        const resultList = [];
        
        result.forEach(async (res1, index) => {
            const host = await db("select * from user where id = ?", [res1.hostid]);
            const tmpObj = {
                ...res1,
                host: host[0]
            }
            resultList.push(tmpObj);
            if(index === result.length - 1) {
                return res.send(resultList)
            }
        })
    } catch (e) {
        console.log(e)
        return res.end();
    }
})

router.get("/detailRoom", async (req, res) => {
    const { roomNo } = req.query;

    try {
        const result = await db("select * from room where no = ?", [roomNo]);
        
        const host = await db("select * from user where id = ?", [result[0].hostid]);
        const tmpObj = {
            ...result[0],
            host: host[0]
        }

        return res.send(tmpObj);
    } catch (e) {
        console.log(e)
        return res.end();
    }
})

router.post("/reservation", async (req, res) => {
    const {
        userId, roomId,
        checkInDate, checkOutDate,
        adultCount, childrenCount, infantsCount
    } = req.body;

    try {
        const result = await db("insert into reservation (userId, roomId, checkInDate, checkOutDate, adultCount, childrenCount, infantsCount) value(?,?,?,?,?,?,?)",
        [userId, roomId, checkInDate, checkOutDate, adultCount, childrenCount, infantsCount])
        if(result.affectedRows <= 0) {
            return res.json({
                retNum: 0,
                msg: "예약 실패"
            })
        }

        return res.json({
            retNum: 1,
            msg: "예약 성공"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            retNum: 2,
            msg: "에러 발생"
        })
    }
})

module.exports = router;