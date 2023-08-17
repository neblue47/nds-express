import { PageView } from '@/_models/PageView';
import { UserView } from '@/_models/UserView';
import { UtilizadorService } from '@/_services/utilizador.service';
import {Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    usersDetail: any ;
    constructor(private modalService: BsModalService,private fb: FormBuilder,private toastr: ToastrService,private userService: UtilizadorService) { }

    ngOnInit(): void {
        this.usersDetail = {} as UserView;
        this.getUsetearch();
    }
    getUsetearch(){
        let user = JSON.parse(localStorage.getItem('user_logged'));
        this.userService.getUserLogadoDetail().subscribe(
          (userDetailVM : UserView) => 
          {
            this.usersDetail = userDetailVM; 
            console.log(this.usersDetail);
          },
          (erro: any) => {console.log(erro);}
        );
      }
}
