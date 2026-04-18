import { inject, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../../modules/auth/login/services/login-service";
import { isPlatformBrowser } from '@angular/common';

//Guardian, como si fuera un policia dice "oiga este punto esta protegido", en este caso acceso de logeo sin volver a login

export const loginPublicGuard: CanActivateFn = () => {
    
    const platformId = inject(PLATFORM_ID);
    const loginService = inject(LoginService);
    const router = inject(Router);

    
    if (!isPlatformBrowser(platformId)) {
        return true;
    }

    let autenticado = loginService.isAutenticated();

    if(autenticado){
        router.navigate(['/dashboard']);
        return false;
    }
    return true;
}