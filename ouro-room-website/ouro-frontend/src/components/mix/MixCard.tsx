import { useRef, useState } from "react";
import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react";
import { Button, Container, Text } from "@mantine/core";
import '../../App.css';
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
  isSelected?: boolean; // optional if you want to keep this for future use
}

export default function MixCard({ mix }: MixCardProps) {
  const { artist, title, audio, image } = mix;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };

  const handleEnded = () => setIsPlaying(false);

  return (
    <Container className="mix-card" style={{ position: "relative", zIndex: 10 }}>
      <Text className="mix-text">{artist}</Text>
      <Text className="mix-text-small">{title}</Text>
      
     <div className="mix-img">
  <img
    src={image || Record}
    alt={title + " cover"}
    className="record-placeholder-img"
  />
</div>
      
      <div className="mix-item">
        <div className="audio-controls">
          <div className={`audio-light ${isPlaying ? "flashing" : ""}`} />
          <Text className="audio-label">Audio Clip</Text>
          <Button
            variant="light"
            color="gray"
            onClick={toggleAudio}
            styles={{
              root: {
                backgroundColor: "transparent",
                color: "#fff",
                borderColor: "black",
                padding: 7,
                minWidth: 40,
                "&:hover": {
                  backgroundColor: "#4b5563",
                },
              },
            }}
          >
            {isPlaying ? <IconPlayerPause size={24} /> : <IconPlayerPlay size={24} />}
          </Button>
        </div>

        <audio
          ref={audioRef}
          src={audio}   // fixed here
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleEnded}
        />
      </div>
    </Container>
  );
}