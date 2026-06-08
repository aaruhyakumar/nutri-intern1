import React, { useState } from 'react';
import { signIn } from '../supabaseClient';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const raw = identifier.trim();
    const loginEmail = raw.includes('@') ? raw : `${raw.toLowerCase()}@nutriintern.app`;
    const { error: signInError } = await signIn(loginEmail, password);
    if (signInError) { setError(signInError.message); setLoading(false); }
  };

  return (
    <div className="login-bg">
      <div className="login-left">
        <div className="login-brand">Nutri<span>Intern</span></div>
        <div className="login-tagline">Your clinical dietetics training platform — built for the ward.</div>
        <div className="login-features">
          <div className="login-feature"><div className="login-feature-icon">📋</div><div className="login-feature-text">Real clinical case studies</div></div>
          <div className="login-feature"><div className="login-feature-icon">🎮</div><div className="login-feature-text">Interactive learning games</div></div>
          <div className="login-feature"><div className="login-feature-icon">🧠</div><div className="login-feature-text">AI-powered answer evaluation</div></div>
          <div className="login-feature"><div className="login-feature-icon">📈</div><div className="login-feature-text">Track your progress over time</div></div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-right-logo">Nutri<span>Intern</span></div>
        <div style={{display:'flex',gap:'8px',marginBottom:'28px'}}>
          <button type="button" onClick={() => { setIsAdmin(false); setError(''); }}
            style={{flex:1,padding:'8px',borderRadius:'8px',border:'2px solid',fontWeight:700,fontSize:'13px',cursor:'pointer',
              borderColor: !isAdmin ? 'var(--teal)' : '#ddd',
              background: !isAdmin ? 'var(--teal-light)' : 'white',
              color: !isAdmin ? 'var(--teal)' : 'var(--text-muted)'}}>
            🎓 Intern Login
          </button>
          <button type="button" onClick={() => { setIsAdmin(true); setError(''); }}
            style={{flex:1,padding:'8px',borderRadius:'8px',border:'2px solid',fontWeight:700,fontSize:'13px',cursor:'pointer',
              borderColor: isAdmin ? 'var(--coral)' : '#ddd',
              background: isAdmin ? 'var(--coral-light)' : 'white',
              color: isAdmin ? 'var(--coral)' : 'var(--text-muted)'}}>
            🛡️ Admin Login
          </button>
        </div>
        <div className="login-right-title">{isAdmin ? 'Admin Access 🛡️' : 'Welcome back 👋'}</div>
        <div className="login-right-sub">{isAdmin ? 'Sign in with your Admin ID to continue' : 'Sign in with your Intern ID to continue'}</div>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>{isAdmin ? 'Admin ID' : 'Intern ID'}</label>
            <input 
              type="text"
              placeholder={isAdmin ? 'e.g. ADMIN001' : 'e.g. INTERN01'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
              required autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div style={{position:'relative'}}>
              <input 
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{paddingRight:'48px'}}
              />
              <button type="button" onClick={() => setShowPass(p => !p)}
                style={{position:'absolute',right:'14px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:'18px',color:'var(--text-muted)'}}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          
          {error && <div style={{color:'var(--coral)',fontSize:'13px',fontWeight:'600',marginBottom:'14px',padding:'10px 14px',background:'var(--coral-light)',borderRadius:'8px',borderLeft:'3px solid var(--coral)'}}>{error}</div>}
          
          <button className="btn-login" type="submit" disabled={loading}
            style={isAdmin ? {background:'linear-gradient(135deg,var(--coral),#a83010)'} : {}}>
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>
        </form>
        
        <p className="login-note">{isAdmin ? 'Admin access only. Unauthorized access is prohibited.' : 'Access restricted to registered interns only.'}</p>
      </div>
    </div>
  );
};

export default Login;
