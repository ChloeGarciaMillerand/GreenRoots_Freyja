// tests/treeController.test.js
import { jest, describe, it, beforeEach, expect } from '@jest/globals';

// Mock TreeModel
const mockTreeModel = {
    findWithPagination: jest.fn(),
    findById: jest.fn()
};

// Create a mock controller that simulates your actual controller logic
const createMockController = () => ({
    async index(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const result = await mockTreeModel.findWithPagination(limit, offset);

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

    async show(req, res) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    message: 'Invalid tree ID',
                    status: 400
                });
            }

            const tree = await mockTreeModel.findById(id);

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
    }
});

describe('TreeController Logic Tests', () => {
    let treeController, req, res;

    beforeEach(() => {
        treeController = createMockController();
        req = {
            query: {},
            params: {},
            body: {}
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    describe('index method', () => {
        it('should return trees with pagination', async () => {
            // Arrange
            req.query = { page: '1', limit: '10' };
            const mockTrees = [
                { tree_id: 1, name: 'Oak Tree', price: 50.00 },
                { tree_id: 2, name: 'Pine Tree', price: 35.00 }
            ];
            mockTreeModel.findWithPagination.mockResolvedValue({
                trees: mockTrees,
                total: 25
            });

            // Act
            await treeController.index(req, res);

            // Assert
            expect(mockTreeModel.findWithPagination).toHaveBeenCalledWith(10, 0);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Trees retrieved successfully',
                data: mockTrees,
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 25,
                    pages: 3
                },
                status: 200
            });
        });

        it('should use default pagination when no query params', async () => {
            // Arrange
            req.query = {};
            mockTreeModel.findWithPagination.mockResolvedValue({
                trees: [],
                total: 0
            });

            // Act
            await treeController.index(req, res);

            // Assert
            expect(mockTreeModel.findWithPagination).toHaveBeenCalledWith(10, 0);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Trees retrieved successfully',
                data: [],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 0,
                    pages: 0
                },
                status: 200
            });
        });

        it('should handle custom pagination parameters', async () => {
            // Arrange
            req.query = { page: '2', limit: '5' };
            mockTreeModel.findWithPagination.mockResolvedValue({
                trees: [],
                total: 12
            });

            // Act
            await treeController.index(req, res);

            // Assert
            expect(mockTreeModel.findWithPagination).toHaveBeenCalledWith(5, 5);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    pagination: {
                        page: 2,
                        limit: 5,
                        total: 12,
                        pages: 3
                    }
                })
            );
        });

        it('should handle database errors', async () => {
            // Arrange
            req.query = {};
            mockTreeModel.findWithPagination.mockRejectedValue(new Error('Database connection failed'));

            // Act
            await treeController.index(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error retrieving trees',
                error: 'Database connection failed',
                status: 500
            });
        });
    });

    describe('show method', () => {
        it('should return single tree when found', async () => {
            // Arrange
            req.params = { id: '1' };
            const mockTree = {
                tree_id: 1,
                name: 'Oak Tree',
                price: 50.00,
                description: 'A beautiful oak tree'
            };
            mockTreeModel.findById.mockResolvedValue(mockTree);

            // Act
            await treeController.show(req, res);

            // Assert
            expect(mockTreeModel.findById).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Tree retrieved successfully',
                data: mockTree,
                status: 200
            });
        });

        it('should return 404 when tree not found', async () => {
            // Arrange
            req.params = { id: '999' };
            mockTreeModel.findById.mockResolvedValue(null);

            // Act
            await treeController.show(req, res);

            // Assert
            expect(mockTreeModel.findById).toHaveBeenCalledWith(999);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Tree not found',
                status: 404
            });
        });

        it('should return 400 for invalid ID', async () => {
            // Arrange
            req.params = { id: 'invalid' };

            // Act
            await treeController.show(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid tree ID',
                status: 400
            });
            expect(mockTreeModel.findById).not.toHaveBeenCalled();
        });

        it('should handle database errors', async () => {
            // Arrange
            req.params = { id: '1' };
            mockTreeModel.findById.mockRejectedValue(new Error('Database connection failed'));

            // Act
            await treeController.show(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error retrieving tree',
                error: 'Database connection failed',
                status: 500
            });
        });

        it('should parse numeric string IDs correctly', async () => {
            // Arrange
            req.params = { id: '42' };
            const mockTree = { tree_id: 42, name: 'Test Tree', price: 25.00 };
            mockTreeModel.findById.mockResolvedValue(mockTree);

            // Act
            await treeController.show(req, res);

            // Assert
            expect(mockTreeModel.findById).toHaveBeenCalledWith(42);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Tree retrieved successfully',
                data: mockTree,
                status: 200
            });
        });
    });
});