import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminInterns = lazy(() => import('../pages/admin/AdminInterns'));
const AdminCases = lazy(() => import('../pages/admin/AdminCases'));
const AdminGames = lazy(() => import('../pages/admin/AdminGames'));
const AdminReviews = lazy(() => import('../pages/admin/AdminReviews'));

const NAV = [
  { id: 'dashboard', label: 'Dashboard',      icon: '🏠', section: 'Overview' },
  { id: 'interns',   label: 'Intern Records',  icon: '👥', section: 'Manage' },
  { id: 'cases',     label: 'Case Studies',    icon: '📋' },
  { id: 'games',     label: 'Games',           icon: '🎮' },
  { id: 'reviews',   label: 'Reviews',         icon: '✍️', section: 'Feedback' },
];

const BOTTOM_TABS = [
  { id: 'dashboard', icon: '🏠', label: 'Home' },
  { id: 'interns',   icon: '👥', label: 'Interns' },
  { id: 'cases',     icon: '📋', label: 'Cases' },
  { id: 'games',     icon: '🎮', label: 'Games' },
  { id: 'reviews',   icon: '✍️', label: 'Reviews' },
];

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
    }}>{children}</div>
  );
};

const AdminLayout = () => {
  const { profile, signOut } = useAuth();
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (active) {
      case 'dashboard': return <AdminDashboard />;
      case 'interns':   return <AdminInterns />;
      case 'cases':     return <AdminCases />;
      case 'games':     return <AdminGames />;
      case 'reviews':   return <AdminReviews />;
      default:          return <AdminDashboard />;
    }
  };

  return (
    <div className="app-layout">

      {/* Mobile Top Navbar */}
      <header className="mobile-topbar">
        <button className="burger-btn" onClick={() => setSidebarOpen(o => !o)}>
          <span className={`burger-line ${sidebarOpen ? 'open' : ''}`} />
          <span className={`burger-line ${sidebarOpen ? 'open' : ''}`} />
          <span className={`burger-line ${sidebarOpen ? 'open' : ''}`} />
        </button>
        <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'16px',color:'var(--coral)'}}>Nutri<span style={{color:'var(--text)'}}>Admin</span></div>
        <div style={{width:'40px'}} />
      </header>

      {/* Sidebar overlay */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px 24px',borderBottom:'1px solid #eee'}}>
          <div className="sidebar-logo" style={{padding:0,border:'none',color:'var(--coral)'}}>Nutri<span style={{color:'var(--text)'}}>Admin</span></div>
          <button onClick={() => setSidebarOpen(false)}
            className="sidebar-close-btn"
            style={{background:'none',border:'none',cursor:'pointer',fontSize:'20px',color:'var(--text-muted)',display:'none'}}>
            ✕
          </button>
        </div>
        <div className="sidebar-user">
          <div className="user-avatar" style={{background:'linear-gradient(135deg,var(--coral),#a83010)'}}>
            {profile?.name?.[0] || 'A'}
          </div>
          <div className="user-info">
            <p>{profile?.name || 'Admin'}</p>
            <span>Administrator</span>
          </div>
        </div>

        {NAV.map(item => (
          <React.Fragment key={item.id}>
            {item.section && <div className="nav-section">{item.section}</div>}
            <div
              className={`nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
            >
              <span className="nav-icon">{item.icon}</span> {item.label}
            </div>
          </React.Fragment>
        ))}

        <div className="sidebar-footer">
          <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 12px',borderRadius:'var(--radius-sm)',background:'var(--coral-light)',cursor:'pointer',transition:'opacity 0.2s'}} onClick={signOut}
            onMouseEnter={e=>e.currentTarget.style.opacity='0.8'}
            onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
            <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'var(--coral)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',flexShrink:0}}>
              🚪
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:'13px',color:'var(--coral)'}}>Sign Out</div>
              <div style={{fontSize:'11px',color:'var(--coral)',opacity:0.7}}>{profile?.name || 'Admin'}</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <Suspense fallback={<div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div>}>
          <PageTransition pageKey={active}>
            {renderPage()}
          </PageTransition>
        </Suspense>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="bottom-tab-bar">
        {BOTTOM_TABS.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`bottom-tab ${active === t.id ? 'active' : ''}`}>
            <span style={{fontSize:'20px'}}>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminLayout;
