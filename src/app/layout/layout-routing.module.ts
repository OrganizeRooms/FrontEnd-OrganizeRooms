import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'pessoas', loadChildren: () => import('./pessoas/pessoas.module').then(m => m.PessoasModule) },
            { path: 'pessoas-adicionar', loadChildren: () => import('./pessoas/pessoas-adicionar/pessoas-adicionar.module').then(m => m.PessoasAdicionarModule) },
            { path: 'pessoas-importar', loadChildren: () => import('./pessoas/pessoas-importar/pessoas-importar.module').then(m => m.PessoasImportarModule) },
            { path: 'salas', loadChildren: () => import('./salas/salas.module').then(m => m.SalasModule) },
            { path: 'reservar', loadChildren: () => import('./salas/reservar/reservar.module').then(m => m.ReservarModule) },
            { path: 'equipamentos', loadChildren: () => import('./equipamentos/equipamentos.module').then(m => m.EquipamentosModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
