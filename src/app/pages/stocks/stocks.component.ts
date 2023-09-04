import { PageView } from '@/_models/PageView';
import { ItemEntradaView, ProductView } from '@/_models/ProductView';
import { VendaItem, VendaView } from '@/_models/VendaView';
import { ProdutoService } from '@/_services/produto.service';
import { Component, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
   
  public appvmForm: any; 
 constructor(private modalService: BsModalService,private productService: ProdutoService,private fbuilder: FormBuilder) {
  this.inicializandoAll();
  
 }
 ngOnInit(): void {
  this.getAllProduct();
  
}
inicializandoAll(){
     
  let model  = {} as ItemEntradaView; 
  //model.utilizadorId = this.appService.user.id;
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
      itemV.valor = 0;
      itemV.quantidade = +1;
    
      const found = this.itensEntrada.find((obj) => {
        return obj.itemId === modelId;
      });   

      if (found === undefined) {
        this.addItensEntrada(itemV);
        this.itensEntrada.push(itemV);          
      }     
    },
    (erro: any) => {console.log(erro);}
    
  );
}
removeItem(itemId:any){
  
  const found = this.itensEntrada.find((obj) => {
    return obj.itemId === itemId;
  });
  const indexOfObject = this.itensEntrada.findIndex((object) => {
    return object.itemId === itemId;
  });
  if (indexOfObject !== -1) {
    this.itensEntrada.splice(indexOfObject, 1);
  }
   
}
addItensEntrada(model: ItemEntradaView) {
  const itemEntradaArray = this.appvmForm.controls.itemEntradaArray as FormArray;
  itemEntradaArray.push(this.fbuilder.group({
     
  }));
}
}
