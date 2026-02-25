import { useState, useRef, useCallback } from 'react';
import { Upload as UploadIcon, X, Trash2, Film, Image as ImageIcon, Music } from 'lucide-react';
import { uploadQueue } from '../lib/uploadQueue';
import VideoPlayer from '../components/VideoPlayer';

interface FileWithPreview {
  file: File;
  preview: string;
  type: 'image' | 'video' | 'audio';
}

export default function Upload() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMetadata, setUploadMetadata] = useState<{ [key: string]: { title: string; description: string; isPublic: boolean } }>({});

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

  const handleUpload = (file: File) => {
    const fileId = `${file.name}-${Date.now()}`;
    const metadata = uploadMetadata[fileId] || {
      title: file.name.replace(/\.[^/.]+$/, ''),
      description: '',
      isPublic: true,
    };

    uploadQueue.addTask(file, metadata);
  };

  const handleUploadAll = () => {
    files.forEach((fileItem) => {
      handleUpload(fileItem.file);
    });
    setFiles([]);
    setUploadMetadata({});
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    setFiles(prev => prev.filter((_, i) => i !== index));

    if (currentIndex === index) {
      setCurrentIndex(null);
    } else if (currentIndex !== null && currentIndex > index) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openPreview = (index: number) => {
    setCurrentIndex(index);
  };

  const closePreview = () => {
    setCurrentIndex(null);
  };

  const currentFile = currentIndex !== null ? files[currentIndex] : null;

  if (currentFile) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={closePreview}
            className="w-12 h-12 bg-black/70 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-20">
          {currentFile.type === 'image' && (
            <img
              src={currentFile.preview}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          )}

          {currentFile.type === 'video' && (
            <VideoPlayer
              src={currentFile.preview}
              className="w-full h-full"
            />
          )}

          {currentFile.type === 'audio' && (
            <div className="w-full max-w-2xl p-12 bg-white/5 rounded-3xl backdrop-blur-lg">
              <div className="text-center mb-8">
                <Music size={64} className="text-cyan-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{currentFile.file.name}</h3>
                <p className="text-white/60">
                  {(currentFile.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <audio
                src={currentFile.preview}
                controls
                className="w-full"
              />
            </div>
          )}
        </div>
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                Ready to Upload ({files.length})
              </h2>
              <button
                onClick={handleUploadAll}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
              >
                <UploadIcon size={20} />
                Upload All Files
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((fileItem, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20 transition-all"
                >
                  <div
                    onClick={() => openPreview(index)}
                    className="aspect-square bg-black/30 flex items-center justify-center overflow-hidden cursor-pointer relative group"
                  >
                    {fileItem.type === 'image' && (
                      <img
                        src={fileItem.preview}
                        alt={fileItem.file.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {fileItem.type === 'video' && (
                      <>
                        <video
                          src={fileItem.preview}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Film size={48} className="text-white" />
                        </div>
                      </>
                    )}
                    {fileItem.type === 'audio' && (
                      <Music size={48} className="text-cyan-400" />
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-semibold mb-2 truncate">
                      {fileItem.file.name}
                    </h3>
                    <p className="text-xs text-white/60 mb-3">
                      {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpload(fileItem.file);
                          removeFile(index);
                        }}
                        className="flex-1 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg text-xs font-semibold hover:bg-cyan-500/30 transition-all"
                      >
                        Upload
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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
