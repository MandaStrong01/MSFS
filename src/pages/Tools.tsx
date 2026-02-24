import { useState } from 'react';
import { Search, Video, Image, Music, FileText, Code, Database, Brush, Brain, Wand2 } from 'lucide-react';

const categories = [
  { name: 'All', icon: Wand2 },
  { name: 'Video', icon: Video },
  { name: 'Image', icon: Image },
  { name: 'Audio', icon: Music },
  { name: 'Text', icon: FileText },
  { name: 'Code', icon: Code },
  { name: 'Data', icon: Database },
  { name: 'Design', icon: Brush },
  { name: 'AI Models', icon: Brain },
];

const tools = [
  { name: 'Video Enhancer', category: 'Video', description: 'Upscale and enhance video quality', color: '#ff6b6b' },
  { name: 'Background Remover', category: 'Image', description: 'Remove backgrounds from images', color: '#4ecdc4' },
  { name: 'Voice Generator', category: 'Audio', description: 'Text-to-speech with AI voices', color: '#95e1d3' },
  { name: 'Content Writer', category: 'Text', description: 'Generate high-quality content', color: '#f38181' },
  { name: 'Code Assistant', category: 'Code', description: 'AI-powered code completion', color: '#aa96da' },
  { name: 'Video Editor', category: 'Video', description: 'Edit videos with AI assistance', color: '#ff6b6b' },
  { name: 'Image Upscaler', category: 'Image', description: 'Enhance image resolution', color: '#4ecdc4' },
  { name: 'Audio Cleaner', category: 'Audio', description: 'Remove noise from audio', color: '#95e1d3' },
  { name: 'Summarizer', category: 'Text', description: 'Summarize long documents', color: '#f38181' },
  { name: 'Bug Detector', category: 'Code', description: 'Find bugs in your code', color: '#aa96da' },
  { name: 'Video Transcriber', category: 'Video', description: 'Convert speech to text', color: '#ff6b6b' },
  { name: 'Style Transfer', category: 'Image', description: 'Apply artistic styles', color: '#4ecdc4' },
  { name: 'Music Generator', category: 'Audio', description: 'Create AI-generated music', color: '#95e1d3' },
  { name: 'Translator', category: 'Text', description: 'Translate to 100+ languages', color: '#f38181' },
  { name: 'Code Converter', category: 'Code', description: 'Convert between languages', color: '#aa96da' },
  { name: 'Object Detector', category: 'Image', description: 'Detect objects in images', color: '#4ecdc4' },
  { name: 'Voice Cloner', category: 'Audio', description: 'Clone any voice', color: '#95e1d3' },
  { name: 'Sentiment Analyzer', category: 'Text', description: 'Analyze text sentiment', color: '#f38181' },
];

export default function Tools() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      padding: '48px 24px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
            600+ AI Tools
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.7)',
          }}>
            Discover the perfect tool for your creative needs
          </p>
        </div>

        <div style={{
          maxWidth: '600px',
          margin: '0 auto 48px',
          position: 'relative',
        }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255, 255, 255, 0.4)',
            }}
          />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 20px 16px 52px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.3s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#00d4ff';
              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '48px',
          overflowX: 'auto',
          padding: '8px 0',
        }}>
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                style={{
                  background: isSelected ? '#00d4ff' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isSelected ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: isSelected ? '600' : '400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
              >
                <Icon size={20} />
                {category.name}
              </button>
            );
          })}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 32px ${tool.color}40`;
                e.currentTarget.style.borderColor = tool.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: `${tool.color}20`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Wand2 size={24} style={{ color: tool.color }} />
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}>
                {tool.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '16px',
              }}>
                {tool.description}
              </p>
              <span style={{
                display: 'inline-block',
                background: `${tool.color}30`,
                color: tool.color,
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
              }}>
                {tool.category}
              </span>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
          }}>
            <p style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              No tools found matching your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
