import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, Target, AlertTriangle, RotateCcw, Home as HomeIcon } from 'lucide-react';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate('/');
    return null;
  }

  const { wpm, accuracy, mistakes, difficulty, type } = state;

  return (
    <div className="max-w-2xl mx-auto mt-16 animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-slate-100 dark:border-slate-700">
        
        <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/40 rounded-full mb-8">
            <Trophy className="w-12 h-12 text-indigo-500" />
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          Test Completed!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 capitalize">
          {difficulty} • {type}s Practice
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-indigo-50 dark:bg-slate-700/50 p-6 rounded-2xl flex flex-col items-center">
            <Target className="w-8 h-8 text-indigo-500 mb-3" />
            <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-1">{wpm}</div>
            <div className="text-sm font-semibold text-slate-500 tracking-wider uppercase">WPM</div>
          </div>

          <div className="bg-emerald-50 dark:bg-slate-700/50 p-6 rounded-2xl flex flex-col items-center">
            <div className="text-emerald-500 mb-3 font-bold text-2xl">%</div>
            <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-1">{accuracy}%</div>
            <div className="text-sm font-semibold text-slate-500 tracking-wider uppercase">Accuracy</div>
          </div>

          <div className="bg-rose-50 dark:bg-slate-700/50 p-6 rounded-2xl flex flex-col items-center">
            <AlertTriangle className="w-8 h-8 text-rose-500 mb-3" />
            <div className="text-4xl font-black text-rose-600 dark:text-rose-400 mb-1">{mistakes}</div>
            <div className="text-sm font-semibold text-slate-500 tracking-wider uppercase">Mistakes</div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/test', { state: { difficulty, type } })}
            className="flex-1 inline-flex justify-center items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-indigo-500/30"
          >
            <RotateCcw size={20} />
            <span>Restart Test</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex-1 inline-flex justify-center items-center space-x-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-6 py-4 rounded-xl font-bold transition-all shadow-sm"
          >
            <HomeIcon size={20} />
            <span>Go Home</span>
          </button>
        </div>

      </div>
    </div>
  );
}
