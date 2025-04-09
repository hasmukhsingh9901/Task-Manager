
import React, { useState } from 'react';
import { usePomodoroContext } from '../contexts/PomodoroContext';
import { Check, Edit2, Trash2, Clock } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask, selectTask, currentTaskId } = usePomodoroContext();
  const [open, setOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPomodoros, setEditedPomodoros] = useState(task.estimatedPomodoros);
  
  const isSelected = currentTaskId === task.id;
  const progress = task.estimatedPomodoros > 0 
    ? (task.completedPomodoros / task.estimatedPomodoros) * 100
    : 0;
    
  const handleSelect = () => {
    selectTask(task.id);
  };
  
  const handleSave = () => {
    updateTask(task.id, {
      title: editedTitle,
      estimatedPomodoros: Number(editedPomodoros)
    });
    setOpen(false);
  };
  
  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className={`p-4 rounded-lg mb-3 border transition-all 
      ${isSelected ? 'border-focus bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
      <div className="flex items-center gap-2 mb-2">
        <button 
          onClick={handleSelect}
          className={`flex-shrink-0 w-6 h-6 rounded-full border transition-all flex items-center justify-center
            ${isSelected ? 'bg-focus border-focus' : 'border-gray-300'}`}
        >
          {isSelected && <Check size={14} className="text-white" />}
        </button>
        
        <h3 className="font-medium flex-grow truncate">{task.title}</h3>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Edit task"
          >
            <Edit2 size={16} />
          </button>
          
          <button
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-500"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-gray-500">
          <Clock size={14} />
          <span>{task.completedPomodoros} / {task.estimatedPomodoros}</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="task-progress-bar mt-2">
        <div 
          className="task-progress-fill bg-focus"
          style={{ width: `${Math.min(100, progress)}%` }} 
        ></div>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Task Name</Label>
              <Input
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Enter task name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pomodoros">Estimated Pomodoros</Label>
              <Input
                id="pomodoros"
                type="number"
                min="1"
                max="20"
                value={editedPomodoros}
                onChange={(e) => setEditedPomodoros(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskItem;
