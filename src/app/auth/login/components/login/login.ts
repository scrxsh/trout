import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login-service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule], /* Formularios reactivos de Angular */
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
  private fb = inject(NonNullableFormBuilder); /* Formularios No Nullos la variable fb → FormBuild*/
  private loginService = inject(LoginService); // Inyectar la logica del servicio

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
        
        if (data.jwt){
          this.mensaje.set('Login Exitoso');
          this.loginForm.reset();
          console.log('TOKEN RECIBIDO: ', data.jwt);
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
}
