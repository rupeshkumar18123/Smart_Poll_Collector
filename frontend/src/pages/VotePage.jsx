// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getPoll, submitVote, getResults } from '../services/api';
// import VoteForm from '../components/VoteForm';
// import PollResults from '../components/PollResults';

// export default function VotePage() {
//   const { pollId } = useParams();
//   const [poll, setPoll] = useState(null);
//   const [results, setResults] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPollData = async () => {
//       try {
//         setIsLoading(true);
//         const pollData = await getPoll(pollId);
//         setPoll(pollData);
        
//         const resultsData = await getResults(pollId);
//         setResults(resultsData);
        
//         // Check if user has already voted (using localStorage)
//         const voterId = localStorage.getItem(`voterId_${pollId}`);
//         if (voterId) {
//           setHasVoted(true);
//         }
//       } catch (err) {
//         setError('Failed to load poll data');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPollData();
//   }, [pollId]);

//   const handleVoteSubmit = async (optionIndex, voterId) => {
//     try {
//       await submitVote(pollId, optionIndex, voterId);
//       localStorage.setItem(`voterId_${pollId}`, voterId);
      
//       // Refresh results after voting
//       const updatedResults = await getResults(pollId);
//       setResults(updatedResults);
//       setHasVoted(true);
//     } catch (err) {
//       setError('Failed to submit vote');
//       console.error(err);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-md mx-auto p-4 bg-red-100 text-red-700 rounded-lg">
//         {error}
//       </div>
//     );
//   }

//   if (!poll) {
//     return (
//       <div className="max-w-md mx-auto p-4 bg-yellow-100 text-yellow-800 rounded-lg">
//         Poll not found
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto space-y-6">
//       <h1 className="text-2xl font-bold text-center">{poll.question}</h1>
      
//       {hasVoted ? (
//         <>
//           <PollResults poll={poll} results={results} />
//           <div className="p-4 bg-green-100 text-green-800 rounded-lg">
//             Thank you for voting!
//           </div>
//         </>
//       ) : (
//         <VoteForm 
//           poll={poll} 
//           onSubmit={handleVoteSubmit} 
//         />
//       )}
      
//       <div className="text-center">
//         <a 
//           href={`/results/${pollId}`} 
//           className="text-blue-500 hover:underline"
//         >
//           View live results
//         </a>
//       </div>
//     </div>
//   );
// }

// VotePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPoll, submitVote, getResults } from '../services/api';
import VoteForm from '../components/VoteForm';
import PollResults from '../components/PollResults';

export default function VotePage() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentVoterId, setCurrentVoterId] = useState('');

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        setIsLoading(true);
        const pollData = await getPoll(pollId);
        setPoll(pollData);
        
        const resultsData = await getResults(pollId);
        setResults(resultsData);
        
        // Check if user has already voted (using localStorage)
        const voterId = localStorage.getItem(`voterId_${pollId}`);
        if (voterId) {
          setHasVoted(true);
          setCurrentVoterId(voterId);
        }
      } catch (err) {
        setError('Failed to load poll data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPollData();
  }, [pollId]);

  const handleVoteSubmit = async (optionIndex, voterId) => {
    try {
      await submitVote(pollId, optionIndex, voterId);
      localStorage.setItem(`voterId_${pollId}`, voterId);
      
      // Refresh results after voting
      const updatedResults = await getResults(pollId);
      setResults(updatedResults);
      setHasVoted(true);
      setCurrentVoterId(voterId);
    } catch (err) {
      setError('Failed to submit vote');
      console.error(err);
    }
  };

  const handleVoteAgain = () => {
    setHasVoted(false);
    setCurrentVoterId('');
  };

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
      <h1 className="text-2xl font-bold text-center">{poll.question}</h1>
      
      {hasVoted ? (
        <>
          <PollResults poll={poll} results={results} />
          <div className="p-4 bg-green-100 text-green-800 rounded-lg">
            <p>Thank you for voting!</p>
            <p className="text-sm mt-2">Voted as: {currentVoterId}</p>
            <button
              onClick={handleVoteAgain}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Vote with different email
            </button>
          </div>
        </>
      ) : (
        <VoteForm 
          poll={poll} 
          onSubmit={handleVoteSubmit} 
        />
      )}
      
      <div className="flex justify-between">
        <a 
          href={`/results/${pollId}`} 
          className="text-blue-500 hover:underline"
        >
          View live results
        </a>
        <a 
          href={`/vote/${pollId}`} 
          className="text-blue-500 hover:underline"
        >
          Voting page
        </a>
      </div>
    </div>
  );
}