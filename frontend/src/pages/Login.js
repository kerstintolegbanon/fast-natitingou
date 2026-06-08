import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(identifiant, password);
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'teacher') navigate('/teacher');
      else if (user.role === 'student') navigate('/student');
    } catch (err) {
      setError('Identifiant ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.header}>
          <img
            src="/logo-fast.jpeg"
            alt="Logo FAST"
            style={styles.logo}
          />
          <h1 style={styles.title}>FAST Natitingou</h1>
          <p style={styles.subtitle}>Plateforme de gestion académique</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.error}>⚠️ {error}</div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Identifiant</label>
            <input
              type="text"
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              placeholder="Nom et Prénom(s) complets ou Email"
              style={styles.input}
              required
            />
            <span style={styles.hint}>
              Étudiant : tapez votre nom complet tel qu'il figure sur votre acte de naissance
            </span>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Matricule ou mot de passe"
              style={styles.input}
              required
            />
            <span style={styles.hint}>
              Étudiant : votre mot de passe est votre numéro matricule
            </span>
          </div>

          <button
            type="submit"
            style={loading ? styles.buttonDisabled : styles.button}
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p style={styles.footer}>
          Université de Natitingou © 2026
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #C0392B 0%, #922B21 50%, #1A5276 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logo: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto 16px',
    display: 'block',
    border: '3px solid #C0392B',
  },
  title: {
    color: '#C0392B',
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '0 0 4px',
  },
  subtitle: {
    color: '#666',
    fontSize: '14px',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  error: {
    background: '#FEE2E2',
    color: '#DC2626',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    color: '#374151',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '14px',
    outline: 'none',
  },
  hint: {
    fontSize: '11px',
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  button: {
    background: '#C0392B',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
  },
  buttonDisabled: {
    background: '#9CA3AF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'not-allowed',
    marginTop: '8px',
  },
  footer: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: '12px',
    marginTop: '24px',
    marginBottom: 0,
  },
};