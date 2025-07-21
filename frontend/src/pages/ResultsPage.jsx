import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPoll, getResults } from '../services/api';
import PollCard from '../components/PollCard';

export default function ResultsPage() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [pollData, resultsData] = await Promise.all([
          getPoll(pollId),
          getResults(pollId)
        ]);
        setPoll(pollData);
        setResults(resultsData);
      } catch (err) {
        setError('Failed to load poll results');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pollId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="max-w-md mx-auto p-4 bg-yellow-100 text-yellow-800 rounded-lg">
        Poll not found
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Poll Results</h1>
      <PollCard poll={poll} results={results} showFullResults={true} />
      
      <div className="text-center">
        <a 
          href={`/vote/${pollId}`} 
          className="text-blue-500 hover:underline"
        >
          Go to voting page
        </a>
      </div>
    </div>
  );
}