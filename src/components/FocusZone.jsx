
import React, { useEffect, useRef } from 'react';
import { usePomodoroContext } from '../contexts/PomodoroContext';
import { getMoodEmoji, getSoundUrl } from '../utils/timerUtils';
import { Music, VolumeX, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const FocusZone = () => {
  const { 
    currentMood, 
    setCurrentMood, 
    selectedSound, 
    setSelectedSound,
    completedPomodoros,
    isWorkMode
  } = usePomodoroContext();
  
  const audioRef = useRef(null);
  
  // Create mood options
  const moods = [
    { id: 'neutral', label: 'Neutral', emoji: '😐' },
    { id: 'happy', label: 'Happy', emoji: '😊' },
    { id: 'focused', label: 'Focused', emoji: '🧠' },
    { id: 'tired', label: 'Tired', emoji: '😴' }
  ];
  
  // Create ambient sound options
  const sounds = [
    { id: 'none', label: 'None', icon: VolumeX },
    { id: 'rain', label: 'Rain' },
    { id: 'forest', label: 'Forest' },
    { id: 'cafe', label: 'Cafe' },
    { id: 'waves', label: 'Ocean' }
  ];
  
  // Handle sound selection
  useEffect(() => {
    if (!audioRef.current) return;
    
    const soundUrl = getSoundUrl(selectedSound);
    
    if (soundUrl) {
      audioRef.current.src = soundUrl;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(err => console.log('Audio play error:', err));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [selectedSound]);
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Music size={20} />
          <span>Focus Zone</span>
        </h2>
        
        {/* Stats */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-100">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Completed Today</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold">{completedPomodoros}</span>
              <span className="text-sm text-gray-500">pomodoros</span>
            </div>
          </div>
        </div>
        
        {/* Mood Tracker */}
        <div className="mb-6">
          <h3 className="font-medium mb-2 text-sm">How are you feeling?</h3>
          <div className="flex justify-between">
            {moods.map(mood => (
              <button
                key={mood.id}
                className={`mood-button flex flex-col items-center ${
                  currentMood === mood.id ? 'bg-gray-200' : 'bg-white'
                }`}
                onClick={() => setCurrentMood(mood.id)}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs mt-1">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Ambient Sounds */}
        <div>
          <h3 className="font-medium mb-2 text-sm">Ambient Sound</h3>
          <div className="grid grid-cols-3 gap-2">
            {sounds.map(sound => (
              <Button
                key={sound.id}
                variant={selectedSound === sound.id ? "default" : "outline"}
                className="py-1 px-2 h-auto"
                onClick={() => setSelectedSound(sound.id)}
              >
                {sound.id === 'none' ? <VolumeX size={14} className="mr-1" /> 
                  : <Volume2 size={14} className="mr-1" />}
                <span className="text-xs">{sound.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hidden audio element */}
      <audio ref={audioRef} />
    </div>
  );
};

export default FocusZone;
