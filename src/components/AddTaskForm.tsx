'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

interface AddTaskFormProps {
  onSubmit: (command: string) => Promise<void>;
  disabled?: boolean;
}

export default function AddTaskForm({
  onSubmit,
  disabled = false,
}: AddTaskFormProps) {
  const [command, setCommand] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!command.trim() || isSubmitting || disabled) return;

    setIsSubmitting(true);
    try {
      await onSubmit(command);
      setCommand(''); // Clear input after successful submission
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={command}
        onChange={e => setCommand(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        placeholder="Say something to the AI assistant..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled={isSubmitting || disabled}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting || !command.trim() || disabled}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        title={
          isSubmitting
            ? 'Processing...'
            : !command.trim()
              ? 'Enter a command first'
              : 'Click to add task'
        }
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add Task
          </>
        )}
      </button>
    </div>
  );
}
