import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { gradeService, scheduleService } from '../../services/api';

export default function StudentDashboard() {
  const [notes, setNotes] = useState([]);
  const [emploiDuTemps, setEmploiDuTemps] = useState([]);
  const [activeTab, setActiveTab] = useState('notes');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [notesRes, edtRes] = await Promise.all([
          gradeService.getNotes(),
          scheduleService.getAll(),
        ]);
        setNotes(notesRes.data);
        setEmploiDuTemps(edtRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const moyenneGenerale = notes.length > 0
    ? (notes.reduce((sum, n) => sum + (n.moyenne || 0), 0) / notes.length).toFixed(2)
    : 0;

  const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

  return (
    <div style={styles.container}>
      <Navbar title="Espace Étudiant" />

      <div style={styles.content}>
        {/* Carte moyenne générale */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{moyenneGenerale}</div>
            <div style={styles.statLabel}>Moyenne générale</div>
          </div>
          <div style={{...styles.statCard, background: '#059669'}}>
            <div style={styles.statValue}>{notes.filter(n => n.valide).length}</div>
            <div style={styles.statLabel}>Notes validées</div>
          </div>
          <div style={{...styles.statCard, background: '#D97706'}}>
            <div style={styles.statValue}>{notes.length}</div>
            <div style={styles.statLabel}>Total matières</div>
          </div>
          <div style={{...styles.statCard, background: '#7C3AED'}}>
            <div style={styles.statValue}>{emploiDuTemps.length}</div>
            <div style={styles.statLabel}>Cours par semaine</div>
          </div>
        </div>

        {/* Onglets */}
        <div style={styles.tabs}>
          <button
            style={activeTab === 'notes' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('notes')}
          >
            📊 Mes notes
          </button>
          <button
            style={activeTab === 'edt' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('edt')}
          >
            📅 Emploi du temps
          </button>
        </div>

        {/* Contenu des onglets */}
        {loading ? (
          <div style={styles.loading}>Chargement...</div>
        ) : activeTab === 'notes' ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Matière</th>
                  <th style={styles.th}>CC</th>
                  <th style={styles.th}>TP</th>
                  <th style={styles.th}>Examen</th>
                  <th style={styles.th}>Moyenne</th>
                  <th style={styles.th}>Semestre</th>
                  <th style={styles.th}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {notes.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={styles.empty}>
                      Aucune note disponible
                    </td>
                  </tr>
                ) : (
                  notes.map((note, i) => (
                    <tr key={note.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                      <td style={styles.td}>{note.matiere_nom}</td>
                      <td style={styles.tdCenter}>{note.note_cc ?? '-'}</td>
                      <td style={styles.tdCenter}>{note.note_tp ?? '-'}</td>
                      <td style={styles.tdCenter}>{note.note_exam ?? '-'}</td>
                      <td style={{
                        ...styles.tdCenter,
                        fontWeight: 'bold',
                        color: note.moyenne >= 10 ? '#059669' : '#DC2626'
                      }}>
                        {note.moyenne ?? '-'}
                      </td>
                      <td style={styles.tdCenter}>{note.semestre}</td>
                      <td style={styles.tdCenter}>
                        <span style={note.valide ? styles.badgeOk : styles.badgePending}>
                          {note.valide ? '✅ Validée' : '⏳ En attente'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.edtContainer}>
            {jours.map(jour => {
              const cours = emploiDuTemps.filter(e => e.jour === jour);
              return (
                <div key={jour} style={styles.jourBlock}>
                  <div style={styles.jourTitle}>
                    {jour.charAt(0).toUpperCase() + jour.slice(1)}
                  </div>
                  {cours.length === 0 ? (
                    <div style={styles.pasDesCours}>Pas de cours</div>
                  ) : (
                    cours.map(c => (
                      <div key={c.id} style={styles.coursCard}>
                        <div style={styles.coursHeure}>
                          {c.heure_debut} – {c.heure_fin}
                        </div>
                        <div style={styles.coursNom}>{c.matiere_nom}</div>
                        <div style={styles.coursInfo}>
                          {c.type_cours} • Salle {c.salle}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#F3F4F6', fontFamily: 'Arial, sans-serif' },
  content: { padding: '24px', maxWidth: '1200px', margin: '0 auto' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
  statCard: { background: '#1A3C6E', color: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center' },
  statValue: { fontSize: '32px', fontWeight: 'bold' },
  statLabel: { fontSize: '13px', opacity: 0.8, marginTop: '4px' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '16px' },
  tab: { padding: '10px 20px', border: '1px solid #D1D5DB', borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '14px' },
  tabActive: { padding: '10px 20px', border: 'none', borderRadius: '8px', background: '#1A3C6E', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' },
  loading: { textAlign: 'center', padding: '40px', color: '#6B7280' },
  tableContainer: { background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { background: '#1A3C6E' },
  th: { color: 'white', padding: '12px 16px', textAlign: 'left', fontSize: '13px' },
  td: { padding: '12px 16px', fontSize: '14px', borderBottom: '1px solid #F3F4F6' },
  tdCenter: { padding: '12px 16px', fontSize: '14px', textAlign: 'center', borderBottom: '1px solid #F3F4F6' },
  trEven: { background: 'white' },
  trOdd: { background: '#F9FAFB' },
  empty: { textAlign: 'center', padding: '40px', color: '#9CA3AF' },
  badgeOk: { background: '#D1FAE5', color: '#059669', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' },
  badgePending: { background: '#FEF3C7', color: '#D97706', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' },
  edtContainer: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  jourBlock: { background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  jourTitle: { fontWeight: 'bold', color: '#1A3C6E', marginBottom: '12px', fontSize: '16px', borderBottom: '2px solid #1A3C6E', paddingBottom: '8px' },
  pasDesCours: { color: '#9CA3AF', fontSize: '13px', fontStyle: 'italic' },
  coursCard: { background: '#EFF6FF', borderRadius: '8px', padding: '10px', marginBottom: '8px', borderLeft: '3px solid #2563EB' },
  coursHeure: { fontSize: '12px', color: '#6B7280', marginBottom: '4px' },
  coursNom: { fontSize: '14px', fontWeight: 'bold', color: '#1E40AF' },
  coursInfo: { fontSize: '12px', color: '#6B7280', marginTop: '2px' },
};