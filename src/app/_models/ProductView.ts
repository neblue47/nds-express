export interface ProductView{
    id:any;
    descricaoComercial: any;
    descricaoTecnica:any;
    quantidade:number;
    preco:number;
    taxa:number;
    statuStock: any;
    statuStockDescription:any;
    preco_taxado:number;
    total_venda:number;
}
export interface ItemEntradaView{
    itemId:any;
    productId: any;
    productDescricao: any;
    unidade:any;
    unidadeDescription:any;
    quantidade:number;
    valor:number;
    lote:any;
    dataEntrada:any;
    utilizadorId:any;
    utilizadorName:any; 
}
export enum EStatuStock {
    DISPONIVEL = 1,
    INDISPONIVEL = 2,
    TODOS = 0
}
export enum ETaxa {
    Isento = 0,
    TaxaNormal = 2,
    TaxaMedio = 10
}