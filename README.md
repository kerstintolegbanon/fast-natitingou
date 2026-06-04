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
git clone https://github.com/ton-username/fast-natitingou.git
cd fast-natitingou
```

### 2. Configurer le Backend Django

```bash
# Aller dans le dossier backend
cd backend

# Créer et activer l'environnement virtuel
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

# Installer les dépendances
pip install django djangorestframework djangorestframework-simplejwt psycopg2-binary django-cors-headers pillow
```

### 3. Configurer la base de données

Ouvre **pgAdmin** et crée une base de données appelée `fast_db`.

Ensuite ouvre le fichier `config/settings.py` et modifie :

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'fast_db',
        'USER': 'postgres',
        'PASSWORD': 'ton-mot-de-passe',  # ← ton mot de passe PostgreSQL
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### 4. Variables d'environnement

Crée un fichier `.venv` à la racine du projet avec ces variables :

SECRET_KEY=django-insecure-fast-natitingou-change-this-in-production
DEBUG=True
DB_NAME=fast_db
DB_USER=postgres
DB_PASSWORD=ton-mot-de-passe
DB_HOST=localhost
DB_PORT=5432

### 5. Appliquer les migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Créer un compte administrateur

```bash
python manage.py createsuperuser
```

Remplis les informations demandées :
- Username : admin
- Email : admin@fast-natitingou.bj
- Password : Fast2026@

Ensuite va sur `http://127.0.0.1:8000/admin`, connecte-toi
et change le rôle du compte admin de `student` à `admin`.

### 7. Lancer le serveur Django

```bash
python manage.py runserver
```

Le backend est accessible sur `http://127.0.0.1:8000`

---

### 8. Configurer le Frontend React

Ouvre un nouveau terminal :

```bash
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Lancer React
npm start
```

Le frontend est accessible sur `http://localhost:3000`

---

## Structure du projet

fast_nati_projet/
├── config/               ← paramètres Django
│   ├── settings.py
│   └── urls.py
├── users/                ← gestion des utilisateurs
├── students/             ← gestion des étudiants
├── grades/               ← gestion des notes
├── schedule/             ← emplois du temps
├── frontend/             ← application React
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
| Étudiant | etudiant1@fast.bj | Etud2026@ |

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

Année académique : 2025-2026