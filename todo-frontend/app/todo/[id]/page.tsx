import { notFound } from 'next/navigation';
import { getTodoById } from '../../lib/api';
import TodoEditor from '../../components/TodoEditor';
import Link from 'next/link';

export default async function TodoPage({ params }: { params: { id: string } }) {
  const todo = await getTodoById(params.id);
  
  if (!todo) {
    return notFound();
  }
  
  return (
    <div>
      <div className="mb-4">
        <Link href="/" className="flex items-center text-gray-600 hover:text-black">
          ← Back
        </Link>
      </div>
      <TodoEditor todo={todo} />
    </div>
  );
}