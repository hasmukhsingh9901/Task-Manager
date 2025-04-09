
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const PomodoroContext = createContext();

export const usePomodoroContext = () => useContext(PomodoroContext);

export const PomodoroProvider = ({ children }) => {
  // Timer settings
  const [workDuration, setWorkDuration] = useState(25 * 60); // 25 minutes in seconds
  const [breakDuration, setBreakDuration] = useState(5 * 60); // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  
  // Task management
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('pomodoroTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  // Focus Zone features
  const [currentMood, setCurrentMood] = useState('neutral'); // neutral, happy, focused, tired
  const [selectedSound, setSelectedSound] = useState('none'); // none, rain, forest, cafe, waves
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Timer logic
  useEffect(() => {
    let timerId;
    
    if (isRunning) {
      timerId = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timerId);
  }, [isRunning, isWorkMode]);
  
  // Handle timer completion
  const handleTimerComplete = () => {
    if (isWorkMode) {
      // Work session complete
      setIsWorkMode(false);
      setTimeLeft(breakDuration);
      setCompletedPomodoros(prev => prev + 1);
      
      // Update task pomodoro count if a task is selected
      if (currentTaskId) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === currentTaskId 
              ? { ...task, completedPomodoros: (task.completedPomodoros || 0) + 1 }
              : task
          )
        );
      }
      
      toast.success('Work session complete! Time for a break.');
    } else {
      // Break session complete
      setIsWorkMode(true);
      setTimeLeft(workDuration);
      toast.success('Break complete! Ready to focus again?');
    }
    
    // Auto-start the next session
    setIsRunning(true);
  };
  
  // Timer controls
  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isWorkMode ? workDuration : breakDuration);
  };
  const skipSession = () => {
    setIsRunning(false);
    handleTimerComplete();
  };
  
  // Task management
  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      estimatedPomodoros: task.estimatedPomodoros,
      completedPomodoros: 0,
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast.success(`Task "${task.title}" added!`);
  };
  
  const updateTask = (taskId, updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    toast.success(`Task updated!`);
  };
  
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    
    // Reset current task if it was the deleted one
    if (currentTaskId === taskId) {
      setCurrentTaskId(null);
    }
    
    toast.success(`Task deleted!`);
  };
  
  const selectTask = (taskId) => {
    setCurrentTaskId(taskId);
    toast(`Task selected!`, {
      description: 'Pomodoros will be tracked for this task.'
    });
  };
  
  // Timer settings
  const updateTimerSettings = (newWorkDuration, newBreakDuration) => {
    setWorkDuration(newWorkDuration * 60);
    setBreakDuration(newBreakDuration * 60);
    setTimeLeft(isWorkMode ? newWorkDuration * 60 : newBreakDuration * 60);
    toast.success('Timer settings updated!');
  };
  
  const value = {
    // Timer state
    workDuration,
    breakDuration,
    timeLeft,
    isRunning,
    isWorkMode,
    completedPomodoros,
    currentTaskId,
    
    // Timer actions
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    updateTimerSettings,
    
    // Task management
    tasks,
    addTask,
    updateTask,
    deleteTask,
    selectTask,
    
    // Focus Zone
    currentMood,
    setCurrentMood,
    selectedSound,
    setSelectedSound
  };
  
  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
};
