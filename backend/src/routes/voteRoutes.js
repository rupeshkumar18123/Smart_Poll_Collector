const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

router.post('/:pollId/vote', voteController.submitVote);
router.get('/:pollId/results', voteController.getResults);

module.exports = router;