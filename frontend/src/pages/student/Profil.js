import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function Profil() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);
    try {
      await api.patch('/auth/profile/', form);
      setSuccess('Profil mis à jour avec succès !');
    } catch (err) {
      setError('Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Avatar */}
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>
            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
          </div>
          <h2 style={styles.name}>{user?.first_name} {user?.last_name}</h2>
          <span style={styles.badge}>Étudiant</span>
        </div>

        {/* Infos non modifiables */}
        <div style={styles.infoSection}>
          <h3 style={styles.sectionTitle}>Informations académiques</h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Email</span>
              <span style={styles.infoValue}>{user?.email}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Rôle</span>
              <span style={styles.infoValue}>Étudiant</span>
            </div>
          </div>
        </div>

        {/* Formulaire modification */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Modifier mes informations</h3>

          {success && <div style={styles.success}>✅ {success}</div>}
          {error && <div style={styles.error}>⚠️ {error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.twoColumns}>
              <div style={styles.field}>
                <label style={styles.label}>Prénom</label>
                <input
                  type="text"
                  style={styles.input}
                  value={form.first_name}
                  onChange={e => setForm({...form, first_name: e.target.value})}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Nom</label>
                <input
                  type="text"
                  style={styles.input}
                  value={form.last_name}
                  onChange={e => setForm({...form, last_name: e.target.value})}
                />
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Téléphone</label>
              <input
                type="text"
                style={styles.input}
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                placeholder="Ex: +229 97 00 00 00"
              />
            </div>

            <button
              type="submit"
              style={loading ? styles.buttonDisabled : styles.button}
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '24px' },
  card: { background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  avatarSection: { textAlign: 'center', marginBottom: '32px' },
  avatar: { width: '80px', height: '80px', borderRadius: '50%', background: '#2563EB', color: 'white', fontSize: '28px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' },
  name: { color: '#1A3C6E', fontSize: '22px', margin: '0 0 8px' },
  badge: { background: '#EFF6FF', color: '#2563EB', padding: '4px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' },
  infoSection: { marginBottom: '24px', padding: '20px', background: '#F9FAFB', borderRadius: '12px' },
  sectionTitle: { color: '#1A3C6E', fontSize: '15px', fontWeight: 'bold', marginTop: 0, marginBottom: '16px' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  infoItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
  infoLabel: { fontSize: '12px', color: '#9CA3AF', fontWeight: 'bold' },
  infoValue: { fontSize: '14px', color: '#1F2937', fontWeight: 'bold' },
  formSection: { marginTop: '24px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  twoColumns: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: 'bold', color: '#374151' },
  input: { border: '1px solid #D1D5DB', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', outline: 'none' },
  button: { background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' },
  buttonDisabled: { background: '#9CA3AF', color: 'white', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', cursor: 'not-allowed' },
  success: { background: '#D1FAE5', color: '#059669', padding: '10px', borderRadius: '8px', fontSize: '13px' },
  error: { background: '#FEE2E2', color: '#DC2626', padding: '10px', borderRadius: '8px', fontSize: '13px' },
};