const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/getInfo', async (req, res) => {
    const { keyword } = req.query;

    try {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${process.env.GOOGLE_MAP_API_KEY}&language=ko&input=${encodeURI(keyword)}`);
        return res.json({
            data: result.data
        })
    }catch(err) {
        console.log(err)
    }
})

router.get('/getInfoByPlaceId', async (req, res) => {
    const { placeId } = req.query;

    try {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&language=ko&key=${process.env.GOOGLE_MAP_API_KEY}`);
        return res.json({
            data: result.data
        })
    } catch(err) {
        console.log(err)
    }
})

module.exports = router;