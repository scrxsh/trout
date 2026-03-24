import { Routes } from '@angular/router';
import { Cliente } from './modules/customers/components/cliente/cliente';
import { Login } from './modules/auth/login/components/login/login';
import { Dashboard } from './modules/charts/components/dashboard/dashboard';

//Importar los guardianes
import { loginGuard } from './core/guards/login-guard';
import { loginPublicGuard } from './core/guards/login-guard-public';
import { Layout } from './core/components/layout/layout';
import { Events } from './modules/warnings/events/events';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
        canActivate: [loginPublicGuard]
    },
    {
        path: '',
        component: Layout,
        canActivate: [loginGuard],
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'alertas',
                component: Events
            }
        ]
    }
];


