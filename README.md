Reservation Bus

Une application web de réservation de billets de bus développée avec Spring Boot, PostgreSQL et React. Cette application permet aux utilisateurs de consulter les trajets disponibles, réserver un siège et générer automatiquement un ticket de réservation.

📖 Description

Reservation Bus est une application de démonstration réalisée dans le but de maîtriser le développement d'une architecture Full Stack moderne.

Le projet met en œuvre :

une API REST développée avec Spring Boot ;
une base de données PostgreSQL ;
une interface utilisateur développée avec React ;
un déploiement du backend sur Railway ;
un déploiement du frontend sur Netlify.

Ce projet constitue également une étape de préparation avant le développement d'une application plus ambitieuse de gestion de réservation d'espaces de coworking (CoWork-Flex).

✨ Fonctionnalités
Gestion des trajets
Ajouter un trajet
Modifier un trajet
Supprimer un trajet
Consulter tous les trajets
Rechercher un trajet selon :
ville de départ
ville de destination
date de départ
Gestion des clients
Création automatique d'un client lors d'une réservation
Consultation des informations client
Gestion des réservations
Réserver un siège
Consulter toutes les réservations
Consulter les réservations d'un client
Modifier une réservation
Annuler une réservation
Gestion des tickets
Génération automatique d'un ticket
Consultation des tickets
Suppression d'un ticket
🏗 Architecture
React
    │
    │ HTTP REST
    ▼
Spring Boot
    │
Spring Data JPA
    │
PostgreSQL
🛠 Technologies utilisées
Backend
Java 21
Spring Boot
Spring Web
Spring Data JPA
Hibernate
PostgreSQL
Maven
Lombok
Spring Validation
SpringDoc OpenAPI (Swagger)
Frontend
React
JavaScript
HTML5
CSS3
Vite
Déploiement
Railway (Backend + PostgreSQL)
Netlify (Frontend)
GitHub
📂 Structure du projet
reservation_bus/

├── backend/
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   ├── config
│   └── ...
│
├── frontend/
│   ├── src
│   ├── public
│   └── ...
│
└── README.md
📌 API REST

Les principaux endpoints disponibles sont :

Trajets
Méthode	Endpoint	Description
GET	/api/trips	Liste des trajets
GET	/api/trips/{id}	Détails d'un trajet
GET	/api/trips/search	Recherche de trajets
POST	/api/trips	Ajouter un trajet
PUT	/api/trips/{id}	Modifier un trajet
DELETE	/api/trips/{id}	Supprimer un trajet
Réservations
Méthode	Endpoint
GET	/api/reservations
GET	/api/reservations/{id}
POST	/api/reservations
PUT	/api/reservations/{id}
DELETE	/api/reservations/{id}
Clients
Méthode	Endpoint
GET	/api/clients
GET	/api/clients/{id}
Tickets
Méthode	Endpoint
GET	/api/tickets
GET	/api/tickets/{id}
DELETE	/api/tickets/{id}
⚙ Installation
Cloner le projet
git clone https://github.com/votre-utilisateur/reservation_bus.git
Backend
cd backend

Configurer PostgreSQL dans :

application.yml

Puis lancer :

mvn spring-boot:run
Frontend
cd frontend
npm install
npm run dev
🚀 Déploiement
Backend
Railway
PostgreSQL Railway
Frontend
Netlify

Les variables d'environnement sont utilisées afin de différencier le développement local et la production.

Exemple :

VITE_API_URL=https://votre-backend.railway.app
📸 Aperçu

L'application comprend notamment :

Page d'accueil
Liste des trajets
Recherche de trajets
Sélection d'un siège
Confirmation de réservation
Historique des réservations
🎯 Objectifs pédagogiques

Ce projet a permis de mettre en pratique :

le développement d'une API REST avec Spring Boot ;
la conception d'une base de données relationnelle avec PostgreSQL ;
l'utilisation de Spring Data JPA et Hibernate ;
la communication entre un frontend React et un backend Spring Boot ;
la documentation d'une API avec Swagger/OpenAPI ;
le déploiement d'une application Full Stack sur Railway et Netlify ;
la gestion des variables d'environnement et de la configuration en production.

 Perspectives d'évolution

Plusieurs améliorations peuvent être envisagées :

authentification et autorisation (JWT/Spring Security) ;
paiement en ligne ;
génération de billets avec QR Code ;
notifications par e-mail ;
tableau de bord administrateur ;
gestion des compagnies de transport et des bus ;
suivi des réservations en temps réel ;
développement d'une version mobile avec Capacitor.
👨‍💻 Auteur

YOH BI NENE REGIS
Développeur Back-end & IA Junior
