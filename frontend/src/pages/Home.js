import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <img src="/logo-fast.jpeg" alt="Logo FAST" style={styles.logoImg} />
          <div>
            <div style={styles.navTitle}>Faculté des Sciences et Techniques</div>
            <div style={styles.navSub}>Université de Natitingou — Bénin</div>
          </div>
        </div>
        <button style={styles.loginBtn} onClick={() => navigate('/login')}>
          Se connecter
        </button>
      </nav>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>Plateforme académique 2025–2026</div>
          <h1 style={styles.heroTitle}>
            Bienvenue à la<br />
            <span style={styles.heroHighlight}>FAST Natitingou</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Gérez vos notes, emplois du temps et activités académiques
            depuis une seule plateforme moderne et sécurisée.
          </p>
          <button style={styles.btnPrimary} onClick={() => navigate('/login')}>
            Accéder à la plateforme →
          </button>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          {[
            { value: '3', label: 'Profils utilisateurs', icon: '👥' },
            { value: '100%', label: 'Sécurisé JWT', icon: '🔒' },
            { value: '24/7', label: 'Disponible', icon: '🌐' },
            { value: '∞', label: 'Matières gérées', icon: '📚' },
          ].map((s, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statIcon}>{s.icon}</div>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fonctionnalités */}
      <div style={styles.features}>
        <h2 style={styles.sectionTitle}>Une plateforme pour chaque rôle</h2>
        <p style={styles.sectionSubtitle}>
          Trois espaces distincts adaptés aux besoins de chaque utilisateur
        </p>
        <div style={styles.featuresGrid}>
          {[
            {
              icon: '🎓',
              title: 'Étudiant',
              color: '#C0392B',
              bg: '#FDEDEC',
              items: [
                'Consulter ses notes par matière',
                'Voir son emploi du temps',
                'Suivre ses moyennes en temps réel',
                'Voir le statut de validation des notes',
              ]
            },
            {
              icon: '👨‍🏫',
              title: 'Enseignant',
              color: '#B7950B',
              bg: '#FEF9E7',
              items: [
                'Saisir les notes CC / TP / Examen',
                'Consulter la liste des étudiants',
                'Voir son emploi du temps',
                'Suivre les notes déjà saisies',
              ]
            },
            {
              icon: '⚙️',
              title: 'Administrateur',
              color: '#1A5276',
              bg: '#EBF5FB',
              items: [
                'Gérer tous les utilisateurs',
                'Valider les notes officiellement',
                'Gérer les matières et filières',
                'Configurer les emplois du temps',
              ]
            },
          ].map((f, i) => (
            <div key={i} style={{...styles.featureCard, borderTop: `4px solid ${f.color}`}}>
              <div style={{...styles.featureIcon, background: f.bg, color: f.color}}>
                {f.icon}
              </div>
              <h3 style={{...styles.featureTitle, color: f.color}}>{f.title}</h3>
              <ul style={styles.featureList}>
                {f.items.map((item, j) => (
                  <li key={j} style={styles.featureItem}>
                    <span style={{color: f.color, marginRight: '8px'}}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                style={{...styles.featureBtn, background: f.color}}
                onClick={() => navigate('/login')}
              >
                Accéder →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <img src="/logo-fast.jpeg" alt="Logo FAST" style={styles.ctaLogo} />
        <h2 style={styles.ctaTitle}>Prêt à commencer ?</h2>
        <p style={styles.ctaSubtitle}>
          Connectez-vous avec vos identifiants fournis par l'administration de la FAST.
        </p>
        <button style={styles.ctaBtn} onClick={() => navigate('/login')}>
          Se connecter maintenant
        </button>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLeft}>
            <img src="/logo-fast.jpeg" alt="Logo FAST" style={styles.ctaLogo} />
            <div>
              <div style={styles.footerName}>Faculté des Sciences et Techniques</div>
              <div style={styles.footerCity}>Université de Natitingou — Bénin</div>
            </div>
          </div>
          <div style={styles.footerRight}>
            © 2026 FAST Natitingou. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}

const RED = '#C0392B';
const GOLD = '#B7950B';
const BLUE = '#1A5276';
const LIGHT_RED = '#FDEDEC';

const styles = {
  container: { 
    fontFamily: 'Arial, sans-serif', 
    minHeight: '100vh', 
    background: `url('/logo-fast.jpeg') center/cover fixed no-repeat`,
  },

  // Nav
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 48px', background: 'white', borderBottom: `3px solid ${RED}`, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  navLeft: { display: 'flex', alignItems: 'center', gap: '14px' },
  logoImg: { width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${RED}` },
  navTitle: { fontSize: '15px', fontWeight: 'bold', color: RED },
  navSub: { fontSize: '12px', color: '#6B7280' },
  loginBtn: { background: RED, color: 'white', border: 'none', borderRadius: '8px', padding: '10px 24px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' },

  // Hero
  hero: { 
    background: `linear-gradient(135deg, #1A3C6E 0%, #2E86C1 50%, #1A5276 100%)`,
    padding: '60px 48px', 
    color: 'white' 
  },
  heroContent: { maxWidth: '700px', margin: '0 auto', textAlign: 'center', marginBottom: '48px' },
  heroLogo: { width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.5)', marginBottom: '20px' },
  badge: { display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '20px' },
  heroTitle: { fontSize: '44px', fontWeight: 'bold', margin: '0 0 20px', lineHeight: 1.2 },
  heroHighlight: { color: '#F9E79F' },
  heroSubtitle: { fontSize: '17px', opacity: 0.9, lineHeight: 1.6, marginBottom: '32px' },
  btnPrimary: { background: 'white', color: RED, border: 'none', borderRadius: '10px', padding: '14px 36px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },

  // Stats
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '800px', margin: '0 auto' },
  statCard: { background: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' },
  statIcon: { fontSize: '28px', marginBottom: '8px' },
  statValue: { fontSize: '28px', fontWeight: 'bold', color: '#F9E79F' },
  statLabel: { fontSize: '12px', opacity: 0.85, marginTop: '4px' },

  // Features
  features: { padding: '80px 48px', background: '#FDF2F2' },
  sectionTitle: { textAlign: 'center', fontSize: '30px', fontWeight: 'bold', color: RED, margin: '0 0 12px' },
  sectionSubtitle: { textAlign: 'center', color: '#6B7280', fontSize: '16px', marginBottom: '48px' },
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1100px', margin: '0 auto' },
  featureCard: { background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  featureIcon: { width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' },
  featureTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' },
  featureList: { listStyle: 'none', padding: 0, margin: '0 0 24px' },
  featureItem: { fontSize: '14px', color: '#374151', marginBottom: '10px', display: 'flex', alignItems: 'flex-start' },
  featureBtn: { color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', width: '100%' },

  // CTA
  cta: { background: `linear-gradient(135deg, ${BLUE} 0%, #154360 100%)`, padding: '60px 48px', textAlign: 'center' },
  ctaLogo: { width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', marginBottom: '20px' },
  ctaTitle: { color: 'white', fontSize: '30px', fontWeight: 'bold', margin: '0 0 12px' },
  ctaSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '32px' },
  ctaBtn: { background: GOLD, color: 'white', border: 'none', borderRadius: '10px', padding: '14px 40px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },

  // Footer
  footer: { background: '#1C1C1C', padding: '24px 48px' },
  footerContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  footerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  footerLogo: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' },
  footerName: { color: 'white', fontSize: '14px', fontWeight: 'bold' },
  footerCity: { color: 'rgba(255,255,255,0.5)', fontSize: '12px' },
  footerRight: { color: 'rgba(255,255,255,0.4)', fontSize: '12px' },
};