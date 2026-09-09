## Plugins de los Charts (Frontend)

Leer la documentación correspondiente a los plugins de [Chart.JS][1] en Angular[^2]

**Anotaciones en los gráficos**:

```bash
npm install chartjs-plugin-annotation
```
Docs: https://www.chartjs.org/chartjs-plugin-annotation/master/


[^2]: Recordar que siempre es necesario registrarlos con *Chart.register(plugin)*


## Imagen docker de Spring Boot



# Dockerizar Spring Boot

## 1. Compilar el proyecto

Primero, compilar el proyecto Spring Boot y generar el archivo `.jar` utilizando Maven.

> Se debe tener Maven instalado o utilizar el Maven Wrapper incluido en el proyecto.

```bash
./mvnw clean package
```

El archivo `.jar` se generará dentro de:

```text
target/
```

---

## 2. Crear el Dockerfile

Crear un archivo llamado `Dockerfile` en la raíz del proyecto, desde el IDE, con el siguiente contenido base:

```dockerfile
FROM amazoncorretto:21-alpine

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

RUN addgroup -S spring && adduser -S spring -G spring

USER spring:spring

ENTRYPOINT ["java","-jar","/app.jar"]
```

### Descripción

* `FROM`: utiliza Amazon Corretto 21 como imagen base.
* `ARG JAR_FILE`: define la ubicación del archivo `.jar`.
* `COPY`: copia el `.jar` dentro de la imagen como `app.jar`.
* `RUN`: crea un usuario y grupo llamado `spring`.
* `USER`: ejecuta la aplicación con el usuario `spring` en lugar de `root`.
* `ENTRYPOINT`: inicia la aplicación Spring Boot.

---

## 3. Construir la imagen Docker

Desde la raíz del proyecto, ejecutar:

```bash
sudo docker build -t nombre .
```

> El `.` indica que Docker debe utilizar el directorio actual como contexto de construcción.

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



[1]: https://www.chartjs.org/docs/latest/
