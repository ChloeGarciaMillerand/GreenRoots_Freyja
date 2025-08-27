import type { Request, Response } from 'express';
import { orderModel } from '../Models/orderModel.js';
import { orderLineModel } from '../Models/orderLineModel.js';
import { paymentModel } from '../Models/paymentModel.js';
import { OrderStatus } from '../../@types/Order.js';

const ordersController = {
    index(req, res){
        res.json({
            message: 'GreenRoots API Server GET "/api/orders"',
            version: '1.0.0',
            status: '200'
        });
    },

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const order = await orderModel.findByIdWithOrderLinesAndPayment(Number(id));

            if (!order) {
                return res.status(404).json({
                    error: 'Order not found'
                });
            }

            res.json(order);
        } catch (error) {
            console.error('Error getting order:', error);
            res.status(500).json({
                error: 'Failed to retrieve order'
            });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const { user_id, items } = req.body;

            if (!user_id || !items?.length) {
                return res.status(400).json({
                    error: 'User ID and items are required'
                });
            }

            // Validate items structure
            for (const item of items) {
                if (!item.tree_id || !item.quantity || !item.price) {
                    return res.status(400).json({
                        error: 'Each item must have tree_id, quantity, and price'
                    });
                }
            }

            // Create the order
            const order = await orderModel.create({
                user_id,
                status: OrderStatus.PENDING
            });

            // Create order lines
            const orderLinesData = items.map((item: any) => ({
                tree_id: item.tree_id,
                order_id: order.order_id!,
                quantity: item.quantity,
                price: item.price
            }));

            const orderLines = await orderLineModel.createMany(orderLinesData);

            res.status(201).json({
                ...order,
                order_lines: orderLines
            });
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({
                error: 'Failed to create order'
            });
        }
    },

    async updateStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({
                    error: 'Status is required'
                });
            }

            const updatedOrder = await orderModel.updateById(Number(id), { status });

            if (!updatedOrder) {
                return res.status(404).json({
                    error: 'Order not found'
                });
            }

            res.json(updatedOrder);
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).json({
                error: 'Failed to update order status'
            });
        }
    }
}

export { ordersController };
