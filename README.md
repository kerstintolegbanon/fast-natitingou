# Plateforme Web de Gestion Académique — FAST Natitingou

Application web complète de gestion académique pour la Faculté des Sciences
et Techniques (FAST) de Natitingou. Elle permet la gestion des étudiants,
des notes, des emplois du temps avec trois profils : Étudiant, Enseignant
et Administrateur.

---

## Prérequis

Avant de commencer, assure-toi d'avoir installé :

- Python 3.11 ou plus
- Node.js 18 ou plus
- PostgreSQL 15 ou plus
- Git

---

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Kerstintolegbanon/fast-natitingou.git
cd fast-natitingou
```

### 2. Configurer le Backend Django

```bash
# Créer et activer l'environnement virtuel
python -m venv env

# Windows
env\Scripts\activate

# Mac/Linux
source env/bin/activate

# Installer les dépendances
pip install django djangorestframework djangorestframework-simplejwt psycopg2-binary django-cors-headers pillow
```

### 3. Configurer la base de données

Ouvre **pgAdmin** et crée une base de données appelée `fast_db`.

Ensuite ouvre `config/settings.py` et modifie :

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'fast_db',
        'USER': 'postgres',
        'PASSWORD': 'ton-mot-de-passe',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### 4. Appliquer les migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Créer un compte administrateur

```bash
python manage.py createsuperuser
```

Remplis les informations :
- Username : admin
- Email : admin@fast-natitingou.bj
- Password : Fast2026@

Ensuite va sur `http://127.0.0.1:8000/admin` et change
le rôle du compte admin de `student` à `admin`.

### 6. Lancer le serveur Django

```bash
python manage.py runserver
```

Backend accessible sur `http://127.0.0.1:8000`

---

### 7. Configurer le Frontend React

Ouvre un nouveau terminal :

```bash
cd frontend
npm install
npm start
```

Frontend accessible sur `http://localhost:3000`

---

## Structure du projet

fast_nati_projet/
├── config/               ← paramètres Django
├── users/                ← gestion des utilisateurs
├── students/             ← gestion des étudiants
├── grades/               ← gestion des notes
├── schedule/             ← emplois du temps
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── admin/    ← tableau de bord admin
│       │   ├── teacher/  ← tableau de bord enseignant
│       │   └── student/  ← tableau de bord étudiant
│       ├── components/   ← composants réutilisables
│       ├── services/     ← appels API
│       └── context/      ← authentification
├── manage.py
└── README.md

---

## Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| Administrateur | admin@fast-natitingou.bj | Fast2026@ |
| Enseignant | kone@fast.bj | Prof2026@ |
| Étudiant | FAST2026001@fast.bj | FAST2026001 |

> **Note** — Le mot de passe de l'étudiant est son numéro matricule.
> L'email de l'étudiant suit le format : `matricule@fast.bj`

---

## Créer un compte étudiant

1. Connecte-toi sur http://127.0.0.1:8000/admin
2. Clique sur "Users" → "Add user"
3. Remplis :

  - Username : prenom_nom
  - Email : MATRICULE@fast.bj
  - Password : MATRICULE
  - First name : Prénom
  - Last name : NOM
  - Role : student


4. Clique sur "Etudiants" → "Add etudiant"

5. Remplis :

  - User : l'étudiant créé
  - Matricule : MATRICULE
  - Filière et Niveau

---

## API disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/login/ | Connexion |
| GET | /api/auth/profile/ | Profil connecté |
| GET | /api/students/ | Liste étudiants |
| GET | /api/grades/notes/ | Liste notes |
| POST | /api/grades/notes/ | Créer une note |
| PATCH | /api/grades/notes/:id/valider/ | Valider une note |
| GET | /api/grades/matieres/ | Liste matières |
| GET | /api/schedule/ | Emplois du temps |

---

## Fonctionnalités

### Étudiant
- Consulter ses notes par matière
- Voir son emploi du temps
- Modifier son profil
- Suivre ses moyennes en temps réel

### Enseignant
- Saisir les notes CC / TP / Examen
- Rechercher un étudiant par matricule ou nom
- Voir son emploi du temps

### Administrateur
- Gérer tous les utilisateurs
- Valider les notes officiellement
- Rechercher un étudiant par matricule ou nom
- Gérer les matières et filières
- Configurer les emplois du temps

---

## Technologies utilisées

| Couche | Technologie |
|--------|-------------|
| Frontend | React.js, React Router, Axios |
| Backend | Django, Django REST Framework |
| Authentification | JWT (SimpleJWT) |
| Base de données | PostgreSQL |
| Styles | CSS-in-JS |

---

## Auteur

Projet réalisé dans le cadre du cursus académique
à la FAST — Université de Natitingou.

Dépôt GitHub : https://github.com/Kerstintolegbanon/fast-natitingou

Année académique : 2025-2026