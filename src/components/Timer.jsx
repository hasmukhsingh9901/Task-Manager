
import React, { useState } from 'react';
import { usePomodoroContext } from '../contexts/PomodoroContext';
import { formatTime, calculateProgress, getTimerColor } from '../utils/timerUtils';
import { Play, Pause, SkipForward, RefreshCw, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const Timer = () => {
  const { 
    timeLeft, 
    isRunning, 
    isWorkMode, 
    startTimer, 
    pauseTimer, 
    resetTimer,
    skipSession,
    workDuration,
    breakDuration,
    updateTimerSettings
  } = usePomodoroContext();
  
  const [newWorkDuration, setNewWorkDuration] = useState(workDuration / 60);
  const [newBreakDuration, setNewBreakDuration] = useState(breakDuration / 60);
  const [open, setOpen] = useState(false);
  
  const progress = calculateProgress(
    timeLeft,
    isWorkMode ? workDuration : breakDuration
  );
  
  const timerColor = getTimerColor(isWorkMode);
  
  const handleSaveSettings = () => {
    updateTimerSettings(newWorkDuration, newBreakDuration);
    setOpen(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      {/* Mode Indicator */}
      <div className="text-center mb-2">
        <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium
          ${isWorkMode ? 'bg-focus animate-pulse-light' : 'bg-break'}`}>
          {isWorkMode ? 'Focus Time' : 'Break Time'}
        </span>
      </div>
      
      {/* Timer Circle */}
      <div className="relative w-64 h-64 mx-auto mb-8">
        {/* Progress Background */}
        <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
        
        {/* Progress Fill */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `conic-gradient(
              ${isWorkMode ? 'rgb(59, 130, 246)' : 'rgb(249, 115, 22)'} ${progress}%, 
              transparent ${progress}%
            )`,
            transform: 'rotate(-90deg)',
          }}
        ></div>
        
        {/* Inner Circle / Time Display */}
        <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
          <span className="text-4xl md:text-6xl font-bold">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      
      {/* Control Buttons */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button 
          onClick={resetTimer}
          className="timer-button bg-gray-100 text-gray-700"
          aria-label="Reset timer"
        >
          <RefreshCw size={24} />
        </button>
        
        <button 
          onClick={isRunning ? pauseTimer : startTimer}
          className={`timer-button ${isRunning 
            ? 'bg-gray-100 text-gray-700' 
            : `bg-${timerColor} text-white`}`}
          aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
          {isRunning ? <Pause size={32} /> : <Play size={32} />}
        </button>
        
        <button 
          onClick={skipSession}
          className="timer-button bg-gray-100 text-gray-700"
          aria-label="Skip to next session"
        >
          <SkipForward size={24} />
        </button>
      </div>
      
      {/* Settings Button */}
      <div className="text-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings size={16} />
              <span>Settings</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Timer Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Work Duration: {newWorkDuration} minutes</Label>
                </div>
                <Slider 
                  value={[newWorkDuration]} 
                  min={1} 
                  max={60}
                  step={1}
                  onValueChange={([value]) => setNewWorkDuration(value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Break Duration: {newBreakDuration} minutes</Label>
                </div>
                <Slider 
                  value={[newBreakDuration]} 
                  min={1} 
                  max={30}
                  step={1}
                  onValueChange={([value]) => setNewBreakDuration(value)}
                />
              </div>
              
              <Button onClick={handleSaveSettings} className="w-full">
                Save Settings
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Timer;
