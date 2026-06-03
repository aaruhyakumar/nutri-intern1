import React from 'react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { id: 'dashboard',   label: 'Dashboard',     icon: '🏠', section: 'Overview' },
  { id: 'cases',       label: 'Clinical Cases', icon: '🏥', section: 'Learn' },
  { id: 'games',       label: 'Games',          icon: '🎮' },
  { id: 'leaderboard', label: 'Leaderboard',    icon: '🏆' },
  { id: 'progress',    label: 'My Progress',    icon: '📈', section: 'Resources' },
  { id: 'reviews',     label: 'My Reviews',     icon: '✍️' },
  { id: 'settings',    label: 'Settings',       icon: '⚙️' },
];

const BOTTOM_TABS = [
  { id: 'dashboard',   icon: '🏠', label: 'Home' },
  { id: 'cases',       icon: '🏥', label: 'Cases' },
  { id: 'games',       icon: '🎮', label: 'Games' },
  { id: 'leaderboard', icon: '🏆', label: 'Board' },
  { id: 'progress',    icon: '📈', label: 'Progress' },
];

const Sidebar = ({ activeSection, onSectionChange, isOpen, toggleSidebar }) => {
  const { profile, signOut } = useAuth();

  return (
    <>
      {/* Overlay */}
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={toggleSidebar} />

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px 24px',borderBottom:'1px solid #eee'}}>
          <div className="sidebar-logo" style={{padding:0,border:'none'}}>Nutri<span>Intern</span></div>
          <button onClick={toggleSidebar}
            style={{background:'none',border:'none',cursor:'pointer',fontSize:'20px',color:'var(--text-muted)',display:'none'}}
            className="sidebar-close-btn">✕</button>
        </div>
        <div className="sidebar-user">
          <div className="user-avatar">{profile?.name?.[0] || 'I'}</div>
          <div className="user-info">
            <p>{profile?.name || 'Intern'}</p>
            <span>{profile?.role || 'Clinical Dietetics'}</span>
          </div>
        </div>

        {NAV_ITEMS.map(item => (
          <React.Fragment key={item.id}>
            {item.section && <div className="nav-section">{item.section}</div>}
            <div
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => { onSectionChange(item.id); if (isOpen) toggleSidebar(); }}
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
              <div style={{fontSize:'11px',color:'var(--coral)',opacity:0.7}}>{profile?.name || 'Intern'}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <nav className="bottom-tab-bar">
        {BOTTOM_TABS.map(t => (
          <button key={t.id} onClick={() => onSectionChange(t.id)}
            className={`bottom-tab ${activeSection === t.id ? 'active' : ''}`}>
            <span style={{fontSize:'20px'}}>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
