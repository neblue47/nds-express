import { InstituicaoView } from '@/_models/InstituicaoView';
import { InstituicaoService } from '@/_services/instituicao.service';
import {AppState} from '@/store/state';
import {ToggleControlSidebar, ToggleSidebarMenu} from '@/store/ui/actions';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit, TemplateRef} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-header navbar navbar-expand';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public searchForm: UntypedFormGroup;
    public instDetail :any;
    public modalRef?: BsModalRef; 
    constructor(
        private appService: AppService,
        private appinstservice: InstituicaoService,
        private modalService: BsModalService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.navbarVariant}`;
        });
        this.searchForm = new UntypedFormGroup({
            search: new UntypedFormControl(null)
        });
        this.getInstituicaoDetail();
    }
    getInstituicaoDetail(){
        
        this.appinstservice.getInstDetail().subscribe(
            (returnDetail : InstituicaoView) => 
            {
              console.log(returnDetail);
               
              this.instDetail  = returnDetail;  
            },
            (erro: any) => {console.log(erro);}
          );
    }
    logout() {
        this.appService.logout();
    }

    onToggleMenuSidebar() {
        this.store.dispatch(new ToggleSidebarMenu());
    }

    onToggleControlSidebar() {
        this.store.dispatch(new ToggleControlSidebar());
    }

    modalLogout(template: TemplateRef<any>){
        this.modalRef = this.modalService.show(template);
       }
      
       confirmLogout(){
                 
         this.modalRef?.hide();
         this.appService.logout();
       }
}
