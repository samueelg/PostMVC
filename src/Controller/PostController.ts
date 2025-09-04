// src/Controller/PostController.ts
import { type Request, type Response } from "express";
import Post from "../Model/Post.js";
import { AbstractController } from "./AbstractController.js";

export default class PostController extends AbstractController{
    private request: Request;
    private response: Response;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

    public async execute(): Promise<void> {
        try {
            const { id } = this.getParams();

            if (!id || isNaN(Number(id))) {
                this.response.status(400).send("ID inválido");
                return;
            }

            const post = await Post.findById(Number(id));

            if (!post) {
                this.response.status(404).send("Post não encontrado");
                return;
            }

            this.response.render("post.twig", { post });
        } catch (error: any) {
            this.response.status(500).json({ error: error.message });
        }
    }
}
