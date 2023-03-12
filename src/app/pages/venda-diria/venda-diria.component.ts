import { PageView } from '@/_models/PageView';
import { RelatorioVendaView } from '@/_models/VendaView';
import { RelatorioService } from '@/_services/relatorio.service';
import { VendaService } from '@/_services/venda.service';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-venda-diria',
  templateUrl: './venda-diria.component.html',
  styleUrls: ['./venda-diria.component.scss']
})
export class VendaDiriaComponent {

  currentPage = 1;
  page?: number;
  totalItens = 0;
  userSelected : any;
  term:any;
  userTypeSelected:any;
  roleTypeSelected:any;
  motivoAnulacao:any;
  public appvmForm: any; 
  public searchvmForm:any;
  public modalRef?: BsModalRef; 
  public saleslistagem : RelatorioVendaView[]  = [];  
  public returnedArray? : RelatorioVendaView[] = []; 
  public itemOpcao : any;
  public itemDetalhe : any;
  public itemMotivo : any;
  public domainname : any;
  public itemOpcaoId : any;
  disabled = false
  singleSelect: any;
  public enumVendaList : Array<any> = [{value: 0,texto: "Todas",selected: true},{value: 1,texto: "Anulada",selected: false},{value: 2,texto: "Não Anuladas",selected: false}];
  constructor(private reportService: RelatorioService,private salesService: VendaService,private modalService: BsModalService,private fb: FormBuilder,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.search();
    this.criarSearchvmForm();
  }
  search(){
    this.reportService.getAllVendasDiaria().subscribe(
      (schlistagemVM : PageView<RelatorioVendaView>) => 
      {
        this.saleslistagem = schlistagemVM.content;
        this.totalItens = this.saleslistagem.length;
        this.returnedArray = this.saleslistagem.slice(0, 5).sort((a, b) => (a.dataVenda < b.dataVenda) ? -1 : 1);
      },
      (erro: any) => {console.log(erro);}
    );
  }
  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage; 
    this.returnedArray = this.saleslistagem.slice(startItem, endItem).sort((a, b) => (a.dataVenda < b.dataVenda) ? -1 : 1);
  }
  DetalhaItemForm(template: TemplateRef<any>,model: any){
    this.itemDetalhe = model; 
    this.modalRef = this.modalService.show(template, { class: 'modal-lg modal-dialog-centered', });     
   }
   AnularItemForm(template: TemplateRef<any>,model: any){
    this.itemOpcao = model.numeroVenda;
    this.itemOpcaoId = model.id; 
    this.modalRef = this.modalService.show(template);     
   }
   criarSearchvmForm() {  
    let formattedDateBegin = (moment(new Date())).format('YYYY-MM-DD')
    let lastDay = new Date();      
    let formattedDateLast = (moment(new Date(lastDay.getFullYear(), lastDay.getMonth(), new Date(lastDay.getFullYear(), lastDay.getMonth() + 1, 0).getDate()))).format('YYYY-MM-DD')
    this.searchvmForm = new FormGroup({ 
      dataInicial: new FormControl(formattedDateBegin),
      dataFim: new FormControl(formattedDateLast) ,
      enumVenda: new FormControl(0) ,
    });
   }
   searchByFiltro(){
  
    let  filter = this.searchvmForm.value;
    console.log(filter);
    if(filter.dataInicial   == '' && filter.dataFim  == '' ){
      return ;
    }
    else{     
      this.reportService.getAllVendasByFilter(filter).subscribe(
        (schlistagemVM : PageView<RelatorioVendaView>) => 
        {
          this.saleslistagem = schlistagemVM.content;
          this.totalItens = this.saleslistagem.length;
          this.returnedArray = this.saleslistagem.slice(0, 5).sort((a, b) => (a.dataVenda < b.dataVenda) ? -1 : 1);
        },
        (erro: any) => {console.log(erro);}
      );
    }
    
  }
  anularVenda(){
     
    this.salesService.anularVenda(this.itemOpcaoId,this.itemMotivo).subscribe((item : any) => {
      this.itemMotivo = null;
      this.search();
      this.toastr.warning('Venda anulada com sucesso','',{timeOut: 5000});
    });
    this.modalRef?.hide();
  }
  printFacturaVenda(vendaId:any){
    
    this.reportService.getInvoice(vendaId).subscribe((item : any) => {
        
      this.toastr.success('Relatorio gerado com sucesso','',{timeOut: 5000});
      const file = new Blob([item], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
 
  }
  clearSearchFilter(){
    this.search();
    
  }
}
