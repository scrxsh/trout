import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../../modules/auth/login/services/login-service";


//Guardian, como si fuera un policia dice "oiga este punto esta protegido"

export const loginGuard: CanActivateFn = (route, state) => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    let autenticado = loginService.isAutenticated();

    if(autenticado){
        return true; //Entra
    } else {
        router.navigate(['/login']); //Redireccion a login
        return false; //No entra
    }
}