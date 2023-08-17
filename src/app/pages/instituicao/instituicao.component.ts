import { DadosFiscalView, InstituicaoView, RegimeView, RetornoViews } from '@/_models/InstituicaoView';
import { PageView } from '@/_models/PageView';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { InstituicaoService } from '../../_services/instituicao.service';

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.scss']
})
export class InstituicaoComponent {
  userTypeSelected:any;
  roleTypeSelected:any;
  public appvmFormInst: any; 
  public appvmFormImp: any;
  public appvmFormIm: any;
  public modalRef?: BsModalRef;
  public instiDados :any; 
  public fiscalDados :any; 
  public isEditavel:any;
  public isEditavelImp:any;
  public moedaTypes = [{value:1 , texto:'Kwanza - Kz'}, { value:2, texto:'Dólar Americano - USD'}];
  public regimeTypes : any;
  public taxIvaTypes = [{value:0 , texto:'Isento'}, { value:7, texto:'Taxa IVA 7%'}, { value:10, texto:'Taxa IVA 10%'}, { value:14, texto:'Taxa IVA 14%'}];
  public tipoComercioList : Array<any> = [{value: 1,texto: "Produtos Gerais",selected: false},{value: 2,texto: "Farmaceuticos",selected: false},{value: 23,texto: "Serviços",selected: false}];
  constructor(private modalService: BsModalService,private fb: FormBuilder,private toastr: ToastrService,private instiService: InstituicaoService) { }
  ngOnInit(): void {
    this.isEditavel = false;
    this.isEditavelImp = false;
    let intsView = {} as InstituicaoView;
    let daFsView = {} as DadosFiscalView;
    this.criarFormInst(intsView,this.isEditavel); 
    this.criarFormImp(daFsView,this.isEditavel); 
    this.search();
    this.searchRegime();
    
 }
  search(){
    this.instiService.getDetail().subscribe(
      (returnDetail : RetornoViews) => 
      {
        console.log(returnDetail);
         
        this.instiDados  = returnDetail.instituicaoViews;
        this.fiscalDados = returnDetail.dadosFiscaisViews;
        this.isEditavel = true;
        this.isEditavelImp = true;
        this.criarFormInst(returnDetail.instituicaoViews,this.isEditavel); 
        this.criarFormImp(returnDetail.dadosFiscaisViews,this.isEditavelImp); 
      },
      (erro: any) => {console.log(erro);}
    );
  }
  searchRegime(){
    this.instiService.getRegimeAll().subscribe(
      (instVrmDetail : PageView<RegimeView>) => 
      {
        this.regimeTypes = instVrmDetail.content; 
        console.log(instVrmDetail.content);
      },
      (erro: any) => {console.log(erro);}
    );
  }
  criarFormInst(model: InstituicaoView,editavel:any) {       
    this.appvmFormInst = this.fb.group({
      designacaoComercial:  [ { value: model.designacaoComercial, disabled: editavel } ,Validators.required], 
      designacaoFormal : [{ value: model.designacaoFormal, disabled: editavel },Validators.required] ,
      numeroFiscal : [{ value: model.numeroFiscal, disabled: editavel },Validators.required] , 
      numeroTelefone : [{ value: model.numeroTelefone, disabled: editavel },Validators.required] , 
      endereco :  [{ value: model.endereco, disabled: editavel },Validators.required] ,
      missaoVisao :  { value: model.missaoVisao, disabled: editavel },
      id: model.id,  
    });    
  }

  criarFormImp(model: DadosFiscalView,editavel:any) {       
    this.appvmFormImp = this.fb.group({
      cae : [ { value: model.cae, disabled: editavel } ,Validators.required],
      moeda: [ { value: model.moeda, disabled: editavel } ,Validators.required],
      taxa : [ { value: model.taxa, disabled: editavel } ,Validators.required],
      taxCode: [ { value: model.taxCode, disabled: editavel } ,Validators.required],
      motivoIsencao : [ { value: model.motivoIsencao, disabled: editavel } ,Validators.required],
      tipo: [ { value: model.tipo, disabled: editavel } ,Validators.required],
      instituicaoId: model.instituicaoId,
      id: model.id,
    });    
  }
  editarInst(){
    this.isEditavel = false;
    this.criarFormInst(this.instiDados,this.isEditavel); 
  }
  cancelInst(){
    this.isEditavel = true;
    this.criarFormInst(this.instiDados,this.isEditavel); 
  }
  editarImp(){
    this.isEditavelImp = false;
    this.criarFormImp(this.fiscalDados,this.isEditavelImp); 
  }
  cancelImp(){
    this.isEditavelImp = true;
    this.criarFormImp(this.fiscalDados,this.isEditavelImp); 
  }
  submitFormIns(){    
    var modelview = {} as InstituicaoView;
    modelview = this.appvmFormInst.value; 
    console.log(modelview);  
    this.saveInstituicao(modelview);
    
  }
  submitFormImp(){    
    var modelview = {} as DadosFiscalView;
    modelview = this.appvmFormImp.value; 
    console.log(modelview);  
    this.saveDadosFiscal(modelview);
    
  }
  saveInstituicao(model: InstituicaoView){
    if(model.id == null){
      this.instiService.post(model).subscribe(
        (appretorno: any) => {
          this.search();
          this.toastr.success('Instituicao salvo com sucesso','',{timeOut: 5000});
        },
        (erro: any) => {console.log(erro);this.toastr.error('Erro ao salvar registo na base','',{timeOut: 5000}); }
      );
    }
    else{
      this.instiService.put(model,model.id).subscribe(
        (appretorno: any) => {
          this.search();
          this.toastr.success('Instituicao actualizado com sucesso','',{timeOut: 5000});
        },
        (erro: any) => {console.log(erro);this.toastr.error('Erro ao salvar registo na base','',{timeOut: 5000}); }
      );
    }
  }

  saveDadosFiscal(model: DadosFiscalView){
    if(model.id == null){
      this.instiService.postDadosFiscal(model).subscribe(
        (appretorno: any) => {
          this.search();
          this.toastr.success('Dados Fiscal salvo com sucesso','',{timeOut: 5000});
        },
        (erro: any) => {console.log(erro);this.toastr.error('Erro ao salvar registo na base','',{timeOut: 5000}); }
      );
    }
    else{
      this.instiService.putDadosFiscal(model,model.id).subscribe(
        (appretorno: any) => {
          this.search();
          this.toastr.success('Dados Fiscal actualizado com sucesso','',{timeOut: 5000});
        },
        (erro: any) => {console.log(erro);this.toastr.error('Erro ao salvar registo na base','',{timeOut: 5000}); }
      );
    }
  }

  checkItemsForm(tipList : Array<number>){
    
    let array = new   FormArray([]); 
      for(let i = 0; i<this.tipoComercioList.length; i++) {
        this.tipoComercioList[i].selected = false;
      }
      
      for(let i = 0; i<tipList.length; i++){
        let value = tipList[i];  
        array.push(new FormControl(value));  
        let result = this.tipoComercioList.find(x=>x.value == value)?.value;
        if(result!=null){
          for(let j = 0; j<this.tipoComercioList.length; j++) {
            if(this.tipoComercioList[j].value == result){
              this.tipoComercioList[j].selected = true;
            }
          }
        }
      }  
      return  array;   
  }
}
