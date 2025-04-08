import { Todo, TodoInput } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Server-side function
export async function getTodos(page: number = 1, limit: number = 10) {
  try {
    const res = await fetch(`${API_URL}/todos?page=${page}&limit=${limit}`, { 
      cache: 'no-store'  // Don't cache to ensure fresh data
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch todos');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    return { todos: [], totalPages: 0 };
  }
}

// Server-side function
export async function getTodoById(id: string) {
  try {
    const res = await fetch(`${API_URL}/todos/${id}`, { 
      cache: 'no-store'  // Don't cache to ensure fresh data
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch todo');
    }
    
    return await res.json();
  } catch (error) {
    console.error(`Error fetching todo ${id}:`, error);
    return null;
  }
}

// Client-side function
export async function createTodo(todoData: TodoInput): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  
  if (!res.ok) {
    throw new Error('Failed to create todo');
  }
  
  return res.json();
}

// Client-side function
export async function updateTodo(id: string, todoData: Partial<TodoInput>): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  
  if (!res.ok) {
    throw new Error('Failed to update todo');
  }
  
  return res.json();
}

// Client-side function
export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    throw new Error('Failed to delete todo');
  }
}