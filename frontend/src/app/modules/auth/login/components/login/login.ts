import { afterNextRender, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { driver } from "driver.js";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule], /* Formularios reactivos de Angular */
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
  private fb = inject(NonNullableFormBuilder); /* Formularios No Nullos la variable fb → FormBuild*/
  private loginService = inject(LoginService); // Inyectar la logica del servicio
  private router = inject(Router);
  // Signals del login (Optimizacion para mensajes y carga)
  mensaje = signal<string>('');
  isLoading = signal<boolean>(false);

  // Validaciones basicas del formulario requerido y el tipo
  loginForm = this.fb.group({
    email: ['' , [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  //Funcion mientras el logueo del formulario
  enLogin(){
    if(this.loginForm.invalid) return;

    //Visualizar la carga no es necesario
    this.isLoading.set(true);

    // Extraer los datos del formulario con RawValue - Valor leido
    const credentials = this.loginForm.getRawValue();

    // Subscribirse al evento 
    this.loginService.login(credentials).subscribe({
      next: (data) => {
        this.isLoading.set(false);
        // Buscar el token, de momento no se usara para acceder a otros endpoints 

      this.loginService.guardarToken(data.jwt);
        if (data.jwt){
          this.mensaje.set('Login Exitoso');
          
          //Redireccion al dar click en el boton, diferente al guardian, el guardian es en la url

          this.router.navigate(['/dashboard']).then(nav=> {
            if(nav){
              this.loginForm.reset();
            }
          })
        }
        },
        // Manejar el error 401
        error: (err) => {
          this.isLoading.set(false);
          this.loginForm.reset();
          this.mensaje.set("Error de autenticacion");
        }
    });
  }

  constructor(){
    afterNextRender(() => {
      this.iniciarTour();
    });
  }

  //Driver js
  iniciarTour(){
    const driverObj = driver({
      overlayColor: '#BDB1AF',
      showProgress: true,
      popoverClass: 'driverjs-theme',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: 'OK',
      steps: [
        { 
          element: '#email', 
          popover: { 
            title: 'Correo Electronico', 
            description: 'Ingresa tu correo electronico registrado para acceder.',
            side: "right", 
            align: 'start' 
          } 
        },
        { 
          element: '#password', 
          popover: { 
            title: 'Contraseña', 
            description: 'Clave de la cuenta',
            side: "left", 
            align: 'start' 
          } 
        },
        { 
          element: 'button[type="submit"]', 
          popover: { 
            title: 'Boton de Logueo', 
            description: 'Haz clic aquí para loguearte.',
            side: "bottom", 
            align: 'center' 
          } 
        }
      ]
    });
    driverObj.drive();
  }
  
}
