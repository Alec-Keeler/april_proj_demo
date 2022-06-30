const express = require('express');
const router = express.Router();
const { Boardgame, Review, sequelize } = require('../../db/models');

router.get('/', async(req, res) => {
    const games = await Boardgame.findAll({
        attributes: {
            exclude: ['id']
        }
    })

    res.json({games})
})

router.get('/:id', async(req, res) => {
    const game = await Boardgame.findByPk(req.params.id, {
        include: {model: Review, attributes: ['id', 'content']},
    })

    const numReviews = await Review.count({
        where: {gameId: game.id}
    })

    const data = {}
    data.game = {
        id: game.id, 
        name: game.name, 
        maxPlayers: game.maxPlayers, 
        avgRating: game.avgRating,
        category: game.category,
        createdAt: game.createdAt, 
        updatedAt: game.updatedAt
    }
    data.numReviews = numReviews

    data.reviews = game.Reviews

    if (!game) {
        const err = new Error('The specified boardgame does not exist')
        err.status = 404
        res.json(err)
    } else {
        res.json(data)
    }
})


module.exports = router;