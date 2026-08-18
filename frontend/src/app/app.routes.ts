import { Routes } from '@angular/router';
import { Login } from './modules/auth/login/components/login/login';
import { Register } from './modules/auth/register/register';


//Importar los guardianes
import { loginGuard } from './core/guards/login-guard';
import { loginPublicGuard } from './core/guards/login-guard-public';
import { Layout } from './pages/layout/layout';
import { Events } from './modules/events/events';
import { News } from './modules/news/news';
import { Social } from './modules/social/social';



import { Colors } from './pages/pruebas/colors/colors';
import { Dashboard } from './modules/dashboard/dashboard';


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
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: Layout,
        canActivateChild: [loginGuard],
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'alerts',
                component: Events
            },
            {
                path: 'news',
                component: News
            },
            {
                path: 'social',
                component: Social
            },
        ]
    },
    /*
    {
      path: 'colores',
      component: Colors
    },
    */
];


