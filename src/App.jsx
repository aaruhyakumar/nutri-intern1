import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';

const AdminLayout = lazy(() => import('./components/AdminLayout'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Cases = lazy(() => import('./pages/Cases'));
const Games = lazy(() => import('./pages/Games'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const MyReviews = lazy(() => import('./pages/MyReviews'));
const Settings = lazy(() => import('./pages/Settings'));
const Progress = lazy(() => import('./pages/Progress'));
import './index.css';

const PageTransition = ({ children, pageKey }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, [pageKey]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity 0.25s ease, transform 0.25s ease',
    }}>
      {children}
    </div>
  );
};

const AppContent = () => {
  const { user, isAdmin } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => setActiveSection(e.detail);
    document.addEventListener('navigate', handler);
    return () => document.removeEventListener('navigate', handler);
  }, []);

  if (!user) return <Suspense fallback={<div className="loading-screen" />}><Login /></Suspense>;
  if (isAdmin) return <Suspense fallback={<div className="loading-screen" />}><AdminLayout /></Suspense>;

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':   return <Dashboard />;
      case 'cases':       return <Cases />;
      case 'leaderboard': return <Leaderboard />;
      case 'progress':    return <Progress />;
      case 'reviews':     return <MyReviews />;
      case 'settings':    return <Settings />;
      default:            return <Dashboard />;
    }
  };

  const PAGE_TITLES = {
    dashboard: 'Dashboard', cases: 'Clinical Cases', games: 'Games',
    leaderboard: 'Leaderboard', progress: 'My Progress', reviews: 'My Reviews',
    settings: 'Settings'
  };

  const canGoBack = activeSection !== 'dashboard';

  return (
    <div className="app-layout">
      {/* Mobile Top Navbar */}
      <header className="mobile-topbar">
        {canGoBack ? (
          <button className="burger-btn" onClick={() => setActiveSection('dashboard')}
            style={{color:'var(--teal)',fontWeight:700,fontSize:'20px',gap:0}}>
            ←
          </button>
        ) : (
          <button className="burger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <span className={`burger-line ${isSidebarOpen ? 'open' : ''}`} />
            <span className={`burger-line ${isSidebarOpen ? 'open' : ''}`} />
            <span className={`burger-line ${isSidebarOpen ? 'open' : ''}`} />
          </button>
        )}
        <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'16px',color:'var(--teal)'}}>
          {canGoBack ? PAGE_TITLES[activeSection] : <span>Nutri<span style={{color:'var(--coral)'}}>Intern</span></span>}
        </div>
        <button className="burger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{opacity: canGoBack ? 1 : 0, pointerEvents: canGoBack ? 'auto' : 'none'}}>
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>
      </header>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className="main-content">
        <Suspense fallback={<div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div>}>
          {activeSection === 'games'
            ? <Games />
            : <PageTransition pageKey={activeSection}>{renderSection()}</PageTransition>
          }
        </Suspense>
      </main>
    </div>
  );
};

function App() {
  return <AuthProvider><AppContent /></AuthProvider>;
}

export default App;
