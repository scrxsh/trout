# Dockerizar el proyecto

## A. Dockerizar Spring Boot

### 1. Compilar el proyecto

Primero, compilar el proyecto Spring Boot y generar el archivo `.jar` utilizando Maven, esto reescribe si existe ya un .jar (Hacerlo siempre)

> Se debe tener Maven instalado junto a la versión de Java que requiera el proyecto en el SO base.

```bash
mvn clean package
```

El archivo `.jar` se generará dentro de:

```text
target/
```

---

### 2. Crear el Dockerfile

Crear un archivo llamado `Dockerfile` en la raíz del proyecto backend, desde el IDE, con el siguiente contenido base:

```dockerfile
FROM amazoncorretto:v
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ENTRYPOINT ["java","-jar","/app.jar"]
```

#### Explicación de los comandos

* `FROM`: utiliza Amazon Corretto de Java como imagen base. (Se puede usar cualquier JDK)
* `ARG JAR_FILE`: define la ubicación del archivo `.jar`.
* `COPY`: copia el `.jar` dentro de la imagen como `app.jar`.
* `RUN`: crea un usuario y grupo llamado `spring`.
* `USER`: ejecuta la aplicación con el usuario `spring` en lugar de `root`.
* `ENTRYPOINT`: inicia la aplicación Spring Boot.

---

### 3. Construir la imagen Docker

Desde la raíz del proyecto, ejecutar:

```bash
sudo docker build -t nombre .
```

> El `.` indica que Docker debe utilizar el directorio actual como contexto de construcción.

#### 3.1 Conexión con la BD de MYSQL

Se debe utilizar docker compose para ello, primeramente debemos crear un archivo .yml titulado **docker-compose.yml** en la raíz del proyecto. 



```bash
services:
  db:
    image: mysql:latest
    container_name: nombre-contendor
    environment:
      MYSQL_ROOT_PASSWORD: 
      MYSQL_DATABASE: 
    ports:
      - "3307:3306"
  app:
    build: .
    container_name: var-store
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/tienda?allowPublicKeyRetrieval=true&useSSL=false
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: Wilardo89+
    depends_on:
      - db
```

---

## 4. Ejecutar el contenedor

Una vez construida la imagen, ejecutar:

```bash
sudo docker run -p 8080:8080 nombre
```

Esto permite acceder a la aplicación mediante:

```text
http://localhost:8080
```

### Ejecutar en segundo plano

Si se desea que el contenedor se ejecute en segundo plano:

```bash
sudo docker run -d -p 8080:8080 --name springboot-app nombre
```

Para comprobar que el contenedor está ejecutándose:

```bash
sudo docker ps
```

---

## Resumen

Los comandos principales son:

```bash
# 1. Compilar
./mvnw clean package

# 2. Construir la imagen
sudo docker build -t nombre .

# 3. Ejecutar el contenedor
sudo docker run -p 8080:8080 nombre
```




