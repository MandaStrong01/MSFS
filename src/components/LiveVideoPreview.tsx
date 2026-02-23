import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

interface TimelineClip {
  id: string | number;
  assetId: string | number;
  track: 'video' | 'audio' | 'text';
  startTime: number;
  duration: number;
  name: string;
  url: string;
  type: string;
}

interface LiveVideoPreviewProps {
  timeline: { video: TimelineClip[]; audio: TimelineClip[]; text: TimelineClip[] };
  currentTime: number;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  duration: number;
}

export const LiveVideoPreview: React.FC<LiveVideoPreviewProps> = ({
  timeline,
  currentTime,
  isPlaying,
  setIsPlaying,
  duration
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [quality, setQuality] = useState<'auto' | '1080p' | '4K' | '8K'>('auto');
  const [showSettings, setShowSettings] = useState(false);

  const getActiveClips = () => {
    const active = {
      video: [] as TimelineClip[],
      audio: [] as TimelineClip[],
      text: [] as TimelineClip[]
    };

    Object.keys(timeline).forEach((track) => {
      timeline[track].forEach((clip: TimelineClip) => {
        const clipEndTime = clip.startTime + clip.duration;
        if (currentTime >= clip.startTime && currentTime <= clipEndTime) {
          active[track].push(clip);
        }
      });
    });

    return active;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const activeClips = getActiveClips();

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (activeClips.video.length > 0) {
      const videoClip = activeClips.video[activeClips.video.length - 1];

      ctx.fillStyle = '#7c3aed';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(videoClip.name, canvas.width / 2, canvas.height / 2 - 20);

      ctx.font = '16px sans-serif';
      ctx.fillText(
        `Playing: ${(currentTime - videoClip.startTime).toFixed(2)}s / ${videoClip.duration.toFixed(2)}s`,
        canvas.width / 2,
        canvas.height / 2 + 20
      );
    } else {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#7c3aed';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      ctx.fillStyle = '#52525b';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No Video at Playhead', canvas.width / 2, canvas.height / 2 - 10);
      ctx.font = '14px sans-serif';
      ctx.fillText('Add clips to timeline to see preview', canvas.width / 2, canvas.height / 2 + 20);
    }

    if (activeClips.text.length > 0) {
      activeClips.text.forEach((textClip, index) => {
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        const yPos = canvas.height - 100 - (index * 50);
        ctx.strokeText(textClip.name, canvas.width / 2, yPos);
        ctx.fillText(textClip.name, canvas.width / 2, yPos);
      });
    }

    const progressBar = (currentTime / duration) * canvas.width;
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(0, canvas.height - 4, progressBar, 4);

  }, [currentTime, timeline, duration]);

  return (
    <div className="flex flex-col h-full bg-zinc-900 rounded-2xl border-2 border-[#7c3aed] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#7c3aed]/30 bg-zinc-950 flex items-center justify-between">
        <h2 className="text-xl font-black uppercase text-white">Live Preview</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
            >
              <Settings size={20} />
            </button>
            {showSettings && (
              <div className="absolute right-0 top-12 bg-zinc-800 border border-[#7c3aed] rounded-lg p-4 w-48 z-10">
                <p className="text-sm font-bold mb-2">Preview Quality</p>
                {['auto', '1080p', '4K', '8K'].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setQuality(q as any);
                      setShowSettings(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${
                      quality === q ? 'bg-[#7c3aed]' : 'hover:bg-zinc-700'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-xs text-zinc-400 font-bold">{quality}</span>
        </div>
      </div>

      {/* Canvas Preview */}
      <div className="flex-1 flex items-center justify-center bg-black p-4">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      {/* Controls */}
      <div className="p-4 bg-zinc-950 border-t border-[#7c3aed]/30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-[#7c3aed] hover:bg-[#6d28d9] rounded-lg transition"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setMuted(!muted)}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
            >
              {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={muted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseInt(e.target.value));
                setMuted(false);
              }}
              className="flex-1 accent-[#7c3aed]"
            />
            <span className="text-sm font-bold text-zinc-400 w-12">{muted ? 0 : volume}%</span>
          </div>

          <button
            onClick={() => {
              if (canvasRef.current) {
                canvasRef.current.requestFullscreen();
              }
            }}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
          >
            <Maximize size={20} />
          </button>
        </div>

        {/* Active Clips Info */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {['video', 'audio', 'text'].map((track) => {
            const activeClips = getActiveClips()[track];
            return (
              <div key={track} className="bg-zinc-800 rounded-lg p-2">
                <p className="text-xs font-bold text-zinc-400 uppercase mb-1">{track}</p>
                {activeClips.length > 0 ? (
                  <p className="text-xs text-white truncate">{activeClips[0].name}</p>
                ) : (
                  <p className="text-xs text-zinc-600">No clip</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
