
import React from 'react';
import { usePomodoroContext } from '../contexts/PomodoroContext';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { ListTodo } from 'lucide-react';

const TaskList = () => {
  const { tasks } = usePomodoroContext();
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ListTodo size={20} />
          <span>Tasks</span>
        </h2>
        <span className="text-sm text-gray-500">{tasks.length} tasks</span>
      </div>
      
      <div className="mb-4">
        <AddTaskForm />
      </div>
      
      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No tasks yet. Add a task to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
