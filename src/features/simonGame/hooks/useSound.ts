import { useEffect, useState } from "react";
import Sound from 'react-native-sound';

type UseSoundReturnType = {
  playSound: () => void;
};

const useSound = (soundFile: string): UseSoundReturnType => {
  const [sound, setSound] = useState<Sound>();

  useEffect(() => {
    const newSound = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log(`Failed to load the sound: ${soundFile}`, error);
        return;
      }
      setSound(newSound);
    });

    return () => {
      if (newSound) {
        newSound.release();
      }
    };
  }, [soundFile]);

  const playSound = () => {
    sound?.play();
  };

  return { playSound };
};

export default useSound;
