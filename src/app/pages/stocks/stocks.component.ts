import { PageView } from '@/_models/PageView';
import { ItemEntradaView, ProductView } from '@/_models/ProductView';
import { VendaItem, VendaView } from '@/_models/VendaView';
import { InventarioService } from '@/_services/inventario.service';
import { ProdutoService } from '@/_services/produto.service';
import { Component, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { AppService } from '@services/app.service';
import moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent {
  public modalRef?: BsModalRef;
  public itemEntradaId : any; 
  public listProduct : ProductView[] = []; 
  public listSelected : ProductView[] = [];
  public itensEntrada : ItemEntradaView[] = [];
  public tabelaEntrada : ItemEntradaView[] = [];
  public enumUnidadeType : Array<any> = [{value: 1,texto: "Unitário",selected: true},{value: 2,texto: "Caixa",selected: false},{value: 3,texto: "Saqueta",selected: false}]; 
  public appvmForm: any; 
 constructor(
    private modalService: BsModalService,
    private productService: ProdutoService,
    private inventarioImpl: InventarioService,
    private fbuilder: FormBuilder,
    private toastr: ToastrService,
    private appService: AppService) 
    {
  this.inicializandoAll();
  
 }
 ngOnInit(): void {
  this.getAllInventarioProduct();
  this.getAllProduct();
  
}
inicializandoAll(){
     
  let model  = {} as ItemEntradaView; 
  model.utilizadorId = this.appService.user.id;
  model.dataEntrada = new Date();
  this.criarForm(model);
  this.itensEntrada = []  as  ItemEntradaView  [];
  
}
 modalAdd(template: TemplateRef<any>){
   
  this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
 }
 novaEntrada(){
  this.itemEntradaId = {}  as  ItemEntradaView;
  this.itensEntrada = []  as  ItemEntradaView  [];
 }
 cancelNovaEntrada(){
  this.itemEntradaId = null;
 }
 criarForm(model: ItemEntradaView) {       
  this.appvmForm = this.fbuilder.group({
    utilizadorId : model.utilizadorId,
    itemEntradaId : model.productId,
    itemEntradaArray:  this.fbuilder.array([])      
  });    
}
 getAllProduct(){
  this.productService.getAll().subscribe(
    (schlistagemVM : PageView<ProductView>) => 
    {
      let listItem = schlistagemVM.content; 
      this.listProduct = listItem.sort((a, b) => (a.descricaoComercial < b.descricaoComercial) ? -1 : 1);
    },
    (erro: any) => {console.log(erro);}
  );
 }
 getAllInventarioProduct(){
  this.inventarioImpl.getAll().subscribe(
    (schlistagemVM : PageView<ItemEntradaView>) => 
    {
      let listItem = schlistagemVM.content; 
      this.tabelaEntrada = listItem.sort((a, b) => (a.productDescricao < b.productDescricao) ? -1 : 1);
    },
    (erro: any) => {console.log(erro);}
  );
 }
 addItem(){
  this.setItemEntrada(this.itemEntradaId);
}
setItemEntrada(modelId:any){
  this.productService.getOne(modelId).subscribe(
    (item : ProductView) => 
    {
      let itemV = {} as ItemEntradaView; 
      itemV.productDescricao = item.descricaoComercial;
      itemV.productId = item.id
      itemV.valor = item.preco_taxado;
      itemV.quantidade = item.quantidade;
      itemV.lote = '';
      itemV.utilizadorId = this.appService.user.id;
      itemV.dataEntrada = (moment(new Date())).format('YYYY-MM-DD');
      const found = this.itensEntrada.find((obj) => {
        return obj.inventarioId === modelId;
      });   

      if (found === undefined) {
        this.itensEntrada.push(itemV);
        this.addItensEntrada(itemV);          
      }     
    },
    (erro: any) => {console.log(erro);}
    
  );
}
removeItem(itemId:any){
  
  const found = this.itensEntrada.find((obj) => {
    return obj.inventarioId === itemId;
  });
  const indexOfObject = this.itensEntrada.findIndex((object) => {
    return object.inventarioId === itemId;
  });
  if (indexOfObject !== -1) {
    this.itensEntrada.splice(indexOfObject, 1);
  }
   
}
addItensEntrada(model: ItemEntradaView) {
  const itemEntradaArray = this.appvmForm.controls.itemEntradaArray as FormArray;
  itemEntradaArray.push(this.fbuilder.group({
    productId: model.productId,
    quantidade: model.quantidade,
    valor: model.valor,
    lote: model.lote,
    unidade: model.unidade,
    utilizadorId: model.utilizadorId,
    dataEntrada : model.dataEntrada
  }));
}
 
submitForm(){ 
  console.log(this.itensEntrada);    
  var modelview = this.appvmForm.value; 
  console.log(modelview);   
 
    this.inventarioImpl.save(modelview).subscribe((responseview : any) => {
    this.itemEntradaId = null;
    this.inicializandoAll();
    this.getAllInventarioProduct();

    this.toastr.success('Salvo com sucesso','',{timeOut: 5000});
  });
  
  //this.toastr.success('Salvo com sucesso','',{timeOut: 5000});
}

}
