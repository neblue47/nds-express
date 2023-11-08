import { PageView } from '@/_models/PageView';
import { EUserGroup, RoleView, UserADView, UserView } from '@/_models/UserView';
import { UtilizadorService } from '@/_services/utilizador.service';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestao-utilizador',
  templateUrl: './gestao-utilizador.component.html',
  styleUrls: ['./gestao-utilizador.component.scss']
})
export class GestaoUtilizadorComponent {
  public currentPage = 1;
  page?: number;
  totalItens = 0;
  userSelected : any;
  term:any;
  userTypeSelected:any;
  roleTypeSelected:any;
  public appvmForm: any; 
  public modalRef?: BsModalRef;
  public userslistagem : UserView[]  = [];
  public usersADlistagem : UserADView[] = [];
  public usersRoles : RoleView[] = [];
  public returnedArray? : UserView[] = []; 
  public itemOpcao : any;
  public domainname : any;
  public itemOpcaoId : any;
  singleSelect: any;
  public usersTypes = [{value:0 , texto:'Admin'}, { value:1, texto:'Gestor'}, { value:2, texto:'Vendedor'}];
 
  constructor(private modalService: BsModalService,private fb: FormBuilder,private toastr: ToastrService,private userService: UtilizadorService) { }

  ngOnInit(): void {
     this.search();
  }
  criarForm(model: UserView) {       
     
    this.appvmForm = this.fb.group({
      fullName:  [model.fullName,Validators.required], 
      username : [model.username,Validators.required] ,
      userGroup : [model.userGroup,Validators.required] , 
      password : [model.password,Validators.required] , 
      repeatPassword :  model.password,
      id: model.id, 
      status:model.status??true 
    });    
  }

  appNovo(){

    this.userSelected = {} as UserView; 
    let model  = {} as UserView;
    model.roleView = {} as RoleView;
    this.criarForm(model); 
   }
   voltar(){
    this.userSelected = null;
    this.singleSelect = null;
    this.roleTypeSelected = null;
    this.userTypeSelected = null;
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage; 
    this.returnedArray = this.userslistagem.sort((a, b) => (a.fullName < b.fullName) ? -1 : 1).slice(startItem, endItem);
  }
 
  search(){
    this.userService.getAll().subscribe(
      (schlistagemVM : PageView<UserView>) => 
      {
        this.userslistagem = schlistagemVM.content;
        this.totalItens = this.userslistagem.length;
        this.returnedArray = this.userslistagem.sort((a, b) => (a.fullName < b.fullName) ? -1 : 1).slice(0, 10);
      },
      (erro: any) => {console.log(erro);}
    );
  }

  EditaModel(model: UserView){
    this.userSelected = model; 
    this.singleSelect = model.userType == 2 ? {name:model.username} : null;
    this.roleTypeSelected = model.roleView == undefined ? '' :  {id: model.roleView?.id, name:model.roleView?.description}  ;
    this.userTypeSelected = {value:model.userType , texto:model.userTypeDescription} ;
    this.EditForm(model);
  }

  EditForm(model: UserView) {       
     
    this.appvmForm = this.fb.group({
      fullName:  [model.fullName,Validators.required], 
      username : [model.username,Validators.required] ,
      userGroup : [model.userGroup,Validators.required],   
      password : [model.password,Validators.required], 
      repeatPassword :  model.password,
      id: model.id, 
      status:model.status??true,  
    });
  }

  submitForm(){
    
    var modelview = {} as UserView;
    modelview = this.appvmForm.value; 
    modelview.username = this.singleSelect != null ? this.singleSelect.name : modelview.username;
    modelview.roleId = this.roleTypeSelected != null ? this.roleTypeSelected.id : modelview.roleId;
    modelview.userType = this.userTypeSelected != null ? this.userTypeSelected.value : modelview.userType;
    modelview.repeatPassword = modelview.password;
    console.log(modelview); 
    this.salvarApplication(modelview);
    this.userSelected = null;
    this.singleSelect = null;
    this.roleTypeSelected = null;
    this.userTypeSelected = null;
    modelview = {} as UserView;
    modelview.roleView = {} as RoleView;
    this.criarForm(modelview);
    
  }
  salvarApplication(model: UserView){
    if(model.id == null){
      this.userService.post(model).subscribe(
        (appretorno: any) => {
          this.search();
          this.toastr.success('Utilizador salvo com sucesso','',{timeOut: 5000});
        },
        (erro: any) => {console.log(erro);this.toastr.error('Erro ao salvar registo na base','',{timeOut: 5000}); }
      );
    }
    else{
      this.userService.put(model,model.id).subscribe(
        (appretorno: any) => {
          this.search();
          this.toastr.success('Utilizador actualizado com sucesso','',{timeOut: 5000});
        },
        (erro: any) => {console.log(erro);this.toastr.error('Erro ao salvar registo na base','',{timeOut: 5000}); }
      );
    }
    
  }
  excluirItemForm(template: TemplateRef<any>,model: any){
    this.itemOpcao = model.appTypeDescription;
    this.itemOpcaoId = model.id;
    this.modalRef = this.modalService.show(template);
   }
  confirmEvent(id:any){
    this.userService.deleteUserById(id).subscribe(
     (appretorno: any) => {
       if(appretorno){
        this.search();
        this.toastr.warning('Utilizador excluido com sucesso','',{timeOut: 5000});
       }
       else
        {this.toastr.error('Erro ao localizar item para exclusão','',{timeOut: 5000});}
     },
     (resp: any) => { 
      if(resp.status){ 
        this.search();
        this.toastr.warning('Utilizador excluido com sucesso','',{timeOut: 5000});} else{
        this.toastr.error(resp.text,'',{timeOut: 5000});
        }   
      } 
      
    );
    
    this.modalRef?.hide();
  }
  public userGroupLabelLabelMapping = EUserGroupLabelMapping;
  public userGroupTypes = Object.values(EUserGroup);
}

export const EUserGroupLabelMapping: Record<EUserGroup, string> = {
  [EUserGroup.Admin]: "Admin", 
  [EUserGroup.Gestor]: "Gestor",
  [EUserGroup.Vendedor]: "Vendedor",
};
