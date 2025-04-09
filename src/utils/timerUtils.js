import idea22 from "../assets/idea_22.mp3"
import idea10 from "../assets/idea_10.mp3"
import wannaBe from "../assets/wanna_be_yours_instru.mp3"
import interstellar from "../assets/interstellar.mp3"

export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Calculate progress percentage
export const calculateProgress = (currentTime, totalTime) => {
  return Math.max(0, Math.min(100, 100 - (currentTime / totalTime * 100)));
};

// Get timer color based on current mode
export const getTimerColor = (isWorkMode) => {
  return isWorkMode ? 'focus' : 'break';
};

// Get appropriate ambient sound URL
export const getSoundUrl = (sound) => {
  const sounds = {
    none: null,
    rain: idea22,
    forest: idea10,
    cafe: wannaBe,
    waves: interstellar
  };
  
  return sounds[sound] || null;
};

export const getMoodEmoji = (mood) => {
  const moods = {
    neutral: '😐',
    happy: '😊',
    focused: '🧠',
    tired: '😴'
  };
  
  return moods[mood] || moods.neutral;
};
