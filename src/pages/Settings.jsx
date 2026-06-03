import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const Settings = () => {
  const { profile, user, signOut } = useAuth();
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // { type: 'success'|'error', text }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (newPass.length < 8) {
      setMsg({ type: 'error', text: 'New password must be at least 8 characters.' });
      return;
    }
    if (newPass !== confirmPass) {
      setMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setLoading(true);

    // Re-authenticate with current password first
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPass,
    });

    if (signInError) {
      setMsg({ type: 'error', text: 'Current password is incorrect.' });
      setLoading(false);
      return;
    }

    // Update to new password
    const { error } = await supabase.auth.updateUser({ password: newPass });

    if (error) {
      setMsg({ type: 'error', text: error.message });
    } else {
      setMsg({ type: 'success', text: 'Password changed successfully! 🎉' });
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    }
    setLoading(false);
  };

  const strength = (p) => {
    if (!p) return null;
    if (p.length < 6) return { label: 'Too short', color: 'var(--coral)', width: '20%' };
    if (p.length < 8) return { label: 'Weak', color: 'var(--amber)', width: '40%' };
    if (p.length < 12 && !/[^a-zA-Z0-9]/.test(p)) return { label: 'Fair', color: 'var(--amber)', width: '60%' };
    if (p.length >= 12 || /[^a-zA-Z0-9]/.test(p)) return { label: 'Strong', color: 'var(--teal)', width: '100%' };
    return { label: 'Good', color: 'var(--teal)', width: '80%' };
  };

  const pwStrength = strength(newPass);

  return (
    <div style={{maxWidth:'520px', margin:'0 auto'}}>
      <div className="page-header">
        <h1>Settings ⚙️</h1>
        <p>Manage your account preferences</p>
      </div>

      {/* Profile Info Card */}
      <div className="card" style={{marginBottom:'20px'}}>
        <div className="card-title">👤 Account Info</div>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'linear-gradient(135deg,var(--teal-mid),var(--teal))',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:'22px',flexShrink:0}}>
            {profile?.name?.[0] || 'I'}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:'16px',color:'var(--text)'}}>{profile?.name || 'Intern'}</div>
            <div style={{fontSize:'13px',color:'var(--text-muted)',marginTop:'2px'}}>{user?.email}</div>
            <div style={{fontSize:'12px',color:'var(--teal)',fontWeight:700,marginTop:'4px'}}>
              Level {profile?.level || 1} · {profile?.xp || 0} XP
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Card */}
      <div className="card" style={{marginBottom:'20px'}}>
        <div className="card-title">🚪 Sign Out</div>
        <p style={{fontSize:'13px',color:'var(--text-muted)',marginBottom:'16px'}}>You'll be returned to the login screen.</p>
        <button className="btn btn-secondary" onClick={signOut}
          style={{width:'100%',color:'var(--coral)',borderColor:'var(--coral)',background:'var(--coral-light)'}}>
          ← Sign Out
        </button>
      </div>

      {/* Change Password Card */}
      <div className="card">
        <div className="card-title">🔒 Change Password</div>

        <form onSubmit={handleChangePassword}>
          {/* Current Password */}
          <div className="form-group">
            <label>Current Password</label>
            <div style={{position:'relative'}}>
              <input
                type={showCurrent ? 'text' : 'password'}
                placeholder="Enter current password"
                value={currentPass}
                onChange={e => setCurrentPass(e.target.value)}
                required
                style={{paddingRight:'48px'}}
              />
              <button type="button" onClick={() => setShowCurrent(p => !p)}
                style={{position:'absolute',right:'14px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:'18px',color:'var(--text-muted)'}}>
                {showCurrent ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="form-group">
            <label>New Password</label>
            <div style={{position:'relative'}}>
              <input
                type={showNew ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                required
                style={{paddingRight:'48px'}}
              />
              <button type="button" onClick={() => setShowNew(p => !p)}
                style={{position:'absolute',right:'14px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:'18px',color:'var(--text-muted)'}}>
                {showNew ? '🙈' : '👁️'}
              </button>
            </div>
            {/* Password strength bar */}
            {pwStrength && (
              <div style={{marginTop:'8px'}}>
                <div style={{background:'#eee',borderRadius:'20px',height:'5px',overflow:'hidden'}}>
                  <div style={{height:'100%',borderRadius:'20px',background:pwStrength.color,width:pwStrength.width,transition:'width 0.3s,background 0.3s'}} />
                </div>
                <div style={{fontSize:'11px',fontWeight:700,color:pwStrength.color,marginTop:'4px'}}>{pwStrength.label}</div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
              required
              style={{borderColor: confirmPass && confirmPass !== newPass ? 'var(--coral)' : ''}}
            />
            {confirmPass && confirmPass !== newPass && (
              <div style={{fontSize:'11px',color:'var(--coral)',fontWeight:700,marginTop:'4px'}}>Passwords don't match</div>
            )}
          </div>

          {/* Message */}
          {msg && (
            <div style={{
              padding:'12px 14px', borderRadius:'10px', marginBottom:'16px',
              fontSize:'13px', fontWeight:700,
              background: msg.type === 'success' ? 'var(--teal-light)' : 'var(--coral-light)',
              color: msg.type === 'success' ? 'var(--teal)' : 'var(--coral)',
              borderLeft: `3px solid ${msg.type === 'success' ? 'var(--teal)' : 'var(--coral)'}`
            }}>
              {msg.text}
            </div>
          )}

          <button className="btn btn-primary" type="submit" disabled={loading} style={{width:'100%'}}>
            {loading ? 'Updating...' : 'Update Password →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
