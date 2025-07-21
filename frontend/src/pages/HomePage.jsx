// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function HomePage() {
//   return (
//     <div className="max-w-md mx-auto text-center">
//       <h1 className="text-3xl font-bold mb-6">Smart Poll Collector</h1>
//       <p className="mb-8 text-gray-600">
//         Create and share polls in seconds. Get instant results without signups!
//       </p>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Link 
//           to="/create" 
//           className="p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
//         >
//           <h2 className="text-xl font-bold mb-2">Create Poll</h2>
//           <p>Create a new poll to share</p>
//         </Link>
        
//         <div className="p-6 bg-gray-100 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-2">View Results</h2>
//           <p className="mb-4">Enter a poll ID to see results</p>
//           <form className="flex">
//             <input 
//               type="text" 
//               placeholder="Poll ID" 
//               className="flex-1 p-2 border border-gray-300 rounded-l"
//             />
//             <button 
//               type="submit"
//               className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
//             >
//               View
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// export default function HomePage() {
//   const navigate = useNavigate();
//   const [pollId, setPollId] = useState('');

//   const handleVoteById = (e) => {
//     e.preventDefault();
//     if (pollId.trim()) {
//       navigate(`/vote/${pollId.trim()}`);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto text-center">
//       <h1 className="text-3xl font-bold mb-6">Smart Poll Collector</h1>
//       <p className="mb-8 text-gray-600">
//         Create and share polls in seconds. Get instant results without signups!
//       </p>
      
//       <div className="grid grid-cols-1 gap-6">
//         <Link 
//           to="/create" 
//           className="p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
//         >
//           <h2 className="text-xl font-bold mb-2">Create Poll</h2>
//           <p>Create a new poll to share</p>
//         </Link>
        
//         <div className="p-6 bg-white rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Vote in Existing Poll</h2>
//           <form onSubmit={handleVoteById} className="flex flex-col gap-3">
//             <input 
//               type="text" 
//               value={pollId}
//               onChange={(e) => setPollId(e.target.value)}
//               placeholder="Enter Poll ID" 
//               className="w-full p-3 border border-gray-300 rounded"
//               required
//             />
//             <button 
//               type="submit"
//               className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//               Go to Vote
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [pollId, setPollId] = useState('');
  const [viewMode, setViewMode] = useState('vote'); // 'vote' or 'results'

  const handlePollIdSubmit = (e) => {
    e.preventDefault();
    if (pollId.trim()) {
      navigate(`/${viewMode}/${pollId.trim()}`);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Smart Poll Collector</h1>
      <p className="mb-8 text-gray-600">
        Create and share polls in seconds. Get instant results without signups!
      </p>
      
      <div className="grid grid-cols-1 gap-6">
        <Link 
          to="/create" 
          className="p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          <h2 className="text-xl font-bold mb-2">Create Poll</h2>
          <p>Create a new poll to share</p>
        </Link>
        
        <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-bold">Access Existing Poll</h2>
          
          <div className="flex border rounded-md overflow-hidden">
            <button
              className={`flex-1 py-2 ${viewMode === 'vote' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              onClick={() => setViewMode('vote')}
            >
              Vote
            </button>
            <button
              className={`flex-1 py-2 ${viewMode === 'results' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              onClick={() => setViewMode('results')}
            >
              View Results
            </button>
          </div>
          
          <form onSubmit={handlePollIdSubmit} className="flex flex-col gap-3">
            <input 
              type="text" 
              value={pollId}
              onChange={(e) => setPollId(e.target.value)}
              placeholder={`Enter Poll ID to ${viewMode === 'vote' ? 'vote' : 'view results'}`} 
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <button 
              type="submit"
              className={`w-full py-2 px-4 ${
                viewMode === 'vote' ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'
              } text-white rounded`}
            >
              {viewMode === 'vote' ? 'Go to Vote' : 'View Live Results'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}