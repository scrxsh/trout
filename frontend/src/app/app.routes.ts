import { Routes } from '@angular/router';
import { Login } from './modules/auth/login/components/login/login';
import { Register } from './modules/auth/register/register';


//Importar los guardianes
import { loginGuard } from './core/guards/login-guard';
import { loginPublicGuard } from './core/guards/login-guard-public';
import { Layout } from './pages/layout/layout';
import { Events } from './modules/events/events';
import { Feed } from './modules/feed/feed';
import { Social } from './modules/social/social';



import { Colors } from './pages/pruebas/colors/colors';
import { Dashboard } from './modules/dashboard/dashboard';
import { Inicio } from './pages/inicio/inicio';
import { Trends } from './modules/trends/trends';


export const routes: Routes = [
    {
        path: 'login',
        component: Login,
        canActivate: [loginPublicGuard]
    },
    {
        path: 'register',
        component: Register,
        canActivate: [loginPublicGuard]
    },
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
    },
    {
        path: '',
        component: Layout,
        canActivateChild: [loginGuard],
        children: [
            {
              path: 'inicio',
              component: Inicio
            },
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'alertas',
                component: Events
            },
            {
                path: 'noticias',
                component: Feed
            },
            {
                path: 'social',
                component: Social
            },
            {
                path: 'tendencias',
                component: Trends
            }
        ]
    },
    /*
    {
      path: 'colores',
      component: Colors
    },
    */
];


