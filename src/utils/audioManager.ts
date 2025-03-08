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
let audioInitialized = false;

// Initialize the audio system and preload files
export const initAudio = () => {
  if (audioInitialized) {
    return;
  }

  try {
    // Check if audio is enabled
    if (!isAudioEnabled()) {
      console.log('Audio is disabled, skipping initialization');
      return;
    }

    // Preload all audio files
    Object.entries(AUDIO_FILES).forEach(([key, file]) => {
      const audio = new Audio();
      
      // Add error handler before setting src to catch missing files
      audio.onerror = () => {
        console.warn(`Audio file not found: ${file}`);
        // Remove from cache if loading fails
        delete audioCache[key];
      };
      
      audio.preload = 'auto';
      audio.src = `${AUDIO_BASE_PATH}${file}`;
      audioCache[key] = audio;
      
      // Load the audio file
      audio.load();
    });
    
    audioInitialized = true;
    console.log('Audio files preloaded successfully');
  } catch (error) {
    console.error('Error preloading audio files:', error);
  }
};

// Play sound with volume control
export const playSound = (soundKey: keyof typeof AUDIO_FILES, volume = 1.0, loop = false) => {
  // Don't attempt to play if audio is disabled
  if (!isAudioEnabled()) {
    return;
  }

  try {
    const audio = audioCache[soundKey];
    
    if (!audio) {
      // Silently fail if audio file isn't available
      return;
    }
    
    // Reset audio to beginning if it's already playing
    audio.currentTime = 0;
    audio.volume = volume;
    audio.loop = loop;
    
    // Play the sound
    const playPromise = audio.play();
    
    // Handle play() promise rejections
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Only log warning if it's not a missing file (we already handle that)
        if (!error.message.includes('no supported sources')) {
          console.warn(`Couldn't play audio: ${error}`);
        }
      });
    }
  } catch (error) {
    // Log error but don't break the game
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
  // Default to disabled if audio files aren't available
  return setting === null ? false : setting === 'true';
};

// Toggle audio enable/disable
export const toggleAudio = (): boolean => {
  const currentSetting = isAudioEnabled();
  const newSetting = !currentSetting;
  
  localStorage.setItem('audioEnabled', newSetting.toString());
  
  // If turning off, stop all currently playing sounds
  if (!newSetting) {
    stopAllSounds();
  } else if (!audioInitialized) {
    // If turning on and not initialized, try to initialize
    initAudio();
  }
  
  return newSetting;
};
