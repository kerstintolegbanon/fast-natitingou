import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { gradeService, studentService, scheduleService } from '../../services/api';

export default function TeacherDashboard() {
  const [notes, setNotes] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [emploiDuTemps, setEmploiDuTemps] = useState([]);
  const [activeTab, setActiveTab] = useState('notes');
  const [loading, setLoading] = useState(true);

  // Formulaire saisie note
  const [formNote, setFormNote] = useState({
    etudiant: '',
    matiere: '',
    note_cc: '',
    note_tp: '',
    note_exam: '',
    semestre: 'S1',
    annee_academique: '2025-2026',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [notesRes, etudiantsRes, matieresRes, edtRes] = await Promise.all([
          gradeService.getNotes(),
          studentService.getAll(),
          gradeService.getMatieres(),
          scheduleService.getAll(),
        ]);
        setNotes(notesRes.data);
        setEtudiants(etudiantsRes.data);
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

  const handleSubmitNote = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await gradeService.createNote(formNote);
      setSuccessMsg('Note enregistrée avec succès !');
      // Recharge les notes
      const notesRes = await gradeService.getNotes();
      setNotes(notesRes.data);
      // Réinitialise le formulaire
      setFormNote({
        etudiant: '',
        matiere: '',
        note_cc: '',
        note_tp: '',
        note_exam: '',
        semestre: 'S1',
        annee_academique: '2025-2026',
      });
    } catch (err) {
      setErrorMsg('Erreur lors de la saisie. Vérifiez les données.');
    }
  };

  const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

  return (
    <div style={styles.container}>
      <Navbar title="Espace Enseignant" />

      <div style={styles.content}>
        {/* Statistiques */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{etudiants.length}</div>
            <div style={styles.statLabel}>Mes étudiants</div>
          </div>
          <div style={{...styles.statCard, background: '#059669'}}>
            <div style={styles.statValue}>{matieres.length}</div>
            <div style={styles.statLabel}>Mes matières</div>
          </div>
          <div style={{...styles.statCard, background: '#D97706'}}>
            <div style={styles.statValue}>{notes.length}</div>
            <div style={styles.statLabel}>Notes saisies</div>
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
            📝 Saisie des notes
          </button>
          <button
            style={activeTab === 'etudiants' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('etudiants')}
          >
            👥 Mes étudiants
          </button>
          <button
            style={activeTab === 'edt' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('edt')}
          >
            📅 Mon emploi du temps
          </button>
        </div>

        {loading ? (
          <div style={styles.loading}>Chargement...</div>
        ) : activeTab === 'notes' ? (
          <div style={styles.twoColumns}>
            {/* Formulaire saisie */}
            <div style={styles.formCard}>
              <h3 style={styles.cardTitle}>Saisir une note</h3>
              {successMsg && <div style={styles.success}>{successMsg}</div>}
              {errorMsg && <div style={styles.error}>{errorMsg}</div>}
              <form onSubmit={handleSubmitNote} style={styles.form}>
                <div style={styles.field}>
                  <label style={styles.label}>Étudiant</label>
                  <select
                    style={styles.select}
                    value={formNote.etudiant}
                    onChange={e => setFormNote({...formNote, etudiant: e.target.value})}
                    required
                  >
                    <option value="">Sélectionner un étudiant</option>
                    {etudiants.map(e => (
                      <option key={e.id} value={e.id}>
                        {e.matricule} - {e.full_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Matière</label>
                  <select
                    style={styles.select}
                    value={formNote.matiere}
                    onChange={e => setFormNote({...formNote, matiere: e.target.value})}
                    required
                  >
                    <option value="">Sélectionner une matière</option>
                    {matieres.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.code} - {m.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.threeColumns}>
                  <div style={styles.field}>
                    <label style={styles.label}>CC (30%)</label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      style={styles.input}
                      value={formNote.note_cc}
                      onChange={e => setFormNote({...formNote, note_cc: e.target.value})}
                      placeholder="0-20"
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>TP (20%)</label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      style={styles.input}
                      value={formNote.note_tp}
                      onChange={e => setFormNote({...formNote, note_tp: e.target.value})}
                      placeholder="0-20"
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Examen (50%)</label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      style={styles.input}
                      value={formNote.note_exam}
                      onChange={e => setFormNote({...formNote, note_exam: e.target.value})}
                      placeholder="0-20"
                    />
                  </div>
                </div>

                <div style={styles.twoColumnsForm}>
                  <div style={styles.field}>
                    <label style={styles.label}>Semestre</label>
                    <select
                      style={styles.select}
                      value={formNote.semestre}
                      onChange={e => setFormNote({...formNote, semestre: e.target.value})}
                    >
                      <option value="S1">Semestre 1</option>
                      <option value="S2">Semestre 2</option>
                    </select>
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Année académique</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={formNote.annee_academique}
                      onChange={e => setFormNote({...formNote, annee_academique: e.target.value})}
                    />
                  </div>
                </div>

                <button type="submit" style={styles.button}>
                  Enregistrer la note
                </button>
              </form>
            </div>

            {/* Liste des notes */}
            <div style={styles.tableCard}>
              <h3 style={styles.cardTitle}>Notes saisies</h3>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>Étudiant</th>
                    <th style={styles.th}>Matière</th>
                    <th style={styles.th}>Moy.</th>
                    <th style={styles.th}>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={styles.empty}>
                        Aucune note saisie
                      </td>
                    </tr>
                  ) : (
                    notes.map((note, i) => (
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
                        <td style={styles.tdCenter}>
                          <span style={note.valide ? styles.badgeOk : styles.badgePending}>
                            {note.valide ? '✅' : '⏳'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'etudiants' ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Matricule</th>
                  <th style={styles.th}>Nom complet</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Filière</th>
                  <th style={styles.th}>Niveau</th>
                </tr>
              </thead>
              <tbody>
                {etudiants.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={styles.empty}>
                      Aucun étudiant trouvé
                    </td>
                  </tr>
                ) : (
                  etudiants.map((e, i) => (
                    <tr key={e.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                      <td style={styles.td}>{e.matricule}</td>
                      <td style={styles.td}>{e.full_name}</td>
                      <td style={styles.td}>{e.email}</td>
                      <td style={styles.td}>{e.filiere_nom}</td>
                      <td style={styles.tdCenter}>{e.niveau_nom}</td>
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
                          {c.type_cours} • Salle {c.salle} • {c.filiere_nom} {c.niveau_nom}
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
  twoColumns: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  twoColumnsForm: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  threeColumns: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' },
  formCard: { background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  tableCard: { background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  cardTitle: { color: '#1A3C6E', marginTop: 0, marginBottom: '16px', fontSize: '16px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  field: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '13px', fontWeight: 'bold', color: '#374151' },
  input: { border: '1px solid #D1D5DB', borderRadius: '8px', padding: '10px', fontSize: '14px' },
  select: { border: '1px solid #D1D5DB', borderRadius: '8px', padding: '10px', fontSize: '14px', background: 'white' },
  button: { background: '#1A3C6E', color: 'white', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' },
  success: { background: '#D1FAE5', color: '#059669', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '8px' },
  error: { background: '#FEE2E2', color: '#DC2626', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '8px' },
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
  jourTitle: { fontWeight: 'bold', color: '#059669', marginBottom: '12px', fontSize: '16px', borderBottom: '2px solid #059669', paddingBottom: '8px' },
  pasDesCours: { color: '#9CA3AF', fontSize: '13px', fontStyle: 'italic' },
  coursCard: { background: '#ECFDF5', borderRadius: '8px', padding: '10px', marginBottom: '8px', borderLeft: '3px solid #059669' },
  coursHeure: { fontSize: '12px', color: '#6B7280', marginBottom: '4px' },
  coursNom: { fontSize: '14px', fontWeight: 'bold', color: '#065F46' },
  coursInfo: { fontSize: '12px', color: '#6B7280', marginTop: '2px' },
};