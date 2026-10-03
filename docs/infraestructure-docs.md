# Dockerizar

Guia rapida para aprender a dockerizar este proyecto facilmente.

## A. Spring Boot

**Prerequisitos**:
- Maven instalado con CLI
- Versión en local del Java Utilizado en el proyecto

### 1. Compilar

Primero, compilar el proyecto Spring Boot y generar el archivo `.jar` utilizando Maven, esto reescribe si existe ya un .jar (Hacerlo siempre en cada release)

> Se debe tener Maven instalado junto a la versión de Java que requiera el proyecto en el SO base.

```bash
mvn clean package
```

El archivo `.jar` se generará dentro de:

```text
target/
```

---

### 2. Crear el Dockerfile + .dockerignore del backend

Crear un archivo llamado `Dockerfile` en la raíz del proyecto backend, desde el IDE, con el siguiente contenido base:

#### Dockerfile

```dockerfile
FROM eclipse-temurin:21-jre-alpine

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

COPY jwtscript.sh /jwtscript.sh

RUN apk add --no-cache openssl && chmod +x /jwtscript.sh

RUN addgroup -S spring && adduser -S spring -G spring

RUN mkdir /keys && chown spring:spring /keys

USER spring:spring

ENTRYPOINT ["/jwtscript.sh"]
```
**Dockerignore**
```bash
.git
.gitignore
.idea
.vscode

src/
*.md
README*
Dockerfile
docker-compose*.yml

target/*.original
target/*-sources.jar
target/*-javadoc.jar
```


#### Explicación de los comandos

* `FROM`: utiliza Amazon Corretto de Java como imagen base. (Se puede usar cualquier JDK o JRE)
* `ARG JAR_FILE`: define la ubicación del archivo `.jar`.
* `COPY`: copia el `.jar` dentro de la imagen como `app.jar`.
* `RUN`: crea un usuario y grupo llamado `spring`.
* `USER`: ejecuta la aplicación con el usuario `spring` en lugar de `root`.
* `ENTRYPOINT`: inicia la aplicación Spring Boot con el script con el fin de crear las JWTKeys (Sección 3)

---

### 3. Script

Script de bash con el fin de crear por primera vez las llaves y activar funciones de autenticación. (jwtscript.sh)

```bash
if [ ! -f /keys/private_key.pem ]; then
    openssl genrsa -out /keys/private_key.pem 4096
    openssl rsa -pubout -in /keys/private_key.pem -out /keys/public_key.pem
    chmod 600 /keys/private_key.pem
    chmod 644 /keys/public_key.pem
fi

exec java -jar /app.jar
```

**Construir la imagen Docker (Opcional)**:

Desde la raíz del proyecto, ejecutar:

```bash
sudo docker build -t nombre .
```

> El `.` indica que Docker debe utilizar el directorio actual como contexto de construcción, no es necesario ejecutarlo inicialmente


## B. Angular

Angular + SSR ofrece una gran ventaja al no depender de Nginx para crear un servidor, para este se utiliza node express que viene por default en Angular, tener en cuenta en angular.json los hosts permitidos en la Línea:"allowedHosts": [""], la dockerización consta bajo la modalidad multi-stage

#### Dockerfile 

```Dockerfile
# Etapa 1 - Compilar
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

# Etapa 2 - Arrancar el proyecto
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

ENV PORT = 4000

COPY --from=build /app/dist ./dist

COPY --from=build /app/package*.json ./

RUN npm ci --omit=dev --ignore-scripts

EXPOSE 4000

USER node

CMD ["node", "dist/trout/server.mjs"]

```

#### Dockerignore

```bash
node_modules
dist
.angular
.git
.vscode

```

#### Explicación de los comandos

**Fase 1**

* `FROM`: utiliza Node 24-alpine como imagen base para compilar.
* `WORKDIR`: Directorio de trabajo en alpine.
* `RUN`: Correr npm en una instalación limpia `npm ci` y sin los scripts de terceros.
* `COPY`: Copiar todos los archivos a excepción de los ignorados.
* `RUN`: Permite construir el proyecto de manera optima con `npm run build`*

**Fase 2**

* `FROM`: utiliza Node 24-alpine como imagen base para correr el proyecto
* `WORKDIR`: Directorio de trabajo en alpine.
* `ENV`: Setea dos variables de entorno para el modo de Node.JS si es producción o desarrollo, en este caso para producción y la otra es el puerto interno de alpine. 
* `COPY`: Copiar todos los archivos necesarios que se compilaron gracias a las dependecias instaladas solo las necesarias copiadas en la carpeta .dist/ y a ./
* `RUN`: Correr npm en una instalación limpia `npm ci omit=dev --ignore-scripts`, sin los scripts de terceros y omitiendo las librerías de desarrollo y solo lanzar las de producción. 
* `USER`: Se debe usar el usuario `node` así como el contenedor del backend con el fin de que que tenga los permisos mínimos y necesarios
* `CMD`: Especifica los comandos por defecto de node, y el server de node express, finalmente para correr ya compilado. 

> Se debe optimizar al máximo el renderizado de algunos componentes de CSS. 


## C. Docker Compose

### 1. Variables de entorno 
Se debe utilizar docker compose para ello, primeramente debemos crear un archivo .env en la carpeta infraestucture, para añadir todas las variables de entorno (Enlace en el Readme.MD) tanto de la BD, Backend y Frontend

```bash
# BD - Usuario root no se usa por ello contraseña random
MYSQL_RANDOM_ROOT_PASSWORD=yes
MYSQL_DATABASE=nombre-db (preferiblemente el nombre trout_db)
MYSQL_USER=user
MYSQL_PASSWORD=pass

# Backend - Variables del IDE
DB_URL=url-jbdc
DB_USER=user
DB_PASS=pass

URL_API=direccion-apis
PRIVATE_KEY=file:/
PUBLIC_KEY=file:/

```

### 2. Script de la BD
Se debe crear una carpeta `mysql-init` en infraestructure con un Script SQL para crear las bases de datos necesarias para ejecutar el proyecto, el script se puede llamar `init.sql`

```sql
-- Ejecución antes de crear el volumen de datos persistentes

CREATE DATABASE IF NOT EXISTS auth;
CREATE DATABASE IF NOT EXISTS eventos;
CREATE DATABASE IF NOT EXISTS feed;

GRANT ALL PRIVILEGES ON auth.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON eventos.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON feed.* TO 'user'@'%';
```

### 3. Archivo .yml
El archivo docker-compose.yml es muy importante para ejecutar un proyecto con varios contenedores como lo es un servicio web como este, se debe tener en cuenta los Dockerfile anteriores y ejecutarlos aquí.

```yml
services:
  db:
    image: mysql:latest
    container_name: trout-db
    env_file: .env
    volumes:
      - mysql_data:/var/lib/mysql
      - ./mysql-init:/docker-entrypoint-initdb.d:ro
    ports:
      - "3307:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1"]
      interval: 10s
      timeout: 5s
      retries: 10

  backend:
    build: ../backend
    container_name: trout-backend
    env_file: .env
    ports:
      - "8080:8080"
    volumes:
      - jwt_keys:/keys
    depends_on:
      db:
        condition: service_healthy
  
  frontend:
    build: ../frontend
    container_name: trout-frontend
    ports:
      - "4200:4000"
    depends_on:
      - backend

volumes:
  mysql_data:
  jwt_keys:

```

### 3.1 Levantar el proyecto
Construir las imagenes con `docker-compose`, en la carpeta de la infraestructura en Linux, `docker compose` Windows con Docker Desktop

```bash
docker-compose up --build 
```

**En segundo plano**:
```bash
docker-compose up -d 
```

Ver logs:
```bash
docker logs -f contenedor
```
Ver las imagenes del sistema:
```bash
docker images
```

Terminar el contenedor
```bash
docker compose down
```

Borrar todo (Con los datos persistentes)
```bash
docker system prune -a && docker volume prune
```
