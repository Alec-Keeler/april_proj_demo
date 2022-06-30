const express = require('express');
const router = express.Router();
const { Boardgame, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

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

    if (!game) {
        const err = new Error('The specified boardgame does not exist')
        err.status = 404
        res.json({
            message: err.message,
            code: err.status
        })
    } else {
        const numReviews = await Review.count({
            where: { gameId: game.id }
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
        res.json(data)
    }
})

const checkContent = (req, res, next) => {
    const { content } = req.body;
    if (content.length > 10) {
        next()
    } else {
        const err = new Error('Please provide content longer than 10 characters')
        err.status = 400
        res.json({message: err.message, code: err.status})
    }
}

router.post('/:id/reviews', requireAuth, checkContent, async(req, res, next) => {
    const {content} = req.body;
    const gameId = req.params.id;
    const userId = req.user.id;

    const existingReview = await Review.findOne({
        where: {gameId, userId}
    })

    console.log(existingReview)

    const game = await Boardgame.findByPk(gameId);

    if (existingReview) {
        const err = new Error('You have already reviewed this game')
        err.status = 403;
        return next(err)
    } else if (!game) {
        const err = new Error('There is no game with the provided id')
        err.status = 404
        return next(err)
    }

    const review = await Review.create({
        content,
        gameId,
        userId
    })

    res.json(review)
})

module.exports = router;