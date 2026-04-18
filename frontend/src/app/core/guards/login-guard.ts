import { inject, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../../modules/auth/login/services/login-service";
import { isPlatformBrowser } from '@angular/common';

//Guardian, como si fuera un policia dice "oiga este punto esta protegido"

export const loginGuard: CanActivateFn = () => {
    
    const platformId = inject(PLATFORM_ID);
    const loginService = inject(LoginService);
    const router = inject(Router);

    if (!isPlatformBrowser(platformId)) {
    return true;
    }

    let autenticado = loginService.isAutenticated();

    if(autenticado){
        return true; //Entra
    } else {
        router.navigate(['/login']); //Redireccion a login
        return false; //No entra
    }
}