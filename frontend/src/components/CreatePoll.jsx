// import React, { useState } from 'react';
// import { createPoll } from '../services/api';

// export default function CreatePoll() {
//   const [question, setQuestion] = useState('');
//   const [options, setOptions] = useState(['', '']);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [pollId, setPollId] = useState(null);
//   const [error, setError] = useState('');

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const addOption = () => {
//     if (options.length < 5) {
//       setOptions([...options, '']);
//     }
//   };

//   const removeOption = (index) => {
//     if (options.length > 2) {
//       const newOptions = [...options];
//       newOptions.splice(index, 1);
//       setOptions(newOptions);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!question.trim()) {
//       setError('Question is required');
//       return;
//     }
    
//     const validOptions = options.filter(opt => opt.trim() !== '');
//     if (validOptions.length < 2) {
//       setError('At least 2 options are required');
//       return;
//     }
    
//     setIsSubmitting(true);
//     try {
//       const id = await createPoll(question, validOptions);
//       setPollId(id);
//     } catch (err) {
//       setError('Failed to create poll');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (pollId) {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold mb-4">Poll Created!</h2>
//         <p className="mb-4">Share this link with others:</p>
//         <div className="flex items-center">
//           <input 
//             type="text" 
//             value={`${window.location.origin}/vote/${pollId}`}
//             className="flex-1 p-2 border border-gray-300 rounded-l"
//             readOnly
//           />
//           <button 
//             onClick={() => navigator.clipboard.writeText(`${window.location.origin}/vote/${pollId}`)}
//             className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
//           >
//             Copy
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Create New Poll</h2>
      
//       {error && (
//         <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
//       )}
      
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Question</label>
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//           placeholder="What would you like to ask?"
//         />
//       </div>
      
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Options</label>
//         {options.map((option, index) => (
//           <div key={index} className="flex items-center mb-2">
//             <input
//               type="text"
//               value={option}
//               onChange={(e) => handleOptionChange(index, e.target.value)}
//               className="flex-1 p-2 border border-gray-300 rounded"
//               placeholder={`Option ${index + 1}`}
//             />
//             {options.length > 2 && (
//               <button
//                 type="button"
//                 onClick={() => removeOption(index)}
//                 className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 ×
//               </button>
//             )}
//           </div>
//         ))}
        
//         {options.length < 5 && (
//           <button
//             type="button"
//             onClick={addOption}
//             className="mt-2 p-2 bg-gray-200 rounded hover:bg-gray-300"
//           >
//             + Add Option
//           </button>
//         )}
//       </div>
      
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className={`w-full py-2 px-4 rounded text-white ${
//           isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
//         }`}
//       >
//         {isSubmitting ? 'Creating...' : 'Create Poll'}
//       </button>
//     </form>
//   );
// }

import React, { useState } from 'react';
import { createPoll } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreatePoll() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [generatedId, setGeneratedId] = useState('');

  // Generate a preview ID
  const generatePreviewId = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!question.trim()) {
      setError('Question is required');
      return;
    }
    
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) {
      setError('At least 2 options are required');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const id = await createPoll(question, validOptions);
      navigate(`/vote/${id}`);
    } catch (err) {
      setError('Failed to create poll');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Poll</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="question" className="block text-sm font-medium text-gray-700">
              Your Question
            </label>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              ID: {generatedId || generatePreviewId()}
            </span>
          </div>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setGeneratedId(generatePreviewId());
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="What would you like to ask?"
          />
        </div>

        {/* Rest of the form remains the same */}
        {/* ... */}
      </form>
    </div>
  );
}