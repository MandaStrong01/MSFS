import { useState, useRef, useCallback } from 'react';
import { Upload as UploadIcon, X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw, Download, Trash2 } from 'lucide-react';

interface FileWithPreview {
  file: File;
  preview: string;
  type: 'image' | 'video' | 'audio';
}

export default function Upload() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = useCallback((selectedFiles: File[]) => {
    const newFiles: FileWithPreview[] = [];

    selectedFiles.forEach(selectedFile => {
      const type = selectedFile.type.split('/')[0];
      if (type === 'image' || type === 'video' || type === 'audio') {
        const url = URL.createObjectURL(selectedFile);
        newFiles.push({
          file: selectedFile,
          preview: url,
          type: type as 'image' | 'video' | 'audio'
        });
      }
    });

    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleFilesChange(droppedFiles);
    }
  }, [handleFilesChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const togglePlay = () => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      if (isPlaying) {
        media.pause();
      } else {
        media.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      media.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      setCurrentTime(media.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      setDuration(media.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const media = videoRef.current || audioRef.current;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    if (media) {
      media.currentTime = percent * duration;
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleReset = () => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      media.currentTime = 0;
      media.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    setFiles(prev => prev.filter((_, i) => i !== index));

    if (currentIndex === index) {
      setCurrentIndex(null);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    } else if (currentIndex !== null && currentIndex > index) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openPreview = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const closePreview = () => {
    setCurrentIndex(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const currentFile = currentIndex !== null ? files[currentIndex] : null;

  if (currentFile) {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2000,
        }}
      >
        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          zIndex: 10,
          display: 'flex',
          gap: '12px',
        }}>
          <button
            onClick={closePreview}
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 0, 0, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
        }}>
          {currentFile.type === 'image' && (
            <img
              src={currentFile.preview}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          )}

          {currentFile.type === 'video' && (
            <video
              ref={videoRef}
              src={currentFile.preview}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          )}

          {currentFile.type === 'audio' && (
            <div style={{
              width: '100%',
              maxWidth: '600px',
              padding: '48px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              backdropFilter: 'blur(20px)',
            }}>
              <audio
                ref={audioRef}
                src={currentFile.preview}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
              <div style={{
                textAlign: 'center',
                marginBottom: '32px',
              }}>
                <Volume2 size={64} style={{ color: '#00d4ff', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>{currentFile.file.name}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {(currentFile.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
        </div>

        {(currentFile.type === 'video' || currentFile.type === 'audio') && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            padding: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
            }}>
              <div
                onClick={handleSeek}
                style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  marginBottom: '16px',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: `${(currentTime / duration) * 100}%`,
                  height: '100%',
                  background: '#00d4ff',
                  borderRadius: '3px',
                  transition: 'width 0.1s',
                }} />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}>
                  <button
                    onClick={togglePlay}
                    style={{
                      background: '#00d4ff',
                      border: 'none',
                      color: 'white',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 212, 255, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>

                  <button
                    onClick={handleReset}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <RotateCcw size={20} />
                  </button>

                  <button
                    onClick={toggleMute}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>

                  <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', minWidth: '100px' }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  {currentFile.type === 'video' && (
                    <button
                      onClick={toggleFullscreen}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                  )}

                  <button
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      padding: '48px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Upload Your Media
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.7)',
          }}>
            Transform your content with AI-powered tools
          </p>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          style={{
            background: isDragging ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: `2px dashed ${isDragging ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'}`,
            borderRadius: '24px',
            padding: '80px 48px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files || []);
              if (selectedFiles.length > 0) {
                handleFilesChange(selectedFiles);
              }
            }}
            accept="image/*,video/*,audio/*"
            style={{ display: 'none' }}
          />

          <div style={{
            width: '120px',
            height: '120px',
            background: 'rgba(0, 212, 255, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
          }}>
            <UploadIcon size={60} style={{ color: '#00d4ff' }} />
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '16px',
          }}>
            Drop your files here
          </h2>

          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '32px',
          }}>
            or click to browse from your device
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            <div style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.7)',
            }}>
              Images
            </div>
            <div style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.7)',
            }}>
              Videos
            </div>
            <div style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.7)',
            }}>
              Audio
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div style={{ marginTop: '48px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '24px',
              textAlign: 'center',
            }}>
              Uploaded Files ({files.length})
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '24px',
            }}>
              {files.map((fileItem, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 212, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    onClick={() => openPreview(index)}
                    style={{
                      aspectRatio: '1',
                      background: 'rgba(0, 0, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    {fileItem.type === 'image' && (
                      <img
                        src={fileItem.preview}
                        alt={fileItem.file.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    {fileItem.type === 'video' && (
                      <video
                        src={fileItem.preview}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    {fileItem.type === 'audio' && (
                      <Volume2 size={48} style={{ color: '#00d4ff' }} />
                    )}
                  </div>

                  <div style={{ padding: '16px' }}>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {fileItem.file.name}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '12px',
                    }}>
                      {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                      }}
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
