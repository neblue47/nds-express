import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { GestaoUtilizadorComponent } from './pages/gestao-utilizador/gestao-utilizador.component';
import { GestaoClienteComponent } from './pages/gestao-cliente/gestao-cliente.component';
import { GestaoProdutoComponent } from './pages/gestao-produto/gestao-produto.component';
import { VendaDiriaComponent } from './pages/venda-diria/venda-diria.component';
import { VendaComponent } from './pages/venda/venda.component';
import { RelatorioVendaComponent } from './pages/relatorio-venda/relatorio-venda.component';
import { RelatorioProdutoComponent } from './pages/relatorio-produto/relatorio-produto.component';
import { InstituicaoComponent } from './pages/instituicao/instituicao.component';
import { StocksComponent } from '@pages/stocks/stocks.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'facturacao',
                component: VendaComponent
            },
            {
                path: 'facturacao-diria',
                component: VendaDiriaComponent
            },
            {
                path: 'clientes',
                component: GestaoClienteComponent
            },
            {
                path: 'produtos',
                component: GestaoProdutoComponent
            },
            {
                path: 'stocks',
                component: StocksComponent
            },
            {
                path: 'relatorio-vendas',
                component: RelatorioVendaComponent
            },
            {
                path: 'relatorio-produtos',
                component: RelatorioProdutoComponent
            },
            {
                path: 'utilizadores',
                component: GestaoUtilizadorComponent
            },
            {
                path: 'instituicao',
                component: InstituicaoComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
