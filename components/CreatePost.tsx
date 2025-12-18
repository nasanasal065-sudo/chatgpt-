import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';
import { BlogPost } from '../types';

interface CreatePostProps {
  editingPost?: BlogPost | null;
}

export const CreatePost: React.FC<CreatePostProps> = ({ editingPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    content: ''
  });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  useEffect(() => {
    if (editingPost) {
      setFormData({
        title: editingPost.title,
        category: editingPost.category,
        content: editingPost.content
      });
      setAttachedFile(null); // Reset file on edit load unless we store it in BlogPost
    } else {
       setFormData({
        title: '',
        category: 'General',
        content: ''
      });
      setAttachedFile(null);
    }
  }, [editingPost]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-8 pb-4 border-b border-black flex justify-between items-end">
        <div>
           <h2 className="text-3xl font-black uppercase tracking-tighter">
             {editingPost ? 'Edit Transmission' : 'Creator Studio'}
           </h2>
           <p className="text-gray-500 mt-2">
             {editingPost ? `Refining content ID: ${editingPost.id}` : 'Contribute to the Nexus ecosystem. Upload articles or assets.'}
           </p>
        </div>
        {editingPost && (
          <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            EDIT MODE
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Article Title</label>
            <input 
                type="text" 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none font-bold text-xl"
                placeholder="Enter a captivating title..."
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">Category</label>
                <select 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                >
                    <option>General</option>
                    <option>AI Technology</option>
                    <option>Marketing Strategy</option>
                    <option>Coding Tutorials</option>
                    <option>Startups</option>
                </select>
            </div>
            <div>
                 <label className="block text-sm font-bold uppercase tracking-wider mb-2">Cover Image / Asset (PDF)</label>
                 <div className={`relative w-full h-[58px] border-2 border-dashed ${attachedFile ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'} rounded-lg flex items-center justify-center cursor-pointer group transition-colors`}>
                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*,.pdf" onChange={handleFileChange} />
                     <div className="flex items-center gap-2 text-gray-500 group-hover:text-black">
                         {attachedFile ? (
                           <>
                             <Icon name="file-text" className="w-5 h-5 text-green-600" />
                             <span className="text-sm font-bold text-green-700 truncate max-w-[200px]">{attachedFile.name}</span>
                           </>
                         ) : (
                           <>
                             <Icon name="plus-circle" className="w-5 h-5" />
                             <span className="text-sm font-medium">Upload File (PDF/IMG)</span>
                           </>
                         )}
                     </div>
                 </div>
            </div>
        </div>

        <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Content</label>
            <textarea 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg h-64 focus:ring-2 focus:ring-black outline-none font-mono text-sm leading-relaxed"
                placeholder="Write your article in Markdown..."
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
            />
        </div>

        <div className="pt-6 flex justify-end gap-4">
            <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 font-bold transition-colors">
                Save Draft
            </button>
            <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                <Icon name="send" className="w-4 h-4" />
                {editingPost ? 'Update Transmission' : 'Publish to Nexus'}
            </button>
        </div>
      </div>
    </div>
  );
};