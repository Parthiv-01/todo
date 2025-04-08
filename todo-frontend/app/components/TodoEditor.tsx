'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Todo } from '../lib/types';
import { updateTodo, deleteTodo } from '../lib/api';
import { formatDate } from '../lib/utils';

export default function TodoEditor({ todo }: { todo?: Todo }) {
  const router = useRouter();
  const [title, setTitle] = useState(todo?.title || 'New Additions');
  const [description, setDescription] = useState(todo?.description || 'To stay representative of framework & new example apps.');
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);
  
  const handleSave = async () => {
    if (!todo) return;
    
    setIsSaving(true);
    await updateTodo(todo._id, { title, description });
    setIsSaving(false);
    router.refresh();
  };
  
  const handleDelete = async () => {
    if (!todo) return;
    
    await deleteTodo(todo._id);
    router.push('/');
  };
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (todo && (title !== todo.title || description !== todo.description)) {
        handleSave();
      }
    }, 1000);
    
    return () => clearTimeout(saveTimeout);
  }, [title, description]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {todo && <p className="text-sm text-gray-500">{formatDate(todo.createdAt)}</p>}
        </div>
        {todo && (
          <button 
            onClick={handleDelete}
            className="text-gray-400 hover:text-gray-600"
          >
            🗑️
          </button>
        )}
      </div>
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl font-bold mb-4 outline-none border-b border-transparent focus:border-gray-300 pb-2"
        placeholder="Title"
      />
      
      <div className="flex gap-2 mb-4 border-b pb-4">
        <button className="p-1">B</button>
        <button className="p-1">I</button>
        <button className="p-1">U</button>
        <span className="mx-2 border-r"></span>
        <button className="p-1">≡</button>
        <button className="p-1">≡</button>
        <button className="p-1">•</button>
        <button className="p-1">1.</button>
        <span className="mx-2 border-r"></span>
        <button className="p-1">⟲</button>
        <button className="p-1">⟳</button>
      </div>
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-64 outline-none resize-none"
        placeholder="Description"
      />
    </div>
  );
}