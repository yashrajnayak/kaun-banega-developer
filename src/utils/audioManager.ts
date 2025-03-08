
// Audio files will be loaded from the public directory
const AUDIO_BASE_PATH = '/audio/';

// Define audio files
export const AUDIO_FILES = {
  backgroundMusic: 'background.mp3',
  correctAnswer: 'correct.mp3',
  wrongAnswer: 'wrong.mp3',
  finalAnswer: 'final-answer.mp3',
  lifeline: 'lifeline.mp3',
  timerTick: 'timer.mp3',
  gameOver: 'game-over.mp3',
  applause: 'applause.mp3',
};

// Audio cache to store preloaded audio elements
const audioCache: Record<string, HTMLAudioElement> = {};

// Initialize the audio system and preload files
export const initAudio = () => {
  try {
    // Preload all audio files
    Object.entries(AUDIO_FILES).forEach(([key, file]) => {
      const audio = new Audio(`${AUDIO_BASE_PATH}${file}`);
      audio.preload = 'auto';
      audioCache[key] = audio;
      
      // Load the audio file
      audio.load();
    });
    
    console.log('Audio files preloaded successfully');
  } catch (error) {
    console.error('Error preloading audio files:', error);
  }
};

// Play sound with volume control
export const playSound = (soundKey: keyof typeof AUDIO_FILES, volume = 1.0, loop = false) => {
  try {
    const audio = audioCache[soundKey];
    
    if (!audio) {
      console.warn(`Audio for ${soundKey} not found in cache`);
      return;
    }
    
    // Reset audio to beginning if it's already playing
    audio.currentTime = 0;
    audio.volume = volume;
    audio.loop = loop;
    
    // Play the sound
    const playPromise = audio.play();
    
    // Handle play() promise rejections (e.g., when user hasn't interacted with page yet)
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn(`Couldn't play audio: ${error}`);
      });
    }
  } catch (error) {
    console.error(`Error playing ${soundKey}:`, error);
  }
};

// Stop a specific sound
export const stopSound = (soundKey: keyof typeof AUDIO_FILES) => {
  try {
    const audio = audioCache[soundKey];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  } catch (error) {
    console.error(`Error stopping ${soundKey}:`, error);
  }
};

// Stop all sounds
export const stopAllSounds = () => {
  Object.keys(audioCache).forEach(key => {
    try {
      const audio = audioCache[key];
      audio.pause();
      audio.currentTime = 0;
    } catch (error) {
      console.error(`Error stopping ${key}:`, error);
    }
  });
};

// Check if audio is enabled in user's settings (from localStorage)
export const isAudioEnabled = (): boolean => {
  const setting = localStorage.getItem('audioEnabled');
  // Default to enabled if not set
  return setting === null ? true : setting === 'true';
};

// Toggle audio enable/disable
export const toggleAudio = (): boolean => {
  const currentSetting = isAudioEnabled();
  const newSetting = !currentSetting;
  
  localStorage.setItem('audioEnabled', newSetting.toString());
  
  // If turning off, stop all currently playing sounds
  if (!newSetting) {
    stopAllSounds();
  }
  
  return newSetting;
};
