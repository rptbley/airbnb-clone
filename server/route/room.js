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
    if(latitude && longitude) {
        locations = ` json_extract(roominfo, '$.location.latitude') > ${Number(latitude) - 0.5}
                     and json_extract(roominfo, '$.location.latitude') < ${Number(latitude) + 0.5}
                     and json_extract(roominfo, '$.location.longitude') > ${Number(longitude) - 0.5}
                     and json_extract(roominfo, '$.location.longitude') < ${Number(longitude) + 0.5}
                    `
    }

    if(checkInDate && checkOutDate) {
        date = ` json_extract(roominfo, '$.location.startDate) < ${checkInDate} or json_extract(roominfo, '$.location.endDate') > ${checkOutDate}`
    }

    if(adultCount || childrenCount) {
        count = ` json_extract(roominfo, '$.maximumGuestCount') < ${Number(adultCount) + (Number(childrenCount) * 0.5 || 0)}`
    }

    const test = [locations, date, count];
    test.forEach((res, index) => {
        if(index === test.length - 1) {
            wheres = wheres + res;
        } else {
            if(res !== undefined) {
                wheres = wheres + res + ` and`;
            }
        }
    })
    
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

module.exports = router;