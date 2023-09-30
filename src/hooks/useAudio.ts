import { useEffect, useMemo } from 'react';

export function useAudio(audioPath: string) {
  const audio = useMemo(() => new Audio(audioPath), []);

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  const play = () => (audio.paused ? audio.play() : {});
  const pause = () => audio.pause();

  return {
    play,
    pause,
    duration: audio.duration,
    paused: audio.paused,
  };
}
