import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, ZoomIn, ZoomOut, Trash2, Scissors, Move } from 'lucide-react';

interface TimelineClip {
  id: string | number;
  assetId: string | number;
  track: 'video' | 'audio' | 'text';
  startTime: number;
  duration: number;
  name: string;
  url: string;
  type: string;
  trimStart?: number;
  trimEnd?: number;
}

interface ProfessionalTimelineEditorProps {
  timeline: { video: TimelineClip[]; audio: TimelineClip[]; text: TimelineClip[] };
  setTimeline: (timeline: any) => void;
  duration: number;
  setDuration: (duration: number) => void;
  onDrop: (e: React.DragEvent, track: string, time: number) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  guestMode: boolean;
}

export const ProfessionalTimelineEditor: React.FC<ProfessionalTimelineEditorProps> = ({
  timeline,
  setTimeline,
  duration,
  setDuration,
  onDrop,
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  guestMode
}) => {
  const [zoom, setZoom] = useState(1);
  const [selectedClip, setSelectedClip] = useState<TimelineClip | null>(null);
  const [draggingClip, setDraggingClip] = useState<TimelineClip | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);

  const pixelsPerSecond = 100 * zoom;
  const timelineWidth = duration * pixelsPerSecond;

  useEffect(() => {
    let animationFrame: number;
    if (isPlaying) {
      const animate = () => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.016;
        });
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, duration]);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const time = (x / pixelsPerSecond);
      setCurrentTime(Math.max(0, Math.min(time, duration)));
    }
  };

  const handleDeleteClip = (track: 'video' | 'audio' | 'text', clipId: string | number) => {
    if (guestMode) {
      alert('Cannot delete in guest mode');
      return;
    }
    setTimeline({
      ...timeline,
      [track]: timeline[track].filter((c: TimelineClip) => c.id !== clipId)
    });
    setSelectedClip(null);
  };

  const handleClipDragStart = (clip: TimelineClip) => {
    if (guestMode) return;
    setDraggingClip(clip);
  };

  const handleClipDrop = (e: React.DragEvent, track: 'video' | 'audio' | 'text') => {
    if (guestMode || !draggingClip) return;

    e.preventDefault();
    e.stopPropagation();

    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newStartTime = Math.max(0, x / pixelsPerSecond);

      const updatedTimeline = { ...timeline };

      Object.keys(updatedTimeline).forEach((trackKey) => {
        updatedTimeline[trackKey] = updatedTimeline[trackKey].filter(
          (c: TimelineClip) => c.id !== draggingClip.id
        );
      });

      updatedTimeline[track].push({
        ...draggingClip,
        track,
        startTime: newStartTime
      });

      setTimeline(updatedTimeline);
    }

    setDraggingClip(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 30);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  };

  const renderTimeMarkers = () => {
    const markers = [];
    const interval = zoom > 2 ? 1 : zoom > 1 ? 5 : 10;

    for (let i = 0; i <= duration; i += interval) {
      markers.push(
        <div
          key={i}
          className="absolute top-0 flex flex-col items-center"
          style={{ left: `${i * pixelsPerSecond}px` }}
        >
          <div className="h-3 w-px bg-zinc-600"></div>
          <span className="text-xs text-zinc-400 mt-1">{formatTime(i)}</span>
        </div>
      );
    }
    return markers;
  };

  const renderClip = (clip: TimelineClip, track: 'video' | 'audio' | 'text') => {
    const clipWidth = clip.duration * pixelsPerSecond;
    const clipLeft = clip.startTime * pixelsPerSecond;

    return (
      <div
        key={clip.id}
        draggable
        onDragStart={() => handleClipDragStart(clip)}
        onClick={() => setSelectedClip(clip)}
        className={`absolute h-16 rounded-lg border-2 cursor-move flex items-center justify-between px-3 overflow-hidden ${
          selectedClip?.id === clip.id
            ? 'border-yellow-400 bg-[#7c3aed]/80'
            : 'border-[#7c3aed]/50 bg-[#7c3aed]/60 hover:bg-[#7c3aed]/80'
        }`}
        style={{
          left: `${clipLeft}px`,
          width: `${clipWidth}px`,
          minWidth: '60px'
        }}
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white truncate">{clip.name}</p>
          <p className="text-xs text-zinc-300">{clip.duration.toFixed(1)}s</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteClip(track, clip.id);
          }}
          className="ml-2 p-1 bg-red-600 hover:bg-red-700 rounded transition"
        >
          <Trash2 size={14} />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 rounded-2xl border-2 border-[#7c3aed]">
      {/* Transport Controls */}
      <div className="p-4 border-b border-[#7c3aed]/30 bg-zinc-950">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentTime(0)}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-[#7c3aed] hover:bg-[#6d28d9] rounded-lg transition"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={() => setCurrentTime(duration)}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
            >
              <SkipForward size={20} />
            </button>
            <div className="ml-4 font-mono text-lg font-bold text-[#7c3aed]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">Timeline Duration:</span>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Math.max(30, parseInt(e.target.value) || 30))}
              className="w-20 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-[#7c3aed] focus:outline-none"
              disabled={guestMode}
            />
            <span className="text-sm text-zinc-400">seconds</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.5))}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
            >
              <ZoomOut size={20} />
            </button>
            <span className="text-sm font-bold text-zinc-400 w-12 text-center">{zoom}x</span>
            <button
              onClick={() => setZoom(Math.min(5, zoom + 0.5))}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
            >
              <ZoomIn size={20} />
            </button>
          </div>
        </div>

        {/* Clip Info */}
        {selectedClip && (
          <div className="bg-zinc-800 rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Selected: {selectedClip.name}</p>
              <p className="text-xs text-zinc-400">
                Track: {selectedClip.track.toUpperCase()} • Start: {selectedClip.startTime.toFixed(2)}s • Duration: {selectedClip.duration.toFixed(2)}s
              </p>
            </div>
            <button
              onClick={() => setSelectedClip(null)}
              className="text-sm text-zinc-400 hover:text-white"
            >
              Deselect
            </button>
          </div>
        )}
      </div>

      {/* Timeline Tracks */}
      <div className="flex-1 overflow-auto scrollbar">
        <div className="min-w-max">
          {/* Time Markers */}
          <div className="h-12 bg-zinc-950 border-b border-[#7c3aed]/30 relative" style={{ width: `${timelineWidth}px` }}>
            {renderTimeMarkers()}
          </div>

          {/* Video Track */}
          <div className="border-b border-[#7c3aed]/30">
            <div className="flex">
              <div className="w-32 bg-zinc-950 p-4 flex items-center justify-center border-r border-[#7c3aed]/30 shrink-0">
                <span className="text-sm font-black uppercase text-white">Video</span>
              </div>
              <div
                ref={timelineRef}
                className="flex-1 relative bg-zinc-900 h-24 cursor-crosshair"
                style={{ width: `${timelineWidth}px` }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleClipDrop(e, 'video')}
                onClick={handleTimelineClick}
              >
                {timeline.video.map((clip) => renderClip(clip, 'video'))}
              </div>
            </div>
          </div>

          {/* Audio Track */}
          <div className="border-b border-[#7c3aed]/30">
            <div className="flex">
              <div className="w-32 bg-zinc-950 p-4 flex items-center justify-center border-r border-[#7c3aed]/30 shrink-0">
                <span className="text-sm font-black uppercase text-white">Audio</span>
              </div>
              <div
                className="flex-1 relative bg-zinc-900 h-24 cursor-crosshair"
                style={{ width: `${timelineWidth}px` }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleClipDrop(e, 'audio')}
                onClick={handleTimelineClick}
              >
                {timeline.audio.map((clip) => renderClip(clip, 'audio'))}
              </div>
            </div>
          </div>

          {/* Text Track */}
          <div>
            <div className="flex">
              <div className="w-32 bg-zinc-950 p-4 flex items-center justify-center border-r border-[#7c3aed]/30 shrink-0">
                <span className="text-sm font-black uppercase text-white">Text/FX</span>
              </div>
              <div
                className="flex-1 relative bg-zinc-900 h-24 cursor-crosshair"
                style={{ width: `${timelineWidth}px` }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleClipDrop(e, 'text')}
                onClick={handleTimelineClick}
              >
                {timeline.text.map((clip) => renderClip(clip, 'text'))}
              </div>
            </div>
          </div>

          {/* Playhead */}
          <div
            ref={playheadRef}
            className="absolute top-12 bottom-0 w-0.5 bg-red-500 pointer-events-none z-10"
            style={{
              left: `${currentTime * pixelsPerSecond + 128}px`,
              transform: 'translateX(-1px)'
            }}
          >
            <div className="w-3 h-3 bg-red-500 -translate-x-1/2 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-zinc-950 border-t border-[#7c3aed]/30">
        <p className="text-sm text-zinc-400 text-center">
          <span className="font-bold text-white">Drag assets from Media Library</span> onto tracks •
          <span className="font-bold text-white"> Click clips</span> to select •
          <span className="font-bold text-white"> Drag clips</span> to reposition •
          <span className="font-bold text-white"> Click timeline</span> to scrub
        </p>
      </div>
    </div>
  );
};
