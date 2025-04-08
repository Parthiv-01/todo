// /app/page.tsx
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import { getTodos } from './lib/api';

export default async function Home({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // Access page safely
  let page = 1;
  if (searchParams && 'page' in searchParams) {
    const pageValue = searchParams.page;
    if (typeof pageValue === 'string') {
      const parsed = parseInt(pageValue, 10);
      if (!isNaN(parsed)) {
        page = parsed;
      }
    }
  }
  
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