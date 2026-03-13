
# Trout

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 21.2.0 y [Spring Boot](https://spring.io/projects/spring-boot) versión 4.0.3 creado con [Spring Initialzr](https://start.spring.io/) para el semillero SISLA de la Fundación Universitaria de San Gil, sede Chiquinquirá


## Servidor de desarrollo (Frontend)


Para iniciar un servidor de desarrollo local, ejecuta:

```bash
npm install -i
```

```bash
ng serve
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

Esto compilará tu proyecto y almacenará los archivos generados en el directorio dist/. Por defecto, la compilación para producción optimiza la aplicación para mejorar el rendimiento y la velocidad. Finalmente usar:

```bash
ng serve -o
```

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
### Llave Pública
```bash
    openssl rsa -pubout -in private_key.pem -out public_key.pem
```