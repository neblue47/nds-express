export interface VendaView {
    id:string;
    cliente: ClienteView;
    vendaItens: Array<VendaItem>;
    numeroVenda:any;
    dataVenda:any;
    totalVenda:any;
    totalPago:any;
    totalDivida:any;
    isAnulado:any;
    formaPagamento:any;
    utilizadorId:any;
    utilizadorName:any; 
}
export interface RelatorioVendaView {
    id:string;
    nomeCliente:string;
    numeroNif:string;
    numTelefone:string;
    morada:string; 
    vendaItens: Array<VendaItem>;
    numeroVenda:any;
    dataVenda:any;
    dataVendaString:any;
    totalVenda:any;
    totalPago:any;
    isAnulado:any;
    formaPagamento:any;
    currentDivida:any;
}
export interface ClienteView {
    id:string;
    nome:string;
    numeroNif:string;
    numTelefone:string;
    morada:string; 
}
export interface ContaClienteView {
    id:string;
    totalVendas:any;
    totalCorrente:any;
    totalDivida:any;
    ultimaData:any;
    ultimaDataString:any;
    cliente:ClienteView;
}
export interface EnderecoView {
    morada:string; 
}
export interface VendaItem{
    descricaoItem:any;
    quantidade:any;
    subtotal:any;
    preco:any;
    itemLote:any;
    itemId:any;
    itemProductId:any;
}
export interface VendaFilter{
    dataInicial:any;
    dataFim:any;
    enumVenda:any; 
}