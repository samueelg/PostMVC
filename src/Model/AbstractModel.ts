import { Database } from '../Database/Database.js';

export abstract class AbstractModel {
    protected tableName: string;
    protected id?: number | undefined;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    /**
     * Cada modelo precisa implementar um mapeamento
     * de dados do banco -> atributos do objeto.
     */
    protected abstract fromRow(row: any): this;

    /**
     * Cada modelo precisa expor seus campos para INSERT/UPDATE
     */
    protected abstract toRow(): Record<string, any>;

    /**
     * Carrega um registro do banco com base em critérios.
     * Exemplo: load({ id: 1 })
     */
    public async load(criteria: Record<string, any>): Promise<this | null> {
        const db = await Database.getInstance();

        const keys = Object.keys(criteria);
        const values = Object.values(criteria);

        if (keys.length === 0) {
            throw new Error("Nenhum critério fornecido para load()");
        }

        //Definindo confição where
        const where = keys.map(k => `${k} = ?`).join(" AND ");

        //Consulta select para buscar todos os registros
        const sql = `SELECT * FROM ${this.tableName} WHERE ${where} LIMIT 1`;

        const row = await db.get(sql, values);

        if (!row) {
            return null;
        }

        return this.fromRow(row);
    }

    /**
     * Insere ou atualiza o registro no banco.
     * Se this.id existir -> UPDATE
     * Caso contrário -> INSERT
     */
    public async save(): Promise<this> {
        const db = await Database.getInstance();

        const data = this.toRow();
        const keys = Object.keys(data);
        const values = Object.values(data);

        if (this.id) {
            // UPDATE
            const setClause = keys.map(k => `${k} = ?`).join(", ");
            const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;

            await db.run(sql, [...values, this.id]);
        } else {
            // INSERT
            const placeholders = keys.map(() => "?").join(", ");
            const sql = `INSERT INTO ${this.tableName} (${keys.join(", ")}) VALUES (${placeholders})`;

            const result = await db.run(sql, values);

            this.id = result.lastID;
        }

        return this;
    }

    /**
     * Exclui o registro do banco com base no ID.
     */
    public async delete(): Promise<boolean> {
        const db = await Database.getInstance();

        if (!this.id) {
            throw new Error("Não é possível deletar sem ID definido.");
        }

        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await db.run(sql, [this.id]);

        return (result.changes ?? 0 ) > 0;
    }

    public getTableName(): string {
        return this.tableName;
    }
}
