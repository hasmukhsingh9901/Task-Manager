
import React, { useState } from 'react';
import { usePomodoroContext } from '../contexts/PomodoroContext';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddTaskForm = () => {
  const { addTask } = usePomodoroContext();
  const [title, setTitle] = useState('');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    addTask({
      title: title.trim(),
      estimatedPomodoros: Number(estimatedPomodoros)
    });
    
    // Reset form
    setTitle('');
    setEstimatedPomodoros(1);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full flex items-center gap-2">
          <Plus size={18} />
          <span>Add New Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">Task Name</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you want to focus on?"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pomodoros">
              Estimated Pomodoros
            </Label>
            <Input
              id="pomodoros"
              type="number"
              min="1"
              max="20"
              value={estimatedPomodoros}
              onChange={(e) => setEstimatedPomodoros(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              How many 25-minute sessions do you think this will take?
            </p>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskForm;
