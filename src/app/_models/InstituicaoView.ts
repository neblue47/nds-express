export interface InstituicaoView {
 
    id: string; 
	designacaoFormal: string; 
	designacaoComercial: string;
	numeroFiscal: string;
	numeroTelefone: string; 
	endereco: string;
	missaoVisao: string;
   
}
export interface RetornoViews{
	id: string; 
	designacaoFormal: string; 
	designacaoComercial: string;
	numeroFiscal: string;
	numeroTelefone: string; 
	endereco: string;
	missaoVisao: string;
	dadosFiscaisViews: DadosFiscalView;
}
export interface RegimeView {
 
    taxCode: string; 
	description: string;  
   
}

export interface DadosFiscalView { 
    id: string; 
	cae: string;  
    moeda: any;
	moedaDescription: string;
	instituicaoId: any;
	taxCode: any;
	taxa:any;
	description:string;
	motivoIsencao:string;
	tipo:any;
	tipoDescription:string;
}
