import { PageView } from '@/_models/PageView';
import { ContaClienteView } from '@/_models/VendaView';
import { ClienteService } from '@/_services/cliente.service';
import { Component } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-gestao-cliente',
  templateUrl: './gestao-cliente.component.html',
  styleUrls: ['./gestao-cliente.component.scss']
})
export class GestaoClienteComponent {
  currentPage = 1;
  page?: number;
  totalItens = 0;
  prdSelected : any;
  term:any;
  public returnedArray? : ContaClienteView[] = []; 
  public listCustomers : ContaClienteView[]  = [];
  
  constructor(private clientServices: ClienteService) { }
  
  ngOnInit(): void {
    this.search();
  }
  search(){
    this.clientServices.getContaClienteAll().subscribe(
      (schlistagemVM : PageView<ContaClienteView>) => 
      {
        this.listCustomers = schlistagemVM.content;
        this.totalItens = this.listCustomers.length;
        this.returnedArray = this.listCustomers.sort((a, b) => (a.cliente.nome < a.cliente.nome) ? -1 : 1).slice(0, 10);
      },
      (erro: any) => {console.log(erro);}
    );
  }
  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage; 
    this.returnedArray = this.listCustomers.sort((a, b) => (a.cliente.nome < a.cliente.nome) ? -1 : 1).slice(startItem, endItem);
  }
}
