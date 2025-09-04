import { AbstractModel } from "./AbstractModel.js";

export class Autor extends AbstractModel {
    protected fromRow(row: any): this {
        throw new Error("Method not implemented.");
    }
    protected toRow(): Record<string, any> {
        throw new Error("Method not implemented.");
    }
    static tableName = 'autores';
    public nome: string;
    public idade: number;

    constructor(nome: string, idade: number) {
        super(Autor.tableName); // inicializa a tabela
        this.nome = nome;
        this.idade = idade;
    }
}