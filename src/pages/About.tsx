import { Heart, Users, Target, Zap } from 'lucide-react';

export default function About() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      padding: '48px 24px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            About MandaStrong Studios
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Empowering creators worldwide with cutting-edge AI technology that transforms ideas into reality
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '48px',
          marginBottom: '48px',
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '24px',
          }}>
            Our Story
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.8',
            marginBottom: '20px',
          }}>
            MandaStrong Studios was founded with a simple mission: make professional-grade AI tools accessible to everyone.
            We believe that creativity shouldn't be limited by technical barriers or expensive software.
          </p>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.8',
          }}>
            Today, we serve over 100,000 creators worldwide, from individual artists to major production studios,
            providing them with the tools they need to bring their visions to life.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '48px',
        }}>
          {[
            {
              icon: Heart,
              title: 'Our Mission',
              description: 'Democratize access to professional AI tools for creators everywhere',
              color: '#ff6b6b',
            },
            {
              icon: Users,
              title: 'Our Community',
              description: '100,000+ creators using our platform daily',
              color: '#4ecdc4',
            },
            {
              icon: Target,
              title: 'Our Vision',
              description: 'Build the most comprehensive AI creative suite in the world',
              color: '#ffd700',
            },
            {
              icon: Zap,
              title: 'Our Innovation',
              description: 'Constantly pushing boundaries with cutting-edge AI research',
              color: '#00d4ff',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '32px',
                  transition: 'all 0.3s',
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
                  width: '56px',
                  height: '56px',
                  background: `${item.color}20`,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <Icon size={28} style={{ color: item.color }} />
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.6',
                }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #00d4ff20 0%, #0099cc20 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          borderRadius: '24px',
          padding: '48px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '16px',
          }}>
            Join Our Community
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px',
          }}>
            Be part of a growing community of creators pushing the boundaries of what's possible with AI
          </p>
          <button style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
            border: 'none',
            color: 'white',
            padding: '16px 40px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 212, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}
