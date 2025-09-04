import { AbstractModel } from "./AbstractModel.js";

export class Categoria extends AbstractModel {
    protected fromRow(row: any): this {
        throw new Error("Method not implemented.");
    }
    protected toRow(): Record<string, any> {
        throw new Error("Method not implemented.");
    }
    static tableName = 'categorias';
    public nome: string;
    public descricao: string;

    constructor(nome: string, descricao: string) {
        super(Categoria.tableName); // inicializa a tabela
        this.nome = nome;
        this.descricao = descricao;
    }
}