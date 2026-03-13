
# Trout

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 21.2.0 y [Spring Boot](https://spring.io/projects/spring-boot) versión 4.0.3 creado con [Spring Initialzr](https://start.spring.io/) para el semillero SISLA de la Fundación Universitaria de San Gil, sede Chiquinquirá


## Servidor de desarrollo (Frontend)

Para instalar todas las librerias necesarias, ejecuta:

```bash
npm install -i
```
Para iniciar un servidor de desarrollo local, ejecuta:
```bash
ng serve -o
```

Una vez que el servidor esté en ejecución, abre tu navegador y navega a http://localhost:4200/. La aplicación se recargará automáticamente cada vez que modifiques alguno de los archivos fuente.
### Generación de código

Angular CLI incluye potentes herramientas para generar código automáticamente. Para crear un nuevo componente, ejecuta (se puede con la extensión de VSCode):

```bash
ng generate component component-name
```

Para ver una lista completa de los esquemas disponibles (como components, directives o pipes), ejecuta:

```bash
ng generate --help
```

### Compilación

Para compilar el proyecto ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los archivos generados en el directorio dist/. Por defecto, la compilación para producción optimiza la aplicación para mejorar el rendimiento y la velocidad (SSR)

### Correr tests unitarios

Para ejecutar pruebas unitarias con el runner de pruebas [Vitest](https://vitest.dev/), usa este comando:

```bash
ng test
```

### Ejecutar pruebas End-to-End

Para realizar pruebas end-to-end (e2e), usa:

```bash
ng e2e
```

Angular CLI no incluye por defecto un framework de pruebas end-to-end, por lo que puedes elegir el que mejor se adapte a tus necesidades.

## Additional Resources frontend

Para más información sobre cómo usar Angular CLI, incluyendo referencias detalladas de los comandos, visita la página de [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

## Backend
Usar las [variables de entorno](https://www.mediafire.com/file/34if3zshk8jswlf/variables+entorno.txt/file) en IntellJIDEA

Comandos para las llaves ([OPEN SSL](https://slproweb.com/products/Win32OpenSSL.html)), crear las llaves en la carpeta jwtKeys en resources (En windows instalarla y mandarla al path)
```bash
cd src/main/resources/
```
```bash
mkdir jwtKeys
```
### Llave Privada
```bash
openssl genrsa -out private_key.pem 4096
```
***El 4096 se puede cambiar por cualquier valor que extienda la llave y por ende la seguridad***

### Llave Pública
```bash
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

## Documentación de Spring Boot

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/3.5.6/maven-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/3.5.6/maven-plugin/build-image.html)
* [Spring Web](https://docs.spring.io/spring-boot/3.5.6/reference/web/servlet.html)
* [Spring Reactive Web](https://docs.spring.io/spring-boot/3.5.6/reference/web/reactive.html)
* [Spring Security](https://docs.spring.io/spring-boot/3.5.6/reference/web/spring-security.html)
* [Spring Data JPA](https://docs.spring.io/spring-boot/3.5.6/reference/data/sql.html#data.sql.jpa-and-spring-data)

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
* [Building a Reactive RESTful Web Service](https://spring.io/guides/gs/reactive-rest-service/)
* [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
* [Spring Boot and OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
* [Authenticating a User with LDAP](https://spring.io/guides/gs/authenticating-ldap/)
* [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)

### Maven Parent overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.
