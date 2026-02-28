import { Routes } from '@angular/router';
import { Cliente } from './customers/components/cliente/cliente';
import { Layout } from './dashboard/components/layout/layout';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',   
    },
    {
        path: 'dashboard',
        component: Layout
    },
    {
        path: 'clientes',
        component: Cliente
    }
];
