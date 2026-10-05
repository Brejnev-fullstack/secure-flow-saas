# Secure Flow SaaS

> Plateforme SaaS d'administration sécurisée développée avec Next.js et TypeScript.

Secure Flow SaaS est un projet personnel conçu pour mettre en pratique une architecture moderne de plateforme SaaS, avec un accent particulier sur la **sécurité**, l'**authentification**, la **gestion des utilisateurs**, les **rôles et permissions** ainsi que la **traçabilité des actions**.

L'objectif est de construire une application professionnelle, maintenable et évolutive, proche des problématiques rencontrées dans des applications SaaS réelles.


## Objectifs du projet

Le projet a pour objectifs de :

- Concevoir une plateforme SaaS moderne et sécurisée
- Mettre en place une authentification robuste
- Gérer les utilisateurs et leurs rôles
- Implémenter un système de permissions
- Assurer la traçabilité des actions importantes
- Construire un dashboard d'administration
- Appliquer les bonnes pratiques de sécurité
- Mettre en place une architecture évolutive et maintenable


## Fonctionnalités

### Authentification

- Inscription utilisateur
- Connexion
- Déconnexion
- Gestion du profil utilisateur
- Gestion des tokens d'authentification
- Access Token / Refresh Token
- Cookies HttpOnly
- Hashage sécurisé des mots de passe

### Gestion des utilisateurs

- Liste des utilisateurs
- Consultation des informations utilisateur
- Gestion des rôles
- Gestion des permissions

### Sécurité

- Authentification JWT
- Refresh Token
- Cookies HttpOnly
- Contrôle d'accès basé sur les rôles (RBAC)
- Validation des données avec Zod
- Hashage des mots de passe avec bcrypt
- Gestion des sessions
- Protection des routes

### Dashboard

Le dashboard permet de centraliser les principales informations de la plateforme.

Il constitue le point d'entrée de l'administration de l'application.

### Audit Logs

Le projet prévoit également un système de journalisation permettant de conserver une trace des actions importantes effectuées sur la plateforme.

### Administration

Les fonctionnalités d'administration comprennent notamment :

- Utilisateurs
- Équipes
- Rôles & permissions
- Journaux d'audit
- Paramètres


## Technologies utilisées

### Frontend

- Next.js
- React
- TypeScript
- React Query

### Backend / Data

- Next.js API
- Prisma ORM
- MySQL
- Redis

### Sécurité

- JWT
- Refresh Token
- HttpOnly Cookies
- bcrypt
- Zod
- RBAC

### Outils

- Git
- GitHub
- npm
- ESLint

