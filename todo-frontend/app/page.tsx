// /app/page.tsx
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import { getTodos } from './lib/api';

export default async function Home({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  // Safe way to get the page number
  const pageStr = Array.isArray(searchParams.page) 
    ? searchParams.page[0] 
    : searchParams.page;
    
  const page = pageStr ? parseInt(pageStr, 10) : 1;
  const todos = await getTodos(page);
  
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6">
        <TodoList initialTodos={todos} />
      </div>
      <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-6">
        <TodoEditor />
      </div>
    </div>
  );
}