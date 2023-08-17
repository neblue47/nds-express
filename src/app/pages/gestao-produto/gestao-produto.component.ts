import { PageView } from '@/_models/PageView';
import { EStatuStock, ETaxa, ProductView } from '@/_models/ProductView';
import { ProdutoService } from '@/_services/produto.service';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestao-produto',
  templateUrl: './gestao-produto.component.html',
  styleUrls: ['./gestao-produto.component.scss']
})
export class GestaoProdutoComponent {
  currentPage = 1;
  page?: number;
  totalItens = 0;
  prdSelected : any;
  term:any;
  precoTemp:number = 0;
  taxaTemp:number = 0;
  itemOpcao:any;
  itemOpcaoId:any;
  precotaxadoTemp:number = 0;
  prdTypeSelected:any;
  public returnedArray? : ProductView[] = []; 
  public listProducts : ProductView[]  = [];
  public appvmForm: any; 
  public modalRef?: BsModalRef; 
  public statesTypes = [{value:1 , texto:'Disponivel'}, { value:2, texto:'Não Disponivel'}];
  public isentoTypes = [{value:0 , texto:'Isento'}, { value:7, texto:'Taxa IVA 7%'}, { value:10, texto:'Taxa IVA 10%'}, { value:14, texto:'Taxa IVA 14%'}]; 

  constructor(private productService: ProdutoService,private modalService: BsModalService,private fb: FormBuilder,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.search();
  }
  search(){
    this.productService.getAll().subscribe(
      (schlistagemVM : PageView<ProductView>) => 
      {
        this.listProducts = schlistagemVM.content;
        this.totalItens = this.listProducts.length;
        this.returnedArray = this.listProducts.sort((a, b) => (a.descricaoComercial < b.descricaoComercial) ? -1 : 1).slice(0, 10);
      },
      (erro: any) => {console.log(erro);}
    );
  }
  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage; 
    this.returnedArray = this.listProducts.sort((a, b) => (a.descricaoComercial < b.descricaoComercial) ? -1 : 1).slice(startItem, endItem);
  }
  appNovo(){

    this.prdSelected = {} as ProductView; 
    let model  = {} as ProductView;
    this.precoTemp = 0;
    this.criarForm(model); 
   }
   voltar(){
    this.prdSelected = null; 
    this.precoTemp = 0;
    this.precotaxadoTemp = 0;
    this.taxaTemp = -1;
  }
  criarForm(model: ProductView) {       
     
    this.appvmForm = this.fb.group({
      descricaoComercial:  [model.descricaoComercial,Validators.required], 
      descricaoTecnica:  [model.descricaoTecnica], 
      quantidade : [model.quantidade,Validators.required] ,
      preco : [model.preco,Validators.required] , 
      taxa : [model.taxa,Validators.required] , 
      preco_taxado : [model.preco_taxado,Validators.required] ,  
      statuStock :  model.statuStock,
      id: model.id,  
    });    
  }
  EditaModel(model: ProductView){
    this.prdSelected = model; 
    this.precoTemp = model.preco;
    this.precotaxadoTemp = model.preco_taxado;
    this.taxaTemp = model.taxa;
    this.EditForm(model);
  }
  EditForm(model: ProductView) {       
     
    this.appvmForm = this.fb.group({
      descricaoComercial:  [model.descricaoComercial,Validators.required], 
      descricaoTecnica:  [model.descricaoTecnica], 
      quantidade : [model.quantidade,Validators.required] ,
      preco : [model.preco,Validators.required] , 
      taxa : [model.taxa,Validators.required] , 
      preco_taxado : [model.preco_taxado,Validators.required] ,  
      statuStock :  model.statuStock,
      id: model.id,  
    });    
  }
  submitForm(){
    console.log(this.appvmForm.value); 
    var modelview = {} as ProductView;
    modelview = this.appvmForm.value; 
    this.salvarProduct(modelview);
    this.prdSelected = null; 
    let model  = {} as ProductView;
    this.precoTemp = 0;
    this.criarForm(model);
  }
  salvarProduct(model: ProductView){
    if(model.id == null){
      this.productService.save(model).subscribe(
        (appretorno: any) => {this.search(); this.toastr.success('Item salvo com sucesso','',{timeOut: 5000});},
        (erro: any) => {console.log(erro);  this.toastr.error(erro,'',{timeOut: 5000});}
      );
    }
    else{
      this.productService.upsave(model,model.id).subscribe(
        (appretorno: any) => {this.search(); this.toastr.success('Item atualizado com sucesso','',{timeOut: 5000});},
        (erro: any) => {console.log(erro);  this.toastr.error(erro,'',{timeOut: 5000});}
      );
    }

  }
  setPrecoTaxado(){
    let percetual = +(this.precoTemp * this.taxaTemp/100);
    let preco = +(this.precoTemp);
    this.precotaxadoTemp = preco + percetual;
  }
  excluirItemForm(template: TemplateRef<any>,model: any){
    this.itemOpcao = model.descricaoComercial;
    this.itemOpcaoId = model.id;
    this.modalRef = this.modalService.show(template);
   }
  
   confirmEvent(id:any){
    this.productService.delete(id).subscribe(
      (appretorno: any) => {
        this.search();
        this.toastr.warning('Item excluido com sucesso','',{timeOut: 5000});
      },
      (erro: any) => {console.log(erro); } 
     );
     
     this.modalRef?.hide();
   }
  public statuStockLabelMapping = EStatuStockLabelMapping;
  public estatuStockTypes = Object.values(EStatuStock);
  public taxaTypes = Object.values(ETaxa);
}
export const EStatuStockLabelMapping: Record<EStatuStock, string> = {
  [EStatuStock.DISPONIVEL]: "DISPONIVEL", 
  [EStatuStock.INDISPONIVEL]: "INDISPONIVEL",
  [EStatuStock.TODOS]: "TODOS",
};
