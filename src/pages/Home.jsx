import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Activity, BookOpen, Timer } from 'lucide-react';

export default function Home() {
  const [difficulty, setDifficulty] = useState('beginner');
  const [type, setType] = useState('word');
  const [timeLimit, setTimeLimit] = useState(60);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/test', { state: { difficulty, type, timeLimit } });
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Ready to type faster?
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Improve your typing speed and accuracy with curated ICT content.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Difficulty Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                <Activity size={20} />
                <span>Select Difficulty</span>
              </div>
              
              <div className="flex flex-col space-y-3">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <label 
                    key={level}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${difficulty === level ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-500' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'}`}
                  >
                    <input 
                      type="radio" 
                      name="difficulty" 
                      value={level} 
                      checked={difficulty === level}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                    />
                    <span className="ml-3 capitalize font-medium">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                <BookOpen size={20} />
                <span>Select Content Type</span>
              </div>
              
              <div className="flex flex-col space-y-3">
                {['word', 'sentence', 'paragraph'].map((itemType) => (
                  <label 
                    key={itemType}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${type === itemType ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-500' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'}`}
                  >
                    <input 
                      type="radio" 
                      name="type" 
                      value={itemType} 
                      checked={type === itemType}
                      onChange={(e) => setType(e.target.value)}
                      className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                    />
                    <span className="ml-3 capitalize font-medium">{itemType}s</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Time Limit Selection */}
            <div className="space-y-4 md:col-span-2 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                <Timer size={20} />
                <span>Select Time Limit</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {[15, 30, 60, 120, 300].map((time) => (
                  <label 
                    key={time}
                    className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${timeLimit === time ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-500' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'}`}
                  >
                    <input 
                      type="radio" 
                      name="timeLimit" 
                      value={time} 
                      checked={timeLimit === time}
                      onChange={(e) => setTimeLimit(Number(e.target.value))}
                      className="hidden"
                    />
                    <span className={`capitalize font-bold text-lg ${timeLimit === time ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400'}`}>
                      {time === 300 ? '5m' : `${time}s`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-700 text-center">
            <button
              onClick={handleStart}
              className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-transform transform hover:scale-105 shadow-lg hover:shadow-indigo-500/30 w-full md:w-auto"
            >
              <span>Start Practice</span>
              <Play size={20} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
