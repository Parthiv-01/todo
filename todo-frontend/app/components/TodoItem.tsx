import { Todo } from '../lib/types';
import { formatDate } from '../lib/utils';

export default function TodoItem({ todo }: { todo: Todo }) {
  const isSelected = false; // This would be controlled by parent
  
  return (
    <div className={`p-4 rounded-md border ${isSelected ? 'border-black' : 'border-gray-200'} hover:border-gray-400 cursor-pointer`}>
      <h3 className="font-medium">{todo.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
      <p className="text-xs text-gray-400 mt-2">{formatDate(todo.createdAt)}</p>
    </div>
  );
}