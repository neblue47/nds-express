import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.appService.user; 
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/'],
    },
    {
        name: 'XVendas',
        iconClasses: 'fas fa-shopping-cart',        
        children: [
            {
                name: 'Facturação',
                iconClasses: 'fas fa-cash-register',
                path: ['/facturacao']
            },
            {
                name: 'Diária',
                iconClasses: 'fas fa-wallet',
                path: ['/facturacao-diria']
            }
        ]
    },
    {
        name: 'Gestão',
        iconClasses: 'fa fa-tasks',        
        children: [
           
            {
                name: 'Produtos',
                iconClasses: 'fas fa-book',
                path: ['/produtos']
            },
            {
                name: 'Clientes',
                iconClasses: 'fas fa-user-friends',
                path: ['/clientes']
            },
            {
                name: 'Inventário',
                iconClasses: 'fas fa-dolly-flatbed',
                path: ['/stocks']
            }
        ]
    },
    {
        name: 'Relatórios',
        iconClasses: 'fas fa-file',        
        children: [
            {
                name: 'Vendas',
                iconClasses: 'fas fa-file-invoice',
                path: ['/relatorio-vendas']
            },
            {
                name: 'Produtos',
                iconClasses: 'fas fa-wallet',
                path: ['/relatorio-produtos']
            }
        ]
    },
    {
        name: 'Configurações',
        iconClasses: 'fas fa-cogs',        
        children: [
            {
                name: 'Utilizadores',
                iconClasses: 'fas fa-users',
                path: ['/utilizadores']
            },
            {
                name: 'Instituição',
                iconClasses: 'fas fa-building',
                path: ['/instituicao']
            }
        ]
    } 
    
];
