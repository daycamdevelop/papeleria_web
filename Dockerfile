# Usa una imagen base con Java
FROM eclipse-temurin:17-jdk-alpine

# Crea un directorio para la app
WORKDIR /app

# Copia el archivo .jar al contenedor
COPY daycamdevelop-0.0.1.jar app.jar

# Expón el puerto que usa tu app (ajusta según sea necesario)
EXPOSE 8080

# Comando para ejecutar la app
ENTRYPOINT ["java", "-jar", "app.jar"]