import React, { useState, useRef } from 'react';
import { Upload, Video, Music, Image as ImageIcon, FileText, Trash2, Play, Search, Grid3x3, List } from 'lucide-react';
import { useLoading } from '../contexts/LoadingContext';

interface MediaAsset {
  id: string | number;
  name: string;
  type: 'video' | 'audio' | 'image' | 'text';
  size: string;
  url: string;
  duration?: number;
  thumbnail?: string;
  timestamp: string;
  storagePath?: string;
}

interface ProfessionalMediaLibraryProps {
  mediaLibrary: MediaAsset[];
  setMediaLibrary: (assets: MediaAsset[]) => void;
  onDragStart: (asset: MediaAsset) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  guestMode: boolean;
}

export const ProfessionalMediaLibrary: React.FC<ProfessionalMediaLibraryProps> = ({
  mediaLibrary,
  setMediaLibrary,
  onDragStart,
  onFileUpload,
  guestMode
}) => {
  const { showLoading, hideLoading } = useLoading();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'video' | 'audio' | 'image' | 'text'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredAssets = mediaLibrary.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || asset.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDeleteAsset = async (assetId: string | number) => {
    if (guestMode) {
      alert('Cannot delete in guest mode');
      return;
    }
    if (confirm('Delete this asset?')) {
      showLoading('Deleting asset from media library...');
      await new Promise(resolve => setTimeout(resolve, 500));
      setMediaLibrary(mediaLibrary.filter(a => a.id !== assetId));
      hideLoading();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={20} />;
      case 'audio': return <Music size={20} />;
      case 'image': return <ImageIcon size={20} />;
      case 'text': return <FileText size={20} />;
      default: return <Video size={20} />;
    }
  };

  const getThumbnail = (asset: MediaAsset) => {
    if (asset.type === 'video' || asset.type === 'image') {
      return asset.url;
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 rounded-2xl border-2 border-[#7c3aed]">
      {/* Header */}
      <div className="p-6 border-b border-[#7c3aed]/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black uppercase text-white">Media Library</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
            >
              {viewMode === 'grid' ? <List size={20} /> : <Grid3x3 size={20} />}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#7c3aed] hover:bg-[#6d28d9] px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition"
              disabled={guestMode}
            >
              <Upload size={20} />
              Upload
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-zinc-400 focus:border-[#7c3aed] focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'video', 'audio', 'image', 'text'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={`px-4 py-2 rounded-lg font-bold uppercase text-sm transition ${
                  filterType === type
                    ? 'bg-[#7c3aed] text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-zinc-400 mt-3">
          {filteredAssets.length} of {mediaLibrary.length} assets
        </p>
      </div>

      {/* Asset Grid/List */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar">
        {filteredAssets.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <Upload size={64} className="text-zinc-600 mb-4" />
            <p className="text-xl font-bold text-zinc-400 mb-2">No Assets Yet</p>
            <p className="text-sm text-zinc-500 mb-6">Upload videos, images, audio or create text to get started</p>
            {!guestMode && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#7c3aed] hover:bg-[#6d28d9] px-6 py-3 rounded-lg font-bold transition"
              >
                Upload First Asset
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                draggable
                onDragStart={() => onDragStart(asset)}
                className="group relative bg-zinc-800 rounded-xl overflow-hidden cursor-move hover:ring-2 hover:ring-[#7c3aed] transition"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-zinc-900 flex items-center justify-center relative overflow-hidden">
                  {getThumbnail(asset) ? (
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-[#7c3aed]">
                      {getIcon(asset.type)}
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    {getIcon(asset.type)}
                    {asset.type.toUpperCase()}
                  </div>

                  {/* Duration Badge */}
                  {asset.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold">
                      {asset.duration}s
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPreviewAsset(asset)}
                      className="bg-[#7c3aed] hover:bg-[#6d28d9] p-2 rounded-lg transition"
                    >
                      <Play size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition"
                      disabled={guestMode}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-sm font-bold text-white truncate" title={asset.name}>
                    {asset.name}
                  </p>
                  <p className="text-xs text-zinc-400">{asset.size}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                draggable
                onDragStart={() => onDragStart(asset)}
                className="group flex items-center gap-4 bg-zinc-800 rounded-xl p-4 cursor-move hover:bg-zinc-750 hover:ring-2 hover:ring-[#7c3aed] transition"
              >
                <div className="text-[#7c3aed]">
                  {getIcon(asset.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">{asset.name}</p>
                  <p className="text-sm text-zinc-400">{asset.type.toUpperCase()} • {asset.size}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => setPreviewAsset(asset)}
                    className="bg-[#7c3aed] hover:bg-[#6d28d9] p-2 rounded-lg transition"
                  >
                    <Play size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition"
                    disabled={guestMode}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*,audio/*,image/*"
        onChange={onFileUpload}
        className="hidden"
      />

      {/* Preview Modal */}
      {previewAsset && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
          onClick={() => setPreviewAsset(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-zinc-900 rounded-2xl p-6">
              <h3 className="text-2xl font-black mb-4">{previewAsset.name}</h3>
              {previewAsset.type === 'video' && (
                <video src={previewAsset.url} controls className="w-full rounded-xl" />
              )}
              {previewAsset.type === 'audio' && (
                <audio src={previewAsset.url} controls className="w-full" />
              )}
              {previewAsset.type === 'image' && (
                <img src={previewAsset.url} className="w-full rounded-xl" />
              )}
              <button
                onClick={() => setPreviewAsset(null)}
                className="mt-4 bg-[#7c3aed] hover:bg-[#6d28d9] px-6 py-3 rounded-lg font-bold w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
