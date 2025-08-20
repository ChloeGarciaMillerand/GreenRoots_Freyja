import type { Request, Response } from 'express';
import { TreeModel } from '../Models/treeModel.js';

const treeModel = new TreeModel();

const treeController = {
    async index(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const offset = (page - 1) * limit;

            const result = await treeModel.findWithPagination(limit, offset);

            res.json({
                message: 'Trees retrieved successfully',
                data: result.trees,
                pagination: {
                    page,
                    limit,
                    total: result.total,
                    pages: Math.ceil(result.total / limit)
                },
                status: 200
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error retrieving trees',
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            });
        }
    },

    async show(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    message: 'Invalid tree ID',
                    status: 400
                });
            }

            const tree = await treeModel.findById(id);

            if (!tree) {
                return res.status(404).json({
                    message: 'Tree not found',
                    status: 404
                });
            }

            res.json({
                message: 'Tree retrieved successfully',
                data: tree,
                status: 200
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error retrieving tree',
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            });
        }
    },
}

export {treeController};

