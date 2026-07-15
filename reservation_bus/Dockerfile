# Étape 1 : Image de base avec Java 21
FROM eclipse-temurin:21-jdk AS build

# Étape 2 : Répertoire de travail
WORKDIR /app

# Étape 3 : Copier tout le projet
COPY . .

# Étape 4 : Construire le projet avec Maven Wrapper
RUN ./mvnw clean package -DskipTests

# Étape 5 : Image finale plus légère
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copier le jar généré depuis l'étape build
COPY --from=build /app/target/*.jar app.jar

# Exposer le port (Render utilise PORT)
EXPOSE 8080

# Commande de démarrage
CMD ["java", "-jar", "app.jar"]
