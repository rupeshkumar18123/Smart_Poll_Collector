const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const createPoll = async (question, options) => {
  const response = await fetch(`${API_BASE}/polls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, options })
  });
  
  if (!response.ok) throw new Error('Failed to create poll');
  const data = await response.json();
  return data.id;
};

export const getPoll = async (pollId) => {
  const response = await fetch(`${API_BASE}/polls/${pollId}`);
  if (!response.ok) throw new Error('Poll not found');
  return response.json();
};

export const submitVote = async (pollId, optionIndex, voterId) => {
  const response = await fetch(`${API_BASE}/polls/${pollId}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ optionIndex, voterId })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to submit vote');
  }
};

export const hasVoted = async (pollId, voterId) => {
  const response = await fetch(`${API_BASE}/polls/${pollId}/hasVoted?userId=${voterId}`);
  if (!response.ok) return false;
  return response.json();
};

export const getResults = async (pollId) => {
  const response = await fetch(`${API_BASE}/polls/${pollId}/results`);
  if (!response.ok) throw new Error('Failed to get results');
  return response.json();
};