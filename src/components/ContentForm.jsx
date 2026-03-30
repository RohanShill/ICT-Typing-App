import { useState, useEffect } from 'react';
import { saveTypingContent } from '../utils/storage';
import { X } from 'lucide-react';

export default function ContentForm({ item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    type: 'word',
    difficulty: 'beginner',
    content: ''
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData(prev => ({ ...prev, id: Date.now().toString() }));
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.content.trim() === '') return;
    
    saveTypingContent(formData);
    onSave();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {item ? 'Edit Content' : 'Add New Content'}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none transition-shadow"
              >
                <option value="word">Word</option>
                <option value="sentence">Sentence</option>
                <option value="paragraph">Paragraph</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none transition-shadow"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Text Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-3 outline-none transition-shadow resize-y"
              placeholder={formData.type === 'word' ? 'Enter a single word or multiple comma separated values...' : 'Enter the complete sentence or paragraph...'}
              required
            />
            {formData.type === 'word' && (
                <p className="mt-1 text-xs text-slate-500">Note: Single words will be randomized to generate a typing test. You can also type multiple words separated by space.</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              Save Content
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
