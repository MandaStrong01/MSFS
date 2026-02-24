import { Star, Sparkles, TrendingUp, Award, Zap, Heart } from 'lucide-react';

const featuredItems = [
  {
    id: 1,
    title: 'AI Video Generator Pro',
    description: 'Transform text into stunning videos with advanced AI. Perfect for social media content creators.',
    category: 'Video',
    rating: 4.9,
    users: '50K+',
    icon: Sparkles,
    color: '#ff6b6b',
    badge: 'Most Popular'
  },
  {
    id: 2,
    title: 'Smart Audio Enhancer',
    description: 'Crystal-clear audio in seconds. Remove background noise and enhance voice quality automatically.',
    category: 'Audio',
    rating: 4.8,
    users: '35K+',
    icon: Zap,
    color: '#4ecdc4',
    badge: 'Staff Pick'
  },
  {
    id: 3,
    title: 'Image Style Transfer',
    description: 'Apply artistic styles to your photos using cutting-edge neural networks.',
    category: 'Image',
    rating: 4.9,
    users: '42K+',
    icon: Award,
    color: '#95e1d3',
    badge: 'Best Quality'
  },
  {
    id: 4,
    title: 'Content Summarizer AI',
    description: 'Get instant summaries of long articles, documents, and videos. Save hours of reading time.',
    category: 'Text',
    rating: 4.7,
    users: '28K+',
    icon: TrendingUp,
    color: '#f38181',
    badge: 'Productivity'
  },
  {
    id: 5,
    title: 'Voice Cloning Studio',
    description: 'Create realistic voice clones for narration, audiobooks, and voiceovers.',
    category: 'Audio',
    rating: 4.8,
    users: '31K+',
    icon: Heart,
    color: '#aa96da',
    badge: 'Trending'
  },
  {
    id: 6,
    title: 'Background Remover Pro',
    description: 'Remove backgrounds from images instantly with AI-powered precision.',
    category: 'Image',
    rating: 4.9,
    users: '45K+',
    icon: Star,
    color: '#fcbad3',
    badge: 'Editor\'s Pick'
  }
];

export default function EditorsChoice() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      padding: '48px 24px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}>
            <Star size={40} style={{ color: '#ffd700' }} />
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Editor's Choice
            </h1>
          </div>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            Hand-picked by our team: The best AI tools that deliver exceptional results
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '32px',
        }}>
          {featuredItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '32px',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 16px 48px ${item.color}40`;
                  e.currentTarget.style.borderColor = item.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: item.color,
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>
                  {item.badge}
                </div>

                <div style={{
                  width: '64px',
                  height: '64px',
                  background: `${item.color}20`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <Icon size={32} style={{ color: item.color }} />
                </div>

                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: 'white',
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '20px',
                  lineHeight: '1.6',
                }}>
                  {item.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <Star size={16} fill="#ffd700" color="#ffd700" />
                    <span style={{ color: 'white', fontWeight: '600' }}>{item.rating}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}>
                    <span style={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}>
                      {item.users} users
                    </span>
                    <span style={{
                      background: `${item.color}30`,
                      color: item.color,
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}>
                      {item.category}
                    </span>
                  </div>
                </div>

                <button style={{
                  width: '100%',
                  marginTop: '20px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  Try Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
