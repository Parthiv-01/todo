// /app/page.tsx
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';

// Using the correct types for Next.js App Router pages
export default function Home({
  searchParams,
}: {
  params: {}; // Empty for the root page
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6">
        <TodoList searchParamsPage={searchParams.page} />
      </div>
      <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-6">
        <TodoEditor />
      </div>
    </div>
  );
}