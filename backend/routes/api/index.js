const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { requireAuth } = require('../../utils/auth');
const gamesRouter = require('./boardgames.js');

// router.get('/test', requireAuth, (req, res) => {
//     res.json({message: 'success'})
// })

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/boardgames', gamesRouter);

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;