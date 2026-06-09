import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { gradeService, studentService, scheduleService, authService } from '../../services/api';

export default function AdminDashboard() {
  const [etudiants, setEtudiants] = useState([]);
  const [notes, setNotes] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [emploiDuTemps, setEmploiDuTemps] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [etudiantsRes, notesRes, matieresRes, edtRes] = await Promise.all([
          studentService.getAll(),
          gradeService.getNotes(),
          gradeService.getMatieres(),
          scheduleService.getAll(),
        ]);
        setEtudiants(etudiantsRes.data);
        setNotes(notesRes.data);
        setMatieres(matieresRes.data);
        setEmploiDuTemps(edtRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleValiderNote = async (id) => {
    try {
      await gradeService.validerNote(id);
      const notesRes = await gradeService.getNotes();
      setNotes(notesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const notesEnAttente = notes.filter(n => !n.valide);
  const notesValidees = notes.filter(n => n.valide);

  return (
    <div style={styles.container}>
      <Navbar title="Espace Administrateur" />

      <div style={styles.layout}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          {[
            { key: 'dashboard', icon: '📊', label: 'Tableau de bord' },
            { key: 'etudiants', icon: '👥', label: 'Étudiants' },
            { key: 'matieres', icon: '📚', label: 'Matières' },
            { key: 'notes', icon: '📝', label: 'Validation notes' },
            { key: 'edt', icon: '📅', label: 'Emplois du temps' },
          ].map(item => (
            <button
              key={item.key}
              style={activeTab === item.key ? styles.sidebarItemActive : styles.sidebarItem}
              onClick={() => setActiveTab(item.key)}
            >
              <span style={styles.sidebarIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Contenu principal */}
        <div style={styles.main}>
          {loading ? (
            <div style={styles.loading}>Chargement...</div>
          ) : activeTab === 'dashboard' ? (
            <div>
              <h2 style={styles.pageTitle}>Tableau de bord</h2>

              {/* Statistiques */}
              <div style={styles.statsGrid}>
                <div style={{...styles.statCard, borderTop: '4px solid #1A3C6E'}}>
                  <div style={styles.statIcon}>👥</div>
                  <div style={styles.statValue}>{etudiants.length}</div>
                  <div style={styles.statLabel}>Étudiants inscrits</div>
                </div>
                <div style={{...styles.statCard, borderTop: '4px solid #059669'}}>
                  <div style={styles.statIcon}>📚</div>
                  <div style={styles.statValue}>{matieres.length}</div>
                  <div style={styles.statLabel}>Matières</div>
                </div>
                <div style={{...styles.statCard, borderTop: '4px solid #D97706'}}>
                  <div style={styles.statIcon}>📝</div>
                  <div style={styles.statValue}>{notesEnAttente.length}</div>
                  <div style={styles.statLabel}>Notes en attente</div>
                </div>
                <div style={{...styles.statCard, borderTop: '4px solid #7C3AED'}}>
                  <div style={styles.statIcon}>✅</div>
                  <div style={styles.statValue}>{notesValidees.length}</div>
                  <div style={styles.statLabel}>Notes validées</div>
                </div>
              </div>

              {/* Notes en attente de validation */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>
                  ⚠️ Notes en attente de validation ({notesEnAttente.length})
                </h3>
                {notesEnAttente.length === 0 ? (
                  <div style={styles.empty}>Toutes les notes sont validées ✅</div>
                ) : (
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeader}>
                        <th style={styles.th}>Étudiant</th>
                        <th style={styles.th}>Matière</th>
                        <th style={styles.th}>Moyenne</th>
                        <th style={styles.th}>Semestre</th>
                        <th style={styles.th}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notesEnAttente.map((note, i) => (
                        <tr key={note.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                          <td style={styles.td}>{note.etudiant_nom}</td>
                          <td style={styles.td}>{note.matiere_nom}</td>
                          <td style={{
                            ...styles.tdCenter,
                            fontWeight: 'bold',
                            color: note.moyenne >= 10 ? '#059669' : '#DC2626'
                          }}>
                            {note.moyenne ?? '-'}
                          </td>
                          <td style={styles.tdCenter}>{note.semestre}</td>
                          <td style={styles.tdCenter}>
                            <button
                              style={styles.validateBtn}
                              onClick={() => handleValiderNote(note.id)}
                            >
                              Valider
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          ) : activeTab === 'etudiants' ? (
  <div>
    <h2 style={styles.pageTitle}>Gestion des étudiants</h2>
    {/* Barre de recherche */}
    <div style={styles.searchBar}>
      <input
        type="text"
        placeholder="🔍 Rechercher par matricule ou nom..."
        style={styles.searchInput}
        value={recherche}
        onChange={e => setRecherche(e.target.value)}
      />
      {recherche && (
        <button
          style={styles.clearBtn}
          onClick={() => setRecherche('')}
        >
          ✕
        </button>
      )}
    </div>
    <div style={styles.card}>
      <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th style={styles.th}>Matricule</th>
                      <th style={styles.th}>Nom complet</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Filière</th>
                      <th style={styles.th}>Niveau</th>
                      <th style={styles.th}>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {etudiants.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={styles.empty}>
                          Aucun étudiant inscrit
                        </td>
                      </tr>
                    ) : (
                      etudiants
                  .filter(e =>
                    e.matricule.toLowerCase().includes(recherche.toLowerCase()) ||
                    e.full_name.toLowerCase().includes(recherche.toLowerCase())
                  )
                  .map((e, i) => (
                        <tr key={e.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                          <td style={styles.td}>{e.matricule}</td>
                          <td style={styles.td}>{e.full_name}</td>
                          <td style={styles.td}>{e.email}</td>
                          <td style={styles.td}>{e.filiere_nom}</td>
                          <td style={styles.tdCenter}>{e.niveau_nom}</td>
                          <td style={styles.tdCenter}>
                            <span style={e.actif ? styles.badgeOk : styles.badgeDanger}>
                              {e.actif ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          ) : activeTab === 'matieres' ? (
            <div>
              <h2 style={styles.pageTitle}>Gestion des matières</h2>
              <div style={styles.card}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th style={styles.th}>Code</th>
                      <th style={styles.th}>Nom</th>
                      <th style={styles.th}>Filière</th>
                      <th style={styles.th}>Niveau</th>
                      <th style={styles.th}>Crédits</th>
                      <th style={styles.th}>Enseignant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matieres.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={styles.empty}>
                          Aucune matière enregistrée
                        </td>
                      </tr>
                    ) : (
                      matieres.map((m, i) => (
                        <tr key={m.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                          <td style={styles.td}>{m.code}</td>
                          <td style={styles.td}>{m.nom}</td>
                          <td style={styles.td}>{m.filiere_nom}</td>
                          <td style={styles.tdCenter}>{m.niveau_nom}</td>
                          <td style={styles.tdCenter}>{m.credits}</td>
                          <td style={styles.td}>{m.enseignant_nom ?? '—'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          ) : activeTab === 'notes' ? (
            <div>
              <h2 style={styles.pageTitle}>Validation des notes</h2>
              <div style={styles.card}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th style={styles.th}>Étudiant</th>
                      <th style={styles.th}>Matricule</th>
                      <th style={styles.th}>Matière</th>
                      <th style={styles.th}>CC</th>
                      <th style={styles.th}>TP</th>
                      <th style={styles.th}>Exam</th>
                      <th style={styles.th}>Moyenne</th>
                      <th style={styles.th}>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.length === 0 ? (
                      <tr>
                        <td colSpan="8" style={styles.empty}>
                          Aucune note saisie
                        </td>
                      </tr>
                    ) : (
                      notes.map((note, i) => (
                        <tr key={note.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                          <td style={styles.td}>{note.etudiant_nom}</td>
                          <td style={styles.td}>{note.matricule}</td>
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
                          <td style={styles.tdCenter}>
                            {note.valide ? (
                              <span style={styles.badgeOk}>✅ Validée</span>
                            ) : (
                              <button
                                style={styles.validateBtn}
                                onClick={() => handleValiderNote(note.id)}
                              >
                                Valider
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          ) : activeTab === 'edt' ? (
            <div>
              <h2 style={styles.pageTitle}>Emplois du temps</h2>
              <div style={styles.card}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th style={styles.th}>Matière</th>
                      <th style={styles.th}>Enseignant</th>
                      <th style={styles.th}>Filière</th>
                      <th style={styles.th}>Niveau</th>
                      <th style={styles.th}>Jour</th>
                      <th style={styles.th}>Horaire</th>
                      <th style={styles.th}>Salle</th>
                      <th style={styles.th}>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emploiDuTemps.length === 0 ? (
                      <tr>
                        <td colSpan="8" style={styles.empty}>
                          Aucun emploi du temps enregistré
                        </td>
                      </tr>
                    ) : (
                      emploiDuTemps.map((e, i) => (
                        <tr key={e.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                          <td style={styles.td}>{e.matiere_nom}</td>
                          <td style={styles.td}>{e.enseignant_nom}</td>
                          <td style={styles.td}>{e.filiere_nom}</td>
                          <td style={styles.tdCenter}>{e.niveau_nom}</td>
                          <td style={styles.td}>
                            {e.jour.charAt(0).toUpperCase() + e.jour.slice(1)}
                          </td>
                          <td style={styles.tdCenter}>
                            {e.heure_debut} – {e.heure_fin}
                          </td>
                          <td style={styles.tdCenter}>{e.salle}</td>
                          <td style={styles.tdCenter}>
                            <span style={styles.badgeType}>{e.type_cours}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#F3F4F6', fontFamily: 'Arial, sans-serif' },
  layout: { display: 'flex', minHeight: 'calc(100vh - 64px)' },
  sidebar: { width: '220px', background: 'white', borderRight: '1px solid #E5E7EB', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '4px' },
  sidebarItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#374151', textAlign: 'left', width: '100%' },
  sidebarItemActive: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', background: '#EFF6FF', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#1A3C6E', fontWeight: 'bold', textAlign: 'left', width: '100%', borderLeft: '3px solid #1A3C6E' },
  sidebarIcon: { fontSize: '18px' },
  main: { flex: 1, padding: '24px', overflowY: 'auto' },
  pageTitle: { color: '#1A3C6E', marginTop: 0, marginBottom: '20px', fontSize: '22px' },
  loading: { textAlign: 'center', padding: '40px', color: '#6B7280' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
  statCard: { background: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  statIcon: { fontSize: '28px', marginBottom: '8px' },
  statValue: { fontSize: '32px', fontWeight: 'bold', color: '#1A3C6E' },
  statLabel: { fontSize: '13px', color: '#6B7280', marginTop: '4px' },
  card: { background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflowX: 'auto' },
  cardTitle: { color: '#1A3C6E', marginTop: 0, marginBottom: '16px', fontSize: '16px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { background: '#1A3C6E' },
  th: { color: 'white', padding: '12px 16px', textAlign: 'left', fontSize: '13px', whiteSpace: 'nowrap' },
  td: { padding: '12px 16px', fontSize: '14px', borderBottom: '1px solid #F3F4F6' },
  tdCenter: { padding: '12px 16px', fontSize: '14px', textAlign: 'center', borderBottom: '1px solid #F3F4F6' },
  trEven: { background: 'white' },
  trOdd: { background: '#F9FAFB' },
  empty: { textAlign: 'center', padding: '40px', color: '#9CA3AF' },
  badgeOk: { background: '#D1FAE5', color: '#059669', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  badgeDanger: { background: '#FEE2E2', color: '#DC2626', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  badgePending: { background: '#FEF3C7', color: '#D97706', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' },
  badgeType: { background: '#EFF6FF', color: '#1A3C6E', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  validateBtn: { background: '#059669', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  searchBar: { position: 'relative', marginBottom: '16px', display: 'flex', alignItems: 'center' },
  searchInput: { width: '100%', border: '1px solid #D1D5DB', borderRadius: '8px', padding: '12px 16px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
  clearBtn: { position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#9CA3AF' },
};