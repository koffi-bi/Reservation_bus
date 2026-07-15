# Étape 1 : Build avec Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copier tout le projet
COPY . .

# Compiler le projet Spring Boot
RUN mvn clean package -DskipTests

# Étape 2 : Image finale avec seulement Java
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copier le jar généré depuis l'étape build
COPY --from=build /app/target/*.jar app.jar

# Exposer le port (Render utilise PORT)
EXPOSE 8080

# Lancer l'application
CMD ["java", "-jar", "app.jar"]
