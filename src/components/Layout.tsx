import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sparkles, Upload, Star, FolderOpen } from 'lucide-react';
import UploadQueueStatus from './UploadQueueStatus';

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}>
        <nav style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
          }}>
            <Sparkles size={32} style={{ color: '#00d4ff' }} />
            MandaStrong Studios
          </Link>

          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link to="/" style={{
              textDecoration: 'none',
              color: isActive('/') ? '#00d4ff' : 'white',
              fontSize: '16px',
              fontWeight: isActive('/') ? '600' : '400',
              transition: 'color 0.3s',
            }}>
              Home
            </Link>
            <Link to="/tools" style={{
              textDecoration: 'none',
              color: isActive('/tools') ? '#00d4ff' : 'white',
              fontSize: '16px',
              fontWeight: isActive('/tools') ? '600' : '400',
              transition: 'color 0.3s',
            }}>
              Tools
            </Link>
            <Link to="/projects" style={{
              textDecoration: 'none',
              color: isActive('/projects') ? '#00d4ff' : 'white',
              fontSize: '16px',
              fontWeight: isActive('/projects') ? '600' : '400',
              transition: 'color 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <FolderOpen size={16} />
              Projects
            </Link>
            <Link to="/editors-choice" style={{
              textDecoration: 'none',
              color: isActive('/editors-choice') ? '#00d4ff' : 'white',
              fontSize: '16px',
              fontWeight: isActive('/editors-choice') ? '600' : '400',
              transition: 'color 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <Star size={16} />
              Editor's Choice
            </Link>
            <Link to="/pricing" style={{
              textDecoration: 'none',
              color: isActive('/pricing') ? '#00d4ff' : 'white',
              fontSize: '16px',
              fontWeight: isActive('/pricing') ? '600' : '400',
              transition: 'color 0.3s',
            }}>
              Pricing
            </Link>
            <Link to="/about" style={{
              textDecoration: 'none',
              color: isActive('/about') ? '#00d4ff' : 'white',
              fontSize: '16px',
              fontWeight: isActive('/about') ? '600' : '400',
              transition: 'color 0.3s',
            }}>
              About
            </Link>
            <Link to="/upload" style={{
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 212, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <Upload size={20} />
              Upload
            </Link>
          </div>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <UploadQueueStatus />

      <footer style={{
        background: 'rgba(0, 0, 0, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '32px 24px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginBottom: '16px',
        }}>
          <Link to="/terms" style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            textDecoration: 'none',
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#00d4ff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>
            Terms of Service
          </Link>
          <Link to="/disclaimer" style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            textDecoration: 'none',
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#00d4ff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>
            Disclaimer
          </Link>
        </div>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
          © 2024 MandaStrong Studios. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
