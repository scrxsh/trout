import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoginService } from "../../modules/auth/login/services/login-service";


//Interceptor de seguridad para comunicarse idealmente con spring boot
//Como se haria en postman o en bruno, pero permanante para los endpoints protegidos

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
    const loginService = inject(LoginService);
    const token = loginService.obtenerToken();

    //Si hay token, clonar la peticion y añadirla a la cabecera, para que siempre la haga como en postman, cada vez que toca hacer la peticion pedia el token
    if(token){
        const peticionClon = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(peticionClon);
    }
    // Si no hay token normal, se deja sin autorizacion
    return next(req);
}