import { PageView } from '@/_models/PageView';
import { ProductView } from '@/_models/ProductView';
import { ClienteView, VendaItem, VendaView } from '@/_models/VendaView';
import { ProdutoService } from '@/_services/produto.service';
import { RelatorioService } from '@/_services/relatorio.service';
import { VendaService } from '@/_services/venda.service';
import { Component, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { AppService } from '@services/app.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent {
  public listProduct : ProductView[] = []; 
  public listSelected : ProductView[] = [];
  public itemSelected:any;
  public modalRef?: BsModalRef; 
  public nm_:number = 1;
  public itemVenda   = {} as VendaView;
  public appvmForm: any; 
  public tipoPagamento:any = 1; 
  public _totalVenda:number = 0;
  public _totalpagar:number = 0;
  public _emDivida:number = 0;
  public _emDividaString:any;
  public _vendaResponse:any;
 
  public enumVendaType : Array<any> = [{value: 1,texto: "Pronto Pagamento",selected: true},{value: 2,texto: "Credito Pagamento",selected: false}];
  constructor(private appService: AppService,private reportService: RelatorioService,private vendaService: VendaService,private productService: ProdutoService, private modalService: BsModalService,private fb: FormBuilder,private toastr: ToastrService) {
    this.inicializandoAll(); 
   }
   ngOnInit(): void {
    this.getAllProduct();
    
  }
   inicializandoAll(){
     
    let model  = {} as VendaView;
    model.cliente = {} as ClienteView; 
    model.utilizadorId = this.appService.user.id;
    this.criarForm(model);
    this.itemVenda.vendaItens = [] as VendaItem[];
    this.itemVenda.cliente = {} as ClienteView;
    this._totalVenda = 0;
    this._totalpagar = 0;
    
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
        
        this.totalItems();
      },
      (erro: any) => {console.log(erro);}
      
    );
  }
  onChangeEvent(event: any){
    console.log(event.target.value);
    this.totalItems();
  }

  onChangeValue(event:any){
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
    }
    
    this._emDivida = (this._totalVenda - this._totalpagar) > 0 ? (this._totalVenda - this._totalpagar) : 0;
    
    
  }
   
  calculaLinha(modelId:any){ 
    const first = this.itemVenda.vendaItens.find((obj) => {
      if( obj.itemId === modelId){
        let preco = Number(obj.preco) 
        let qtd =   Number(this.nm_+modelId);
        obj.subtotal = +(preco * qtd);
        
      }
    });
    
  }
  addItem(){
    this.setItemCarProduct(this.itemSelected);
  }
  getClienteByTelefone(numTelefone:any){
    this.vendaService.getOneClienteByTelefone(numTelefone).subscribe(
      (resp : ClienteView) => { 
        this.itemVenda.cliente = resp;  
      },
      (erro: any) => {this.toastr.error('Numero não existe no sistema','',{timeOut: 5000}); }

    );
  }
  searchByFoneNumber(){
    let numFone = this.itemVenda.cliente.numTelefone;
    if(numFone === undefined){
      this.toastr.warning('Deve preencher numero de telefone','',{timeOut: 5000});
      return;
    }
    this.getClienteByTelefone(numFone);
  }
  clearClientData(){
    this.itemVenda.cliente = {} as ClienteView;
  }
  clearAlltData(){
    this.inicializandoAll();
    this.appvmForm.value = {};
    this.totalItems();
    this._totalVenda = 0;
    this._totalpagar = 0;
  }
  removeItem(itemId:any){
  
    const found = this.itemVenda.vendaItens.find((obj) => {
      return obj.itemId === itemId;
    });
    const indexOfObject = this.itemVenda.vendaItens.findIndex((object) => {
      return object.itemId === itemId;
    });
    if (indexOfObject !== -1) {
      this.itemVenda.vendaItens.splice(indexOfObject, 1);
    }
    this.totalItems();
  }
  totalItems(){
    this._totalVenda = 0;
    this.itemVenda.vendaItens.forEach(element => {
      this._totalVenda = this._totalVenda + (element.preco * element.quantidade)
    }); 
    this._totalpagar = this._totalVenda;
    this._emDividaString = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'}).format(this._totalpagar);
  }
  criarForm(model: VendaView) {       
    this.appvmForm = this.fb.group({
      nomeCliente:  model.cliente.nome,
      clienteId:  model.cliente.id, 
      numeroNif:  model.cliente.numeroNif, 
      numTelefone:  model.cliente.numTelefone,
      morada : model.cliente.morada, 
      utilizadorId : model.utilizadorId, 
      dataVenda: new Date(),
      totalPago :  0,
      totalVenda:  0,
      totalDivida:  0,
      itemSelected:null,
      id: model.id, 
      formaPagamento:0,
      vendaItens:  this.fb.array([])      
    });    
  }
  addItensVenda(model: VendaItem) {
    const vendaItens = this.appvmForm.controls.vendaItens as FormArray;
    vendaItens.push(this.fb.group({
      itemId: model.itemId,
      quantidade: model.quantidade,
      preco: model.preco,
      subtotal: model.subtotal,
      descricaoItem: model.descricaoItem,
    }));
  }
  confirmSale(template: TemplateRef<any>,model: any){
    this.modalRef = this.modalService.show(template);
  }
  
  submitVenda(){    
    var modelview = this.appvmForm.value;  
    modelview.formaPagamento = this.tipoPagamento;  
    modelview.totalDivida = this._emDivida;   
     
    
    this.vendaService.post(modelview).subscribe((responseview : any) => {
      this._vendaResponse = responseview;
      console.log(responseview);
      this.inicializandoAll();
      this.toastr.success('Salvo com sucesso','',{timeOut: 5000});
    });
     
    this.modalRef?.hide();
  }

  printFacturaVenda(vendaId:any){
    
    this.reportService.getInvoice(vendaId).subscribe((item : any) => {
        
      this.toastr.success('Relatorio gerado com sucesso','',{timeOut: 5000});
      const file = new Blob([item], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      this._vendaResponse = null;
    });
}
}
