const Poll = require('../models/Poll');

exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    if (!question || !options || options.length < 2 || options.length > 5) {
      return res.status(400).json({ error: 'Invalid poll data' });
    }
    
    const pollId = await Poll.create(question, options);
    res.status(201).json({ id: pollId });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};