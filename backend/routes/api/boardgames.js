const express = require('express');
const router = express.Router();
const { Boardgame } = require('../../db/models');

router.get('/', async(req, res) => {
    const games = await Boardgame.findAll({
        attributes: {
            exclude: ['id']
        }
    })

    res.json({games})
})


module.exports = router;