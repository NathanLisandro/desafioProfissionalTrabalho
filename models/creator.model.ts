export interface Creator {
    id?: number;
    nome: string;
    funcao: string;
    quadrinho_id: number;
    creators: { items: Creator[] };

}