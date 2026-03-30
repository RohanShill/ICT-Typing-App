import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TerminalSquare, Moon, Sun, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-indigo-100 dark:border-indigo-900/50 transition-colors duration-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 group">
            <TerminalSquare size={28} className="transform group-hover:scale-110 transition-transform" />
            <span className="text-xl font-black tracking-tighter">ICT<span className="text-slate-900 dark:text-white font-bold ml-1">TYPING</span></span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${location.pathname === '/' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-300'}`}
            >
              Practice
            </Link>
            
            <Link 
              to="/admin" 
              className={`flex items-center space-x-1 font-medium transition-colors ${location.pathname.startsWith('/admin') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-300'}`}
            >
              <ShieldCheck size={18} />
              <span>Admin</span>
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
