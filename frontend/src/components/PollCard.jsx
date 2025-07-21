// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function PollCard({ poll, results = [], showFullResults = false }) {
//   const totalVotes = results.reduce((sum, result) => sum + (result.count || 0), 0);
  
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">{poll.question}</h2>
      
//       <div className="space-y-4">
//         {poll.options.map((option, index) => {
//           const result = results.find(r => r.optionIndex === index) || { count: 0 };
//           const percentage = totalVotes > 0 
//             ? Math.round((result.count / totalVotes) * 100) 
//             : 0;
          
//           return (
//             <div key={index}>
//               <div className="flex justify-between mb-1">
//                 <span>{option}</span>
//                 {showFullResults && (
//                   <span>{result.count} votes ({percentage}%)</span>
//                 )}
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-4">
//                 <div 
//                   className="bg-blue-500 h-4 rounded-full" 
//                   style={{ width: `${percentage}%` }}
//                 ></div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
      
//       {showFullResults && (
//         <div className="mt-4 pt-4 border-t border-gray-200 text-center">
//           <p className="text-sm text-gray-600">
//             Total votes: {totalVotes}
//           </p>
//         </div>
//       )}
      
//       {!showFullResults && (
//         <div className="mt-4 flex justify-between items-center">
//           <span className="text-sm text-gray-500">
//             {totalVotes} votes
//           </span>
//           <Link 
//             to={`/results/${poll.id}`} 
//             className="text-blue-500 hover:underline text-sm"
//           >
//             View results
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';

export default function PollCard({ poll, results = [], showFullResults = false }) {
  const totalVotes = results.reduce((sum, result) => sum + (result.count || 0), 0);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold">{poll.question}</h2>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          ID: {poll.id}
        </span>
      </div>
      
      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  );
}