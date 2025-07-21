// import React, { useState, useEffect } from 'react';
// import { submitVote, hasVoted } from '../services/api';

// export default function VoteForm({ poll }) {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [voterId, setVoterId] = useState('');
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   const [isChecking, setIsChecking] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Generate or retrieve voter ID
//     const storedId = localStorage.getItem(`voterId_${poll.id}`) || '';
//     setVoterId(storedId);
    
//     // Check if already voted
//     const checkVoteStatus = async () => {
//       try {
//         if (storedId) {
//           const voted = await hasVoted(poll.id, storedId);
//           setHasSubmitted(voted);
//         }
//       } catch (err) {
//         console.error('Error checking vote status:', err);
//       } finally {
//         setIsChecking(false);
//       }
//     };
    
//     checkVoteStatus();
//   }, [poll.id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (selectedOption === null) {
//       setError('Please select an option');
//       return;
//     }
    
//     try {
//       await submitVote(poll.id, selectedOption, voterId);
//       localStorage.setItem(`voterId_${poll.id}`, voterId);
//       setHasSubmitted(true);
//     } catch (err) {
//       setError('Failed to submit vote');
//     }
//   };

//   if (isChecking) {
//     return <div>Loading...</div>;
//   }

//   if (hasSubmitted) {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-xl font-bold mb-2">Thanks for voting!</h2>
//         <p>Your vote has been recorded</p>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">{poll.question}</h2>
      
//       {error && (
//         <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
//       )}
      
//       <div className="mb-4 space-y-2">
//         {poll.options.map((option, index) => (
//           <div key={index} className="flex items-center">
//             <input
//               type="radio"
//               id={`option-${index}`}
//               name="pollOption"
//               checked={selectedOption === index}
//               onChange={() => setSelectedOption(index)}
//               className="mr-2"
//             />
//             <label htmlFor={`option-${index}`} className="cursor-pointer">
//               {option}
//             </label>
//           </div>
//         ))}
//       </div>
      
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Voter Identifier</label>
//         <input
//           type="text"
//           value={voterId}
//           onChange={(e) => setVoterId(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//           placeholder="Enter your email or unique ID"
//           required
//         />
//         <p className="text-xs text-gray-500 mt-1">
//           This prevents duplicate votes. We don't store personal information.
//         </p>
//       </div>
      
//       <button
//         type="submit"
//         className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Submit Vote
//       </button>
//     </form>
//   );
// }

// VoteForm.jsx
import React, { useState, useEffect } from 'react';
import { submitVote, hasVoted } from '../services/api';

export default function VoteForm({ poll, onSubmit }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voterId, setVoterId] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Generate or retrieve voter ID
    const storedId = localStorage.getItem(`voterId_${poll.id}`) || '';
    setVoterId(storedId);
    
    // Check if already voted
    const checkVoteStatus = async () => {
      try {
        if (storedId) {
          const voted = await hasVoted(poll.id, storedId);
          setHasSubmitted(voted);
        }
      } catch (err) {
        console.error('Error checking vote status:', err);
      } finally {
        setIsChecking(false);
      }
    };
    
    checkVoteStatus();
  }, [poll.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (selectedOption === null) {
      setError('Please select an option');
      return;
    }
    
    try {
      await onSubmit(selectedOption, voterId);
    } catch (err) {
      setError('Failed to submit vote');
    }
  };

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{poll.question}</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      
      <div className="mb-4 space-y-2">
        {poll.options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`option-${index}`}
              name="pollOption"
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
              className="mr-2"
            />
            <label htmlFor={`option-${index}`} className="cursor-pointer">
              {option}
            </label>
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Voter Identifier</label>
        <input
          type="text"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your email or unique ID"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          This prevents duplicate votes. We don't store personal information.
        </p>
      </div>
      
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Vote
      </button>
    </form>
  );
}