import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTypingContent, deleteTypingContent } from '../utils/storage';
import { Plus, Edit2, Trash2, LogOut, Filter } from 'lucide-react';
import ContentForm from '../components/ContentForm';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [contentList, setContentList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Filters
  const [filterType, setFilterType] = useState('all');
  const [filterDiff, setFilterDiff] = useState('all');

  useEffect(() => {
    if (localStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin');
    } else {
      loadData();
    }
  }, [navigate]);

  const loadData = () => {
    setContentList(getTypingContent());
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteTypingContent(id);
      loadData();
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveComplete = () => {
    setIsModalOpen(false);
    loadData();
  };

  const filteredContent = contentList.filter(item => {
    return (filterType === 'all' || item.type === filterType) &&
           (filterDiff === 'all' || item.difficulty === filterDiff);
  });

  return (
    <div className="animate-in fade-in duration-300 pb-12">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage typing practice content</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={openAddModal}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={18} />
            <span>Add Content</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap gap-4 items-center">
            <div className="flex items-center text-slate-500 font-medium">
                <Filter size={18} className="mr-2"/> Filters
            </div>
            
            <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none"
            >
                <option value="all">All Types</option>
                <option value="word">Word</option>
                <option value="sentence">Sentence</option>
                <option value="paragraph">Paragraph</option>
            </select>

            <select 
                value={filterDiff} 
                onChange={(e) => setFilterDiff(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none"
            >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
            
            <span className="ml-auto text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Showing {filteredContent.length} entries
            </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 uppercase font-semibold text-slate-500 dark:text-slate-400">
              <tr>
                <th scope="col" className="px-6 py-4">Type</th>
                <th scope="col" className="px-6 py-4">Difficulty</th>
                <th scope="col" className="px-6 py-4 w-1/2">Content</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 cursor-default">
              {filteredContent.length > 0 ? (
                filteredContent.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap capitalize font-medium">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${item.type === 'word' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : item.type === 'sentence' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400'}`}>
                            {item.type}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {item.difficulty}
                    </td>
                    <td className="px-6 py-4">
                        <div className="line-clamp-2" title={item.content}>
                            {item.content}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => openEditModal(item)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                        No content found. Please add or adjust filters.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ContentForm 
          item={editingItem} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveComplete} 
        />
      )}
    </div>
  );
}
