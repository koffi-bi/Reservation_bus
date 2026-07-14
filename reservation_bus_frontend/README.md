#  Reservation Bus

##  Description

Reservation Bus est une application web de réservation de billets de bus développée avec **Spring Boot** (backend) et **React** (frontend).

L'application permet aux voyageurs de rechercher un trajet, consulter les bus disponibles, sélectionner un siège, renseigner leurs informations personnelles et effectuer une réservation. Une fois la réservation validée, un ticket est automatiquement généré.

Ce projet a été réalisé afin de mettre en pratique le développement d'une application Full Stack en utilisant une architecture REST.

---

#  Technologies utilisées

## Backend

* Java 21
* Spring Boot
* Spring Web
* Spring Data JPA
* PostgreSQL
* Maven
* Lombok
* Swagger / OpenAPI

## Frontend

* React
* React Router
* Axios
* CSS

---

# Fonctionnalités

### Recherche de trajets

* Recherche par ville de départ.
* Recherche par ville de destination.
* Recherche par date.
* Consultation de tous les trajets disponibles.

### Gestion des trajets

* Création d'un trajet.
* Modification d'un trajet.
* Suppression d'un trajet.
* Consultation des détails d'un trajet.

### Réservation

* Sélection d'un trajet.
* Choix du siège.
* Saisie des informations du voyageur.
* Création d'une réservation.

### Gestion des clients

* Création automatique d'un client.
* Réutilisation d'un client existant lors d'une nouvelle réservation.

### Gestion des tickets

* Génération automatique d'un ticket après confirmation de la réservation.
* Consultation des tickets.
* Suppression d'un ticket.

### Informations sur les places

* Affichage de la capacité totale du bus.
* Calcul automatique du nombre de places occupées.
* Calcul automatique du nombre de places libres.

---

#  Structure du projet

```text
reservation-bus/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# ⚙️ Installation

## 1. Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/reservation-bus.git
```

---

## 2. Backend

```bash
cd backend
```

Configurer la base PostgreSQL dans :

```
application.yml
```

Puis lancer :

```bash
mvn spring-boot:run
```

Le serveur démarre sur :

```
http://localhost:8080
```

Swagger est accessible à l'adresse :

```
http://localhost:8080/swagger-ui/index.html
```

---

## 3. Frontend

```bash
cd frontend
```

Installer les dépendances :

```bash
npm install
```

Lancer l'application :

```bash
npm run dev
```

ou

```bash
npm start
```

selon la configuration du projet.

Le frontend est accessible sur :

```
http://localhost:5173
```

ou

```
http://localhost:3000
```

---

#  API REST

L'application expose notamment les ressources suivantes :

* `/api/trips`
* `/api/trips/search`
* `/api/reservations`
* `/api/clients`
* `/api/tickets`

La documentation complète est disponible via Swagger.

---

# Déroulement d'une réservation

1. Rechercher un trajet.
2. Choisir un trajet disponible.
3. Sélectionner un siège.
4. Saisir les informations du voyageur.
5. Confirmer la réservation.
6. Génération automatique du ticket.

---

# Objectifs du projet

* Développer une API REST avec Spring Boot.
* Utiliser Spring Data JPA avec PostgreSQL.
* Concevoir un frontend moderne avec React.
* Mettre en œuvre une architecture client/serveur.
* Manipuler les DTO, services, repositories et contrôleurs.
* Consommer une API REST depuis React.
* Gérer les réservations de manière cohérente entre le frontend et le backend.

---

# Auteur

Projet développé par **Yohbi** dans le cadre de l'apprentissage du développement Full Stack avec **Spring Boot** et **React**.
