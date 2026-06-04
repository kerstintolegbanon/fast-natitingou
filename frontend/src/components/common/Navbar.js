import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleLabel = {
    admin: 'Administrateur',
    teacher: 'Enseignant',
    student: 'Étudiant',
  };

  const roleColor = {
    admin: '#DC2626',
    teacher: '#059669',
    student: '#2563EB',
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <div style={styles.logo}>FAST</div>
        <span style={styles.title}>{title}</span>
      </div>
      <div style={styles.right}>
        <div style={styles.userInfo}>
          <span style={styles.userName}>
            {user?.first_name} {user?.last_name}
          </span>
          <span style={{
            ...styles.roleBadge,
            background: roleColor[user?.role] + '20',
            color: roleColor[user?.role],
          }}>
            {roleLabel[user?.role]}
          </span>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#1A3C6E',
    color: 'white',
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logo: {
    background: 'white',
    color: '#1A3C6E',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px',
  },
  userName: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  roleBadge: {
    fontSize: '11px',
    padding: '2px 8px',
    borderRadius: '12px',
    fontWeight: 'bold',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.15)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};