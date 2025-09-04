// src/Controller/PostController.ts
import { AbstractController } from "./AbstractController.js";
import { Categoria } from "../Model/Categoria.js";
import Database from '../Model/Database.js';

export class CategoryController extends AbstractController{
    public async execute(): Promise<void> {
        const params = this.getParams();
        const method = this.getMethod();
         try {
            switch (method) {
                case 'GET':
                    if (params.id) {
                        // Busca categoria + posts relacionados
                        const category = await Database.prisma.category.findUnique({
                            where: { id: Number(params.id) },
                            include: { posts: true }, // <- pega os posts da categoria
                        });

                        if (!category) {
                            this.response.status(404).json({ message: 'Categoria não encontrada' });
                        } else {
                            this.response.json(category);
                        }
                    } else {
                        // Lista todas as categorias com seus posts
                        const categorias = await Database.prisma.category.findMany({
                            include: { posts: true },
                        });
                        this.response.json(categorias);
                    }
                    break;

                default:
                    this.response.status(405).json({ message: 'Método não permitido neste endpoint' });
            }
        } catch (error: any) {
            this.response.status(500).json({ error: error.message });
        }
    }
}
