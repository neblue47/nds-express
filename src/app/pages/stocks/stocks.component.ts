import { PageView } from '@/_models/PageView';
import { ProductView } from '@/_models/ProductView';
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
  public itemEntrada : any; 
  public listProduct : ProductView[] = []; 
  public listSelected : ProductView[] = [];
  public itemVenda   = {} as VendaView;
  public appvmForm: any; 
 constructor(private modalService: BsModalService,private productService: ProdutoService,private fbuilder: FormBuilder) {
 
  
 }
 ngOnInit(): void {
  this.getAllProduct();
  
}

 modalAdd(template: TemplateRef<any>){
   
  this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
 }
 novaEntrada(){
  this.itemEntrada = {} as ProductView;
 }
 cancelNovaEntrada(){
  this.itemEntrada = null;
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

 setItemCarProduct(modelId:any){
  this.productService.getOne(modelId).subscribe(
    (item : ProductView) => 
    {
      let itemV = {} as VendaItem; 
      itemV.descricaoItem = item.descricaoComercial;
      itemV.preco = item.preco_taxado;
      itemV.quantidade = +1;
      itemV.subtotal = item.preco_taxado;  
      itemV.itemId = modelId;       
    
      const found = this.itemVenda.vendaItens.find((obj) => {
        return obj.itemId === modelId;
      });   

      if (found === undefined) {
        this.addItensVenda(itemV);
        this.itemVenda.vendaItens.push(itemV); 
      }     
    },
    (erro: any) => {console.log(erro);}
    
  );
}
addItensVenda(model: VendaItem) {
  const vendaItens = this.appvmForm.controls.vendaItens as FormArray;
  vendaItens.push(this.fbuilder.group({
    itemId: model.itemId,
    quantidade: model.quantidade,
    preco: model.preco,
    subtotal: model.subtotal,
    descricaoItem: model.descricaoItem,
  }));
}
}
