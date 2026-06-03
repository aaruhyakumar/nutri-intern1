import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getUser, getProfile } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safety timeout — if Supabase doesn't respond in 5s, stop loading anyway
    const timeout = setTimeout(() => setLoading(false), 5000);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      clearTimeout(timeout);
      if (session?.user) {
        setUser(session.user);
        // fetch profile in background, don't block render
        getProfile(session.user.id)
          .then(p => setProfile(p))
          .catch(() => setProfile(null));
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
    signOut: () => supabase.auth.signOut()
  };

  return (
    <AuthContext.Provider value={value}>
      {loading
        ? <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#0a5c47 0%,#1D9E75 60%,#5DCAA5 100%)'}}>
            <div style={{textAlign:'center'}}>
              {/* Logo */}
              <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'36px',color:'white',marginBottom:'8px'}}>
                Nutri<span style={{color:'#fde68a'}}>Intern</span>
              </div>
              <div style={{fontSize:'13px',color:'rgba(255,255,255,0.7)',fontWeight:600,marginBottom:'40px'}}>Clinical Dietetics Training Platform</div>
              {/* Spinner */}
              <div style={{display:'flex',justifyContent:'center',gap:'8px'}}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width:'10px', height:'10px', borderRadius:'50%',
                    background:'rgba(255,255,255,0.9)',
                    animation:`bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
            <style>{`
              @keyframes bounce {
                0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
                40% { transform: scale(1); opacity: 1; }
              }
            `}</style>
          </div>
        : children
      }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
