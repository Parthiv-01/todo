// /app/components/TodoList.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Todo } from '../lib/types';
import { getTodos, createTodo } from '../lib/api';
import TodoItem from './TodoItem';

export default function TodoList({ initialTodos }: { initialTodos: { todos: Todo[], totalPages: number } }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos.todos);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTodos.totalPages);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  // Check if we're on mobile using window width
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const refreshTodos = async () => {
    const fetchedTodos = await getTodos(currentPage);
    setTodos(fetchedTodos.todos);
    setTotalPages(fetchedTodos.totalPages);
  };
  
  const handleCreateTodo = async () => {
    const newTodo = await createTodo({
      title: 'New Additions',
      description: 'To stay representative of framework & new example apps.'
    });
    router.push(`/todo/${newTodo._id}`);
  };
  
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    const fetchedTodos = await getTodos(page);
    setTodos(fetchedTodos.todos);
  };
  
  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button 
          className="px-3 py-2 bg-black text-white rounded-md flex items-center"
          onClick={handleCreateTodo}
        >
          <span className="mr-1">⚪</span> TODO
        </button>
        
        {/* Desktop search input */}
        <div className={`relative ${isMobile ? 'hidden' : 'block'}`}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-4 py-2 border border-gray-300 rounded-md"
          />
          <div className="absolute left-2 top-2.5 text-gray-400">🔍</div>
        </div>
        
        {/* Mobile search icon that expands to input */}
        <div className={`${isMobile ? 'block' : 'hidden'}`}>
          {showSearchInput ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md"
                autoFocus
              />
              <div className="absolute left-2 top-2.5 text-gray-400">🔍</div>
              <button 
                onClick={toggleSearchInput}
                className="absolute right-2 top-2.5 text-gray-400"
              >
                ✕
              </button>
            </div>
          ) : (
            <button 
              onClick={toggleSearchInput}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              🔍
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {todos.map(todo => (
          <Link href={`/todo/${todo._id}`} key={todo._id}>
            <TodoItem todo={todo} />
          </Link>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${currentPage === page ? 'bg-black text-white' : 'bg-gray-200'}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}