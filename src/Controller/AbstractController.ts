import { type Request, type Response } from 'express';

export abstract class AbstractController {
    protected request: Request;
    protected response: Response;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }

    /**
     * Executa a logica do controlador.
     *
     * @returns {Request} Retorna a requisição processada.
     * @abstract
     */
    public async execute(): Promise<void> {
        try {
            // Implementação genérica (pode ser sobrescrita)
            this.response.json({
                method: this.getMethod(),
                params: this.getParams()
            });
        } catch (error: any) {
            this.response.status(500).json({ error: error.message });
        }
    }

    /**
     * Recupera os parâmetros da requisição.
     *
     * @returns {any} Retorna os parâmetros da requisição.
     * @abstract
     */
    public getParams(): any {
        return {
            ...this.request.params,
            ...this.request.query,
            ...this.request.body
        };
    }

    /**
     * Recupera o método HTTP da requisição.
     *
     * @return {string} Retorna o método HTTP da requisição.
     * @abstract
     */
    public getMethod(): string {
        return this.request.method;
    }
}
