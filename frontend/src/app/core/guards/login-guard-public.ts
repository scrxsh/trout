import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../../modules/auth/login/services/login-service";


//Guardian, como si fuera un policia dice "oiga este punto esta protegido", en este caso acceso de logeo sin volver a login

export const loginPublicGuard: CanActivateFn = (route, state) => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    let autenticado = loginService.isAutenticated();

    if(autenticado){
        router.navigate(['/dashboard']);
        return false;
    }
    return true;
}