import React from 'react';

export default function PollResults({ poll, results }) {
  // Calculate total votes
  const totalVotes = results.reduce((sum, result) => sum + result.count, 0);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{poll.question}</h2>
      
      <div className="space-y-4">
        {results.map((result, index) => {
          const percentage = totalVotes > 0 
            ? Math.round((result.count / totalVotes) * 100) 
            : 0;
          
          return (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{result.option}</span>
                <span>{result.count} votes ({percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          Total votes: {totalVotes}
        </p>
      </div>
    </div>
  );
}