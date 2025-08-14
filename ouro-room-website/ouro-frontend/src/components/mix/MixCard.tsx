import { useRef, useState, useCallback } from "react";
import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react";
import { Button, Text } from "@mantine/core";
import "../../App.css";
import Record from "../../assets/ouro-record.png";

type Mix = {
  id: number;
  title: string;
  artist: string;
  audio: string;
  image?: string;
};

interface MixCardProps {
  mix: Mix;
  artist: string;
  title: string;
  audioSrc: string;
  isSelected?: boolean;
}

/** Keep track of the one audio that's allowed to play globally */
let currentlyPlaying: HTMLAudioElement | null = null;

export default function MixCard({ mix }: MixCardProps) {
  const { artist, title, audio, image } = mix;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playExclusive = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;

    // Pause any other audio that might be playing
    if (currentlyPlaying && currentlyPlaying !== el) {
      try {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0; // optional: rewind the previous track
      } catch {}
    }

    currentlyPlaying = el;

    try {
      el.currentTime = 0; // optional: always start from beginning
      await el.play();
    } catch (e) {
      // Autoplay policies or other issues
      console.warn("Audio play failed:", e);
    }
  }, []);

  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
    } else {
      void playExclusive();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    // If this was the tracked player, clear it
    if (currentlyPlaying === audioRef.current) {
      currentlyPlaying = null;
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (currentlyPlaying === audioRef.current) {
      currentlyPlaying = null;
    }
  };

  return (
    <div className="mix-container">
      <div className="mix-card" style={{ position: "relative", zIndex: 10 }}>
        <Text className="mix-header-text">{artist}</Text>
        <Text className="body-text">{title}</Text>

        <div className="mix-img">
          <img
            src={image || Record}
            alt={`${title} cover`}
            className="record-placeholder-img"
          />
        </div>

        <div className="mix-card-item">
          <div className="audio-controls">
            <div className={`audio-light ${isPlaying ? "flashing" : ""}`} />
            <Text className="body-text">Audio Clip</Text>
            <Button
              className="play-button"
              variant="light"
              color="gray"
              onClick={toggleAudio}
              styles={{
                root: {
                  backgroundColor: "transparent",
                  color: "#fff",
                  borderColor: "white",
                  padding: 7,
                  minWidth: 40,
                },
              }}
            >
              {isPlaying ? (
                <IconPlayerPause size={24} />
              ) : (
                <IconPlayerPlay size={24} />
              )}
            </Button>
          </div>

          <audio
            ref={audioRef}
            src={audio}
            preload="auto"
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
          />
        </div>
      </div>
    </div>
  );
}
