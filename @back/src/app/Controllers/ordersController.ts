import 'dotenv/config';
import type { Request, Response } from "express";
import { orderModel } from "../Models/orderModel.js";
import { orderLineModel } from "../Models/orderLineModel.js";
import { paymentModel } from "../Models/paymentModel.js";
import { OrderStatus } from "../../@types/Order.js";
import stripe from "../Services/stripeService.js";
import { TreeModel } from "../Models/treeModel.js";

const redirectCheckoutPage = process.env.REDIRECT_CHECKOUT_PAGE;

const treeModel = new TreeModel();

const ordersController = {
	index(req, res) {
		res.json({
			message: 'GreenRoots API Server GET "/api/orders"',
			version: "1.0.0",
			status: "200",
		});
	},

	async show(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { user } = req;
			const order = await orderModel.findByIdWithOrderLinesAndPayment(
				Number(id),
			);

			if (!order) {
				return res.status(404).json({
					error: "Order not found",
				});
			}

			if (user?.role !== "admin" && order.user_id !== user?.user_id) {
				return res.status(403).json({
					error: "Access denied: You can only view your own orders",
				});
			}

			res.json(order);
		} catch (error) {
			console.error("Error getting order:", error);
			res.status(500).json({
				error: "Failed to retrieve order",
			});
		}
	},

	async create(req: Request, res: Response) {
		try {
			const { user } = req;
			const { items } = req.body;

			if (!user || !user.user_id || !items?.length) {
				return res.status(400).json({
					error: "User and items are required",
				});
			}

			// Validate items structure
			for (const item of items) {
				if (!item.tree_id || !item.quantity || !item.price) {
					return res.status(400).json({
						error: "Each item must have tree_id, quantity, and price",
					});
				}
			}

			// Create the order
			const order = await orderModel.create({
				user_id: user.user_id,
				status: OrderStatus.PENDING,
			});

      const orderLinesData = [];
      const line_items = [];

      for (const item of items) {
        const tree = await treeModel.findByIdForCheckout(item.tree_id);

        if (!tree || typeof tree === undefined) {
          return res.status(404).json({
            error: `Tree with ID ${item.tree_id} not found`,
          });
        }

        orderLinesData.push({
          tree_id: item.tree_id,
          order_id: order.order_id!,
          quantity: item.quantity,
          price: item.price,
        });

        line_items.push({
          price: tree.price_id,
          quantity: item.quantity,
        });
      }

			await orderLineModel.createMany(orderLinesData);

			const session = await stripe.checkout.sessions.create({
				line_items,
				mode: "payment",
				success_url: `${redirectCheckoutPage}?success=true`,
				cancel_url: `${redirectCheckoutPage}?canceled=true`,
			});

			res.redirect(303, session.url);
		} catch (error) {
			console.error("Error creating order:", error);
			res.status(500).json({
				error: "Failed to create order",
			});
		}
	},

	async updateStatus(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { status } = req.body;
			const { user } = req;

			if (!status) {
				return res.status(400).json({
					error: "Status is required",
				});
			}

			// Seuls les admins peuvent modifier le statut des commandes
			if (user?.role !== "admin") {
				return res.status(403).json({
					error: "Access denied: Only administrators can update order status",
				});
			}

			const updatedOrder = await orderModel.updateById(Number(id), { status });

			if (!updatedOrder) {
				return res.status(404).json({
					error: "Order not found",
				});
			}

			res.json(updatedOrder);
		} catch (error) {
			console.error("Error updating order status:", error);
			res.status(500).json({
				error: "Failed to update order status",
			});
		}
	},

	// Lister les commandes de l'utilisateur connecté
	async getUserOrders(req: Request, res: Response) {
		try {
			const { user } = req;

			if (!user || !user.user_id) {
				return res.status(401).json({
					error: "User authentication required",
				});
			}

			const orders = await orderModel.findByUserId(user.user_id);
			res.json(orders);
		} catch (error) {
			console.error("Error getting user orders:", error);
			res.status(500).json({
				error: "Failed to retrieve user orders",
			});
		}
	},
};

export { ordersController };
