const Vote = require('../models/Vote');
const Poll = require('../models/Poll');

exports.submitVote = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { optionIndex, voterId } = req.body;
    
    if (!voterId) return res.status(400).json({ error: 'Voter identifier required' });
    
    const hasVoted = await Vote.hasVoted(pollId, voterId);
    if (hasVoted) return res.status(400).json({ error: 'You have already voted' });
    
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: 'Invalid option' });
    }
    
    await Vote.create(pollId, optionIndex, voterId);
    res.status(201).json({ message: 'Vote submitted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getResults = async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    
    const results = await Vote.getResults(pollId);
    const formattedResults = poll.options.map((option, index) => {
      const result = results.find(r => r.optionIndex === index);
      return {
        option,
        count: result ? result.count : 0
      };
    });
    
    res.json(formattedResults);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};