import { AbstractModel } from "./AbstractModel.js";

export class Tag extends AbstractModel {
    protected fromRow(row: any): this {
        throw new Error("Method not implemented.");
    }
    protected toRow(): Record<string, any> {
        throw new Error("Method not implemented.");
    }
    static tableName = 'tags';
    public nome: string;
    public descricao: string;

    constructor(nome: string, descricao: string) {
        super(Tag.tableName); // inicializa a tabela
        this.nome = nome;
        this.descricao = descricao;
    }
}