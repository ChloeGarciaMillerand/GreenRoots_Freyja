import type { QueryResult } from 'pg';
import type { PaymentTransaction } from '../../@types/PaymentTransaction.js';
import DatabaseService from '../Services/database.js';

class PaymentModel {
    private db = DatabaseService;
    async create(paymentData: Omit<PaymentTransaction, 'payment_transaction_id' | 'created_at' | 'updated_at'>) {
        const query = `
            INSERT INTO payment_transaction (order_id, stripe_payment_id, amount, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        
        const values = [
            paymentData.order_id,
            paymentData.stripe_payment_id,
            paymentData.amount,
            paymentData.status
        ];

        try {
            const result: QueryResult<PaymentTransaction> = await this.db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error creating payment transaction: ${error}`);
        }
    }

    async findById(paymentId: number): Promise<PaymentTransaction | null> {
        try {
            const query = 'SELECT * FROM payment_transaction WHERE payment_transaction_id = $1';
            const result: QueryResult<PaymentTransaction> = await this.db.query(query, [paymentId]);
            return result.rows[0] || null;
        } catch (error) {
            throw new Error(`Error getting payment by ID: ${error}`);
        }
    }

    async findByOrderId(orderId: number): Promise<PaymentTransaction | null> {
        try {
            const query = 'SELECT * FROM payment_transaction WHERE order_id = $1 ORDER BY created_at DESC';
            const result: QueryResult<PaymentTransaction> = await this.db.query(query, [orderId]);
            return result.rows[0] || null;
        } catch (error) {
            throw new Error(`Error getting payment by order ID: ${error}`);
        }
    }

    async findByStripeId(stripePaymentId: string): Promise<PaymentTransaction | null> {
        try {
            const query = 'SELECT * FROM payment_transaction WHERE stripe_payment_id = $1';
            const result: QueryResult<PaymentTransaction> = await this.db.query(query, [stripePaymentId]);
            return result.rows[0] || null;
        } catch (error) {
            throw new Error(`Error getting payment by Stripe ID: ${error}`);
        }
    }

    async updateByStripeId(stripePaymentId: string, updateData: Partial<PaymentTransaction>): Promise<PaymentTransaction | null> {
        try {
            const fields: string[] = [];
            const values: any[] = [];
            let paramCount = 1;

            for (const [key, value] of Object.entries(updateData)) {
                if (key !== 'payment_transaction_id' && key !== 'created_at' && value !== undefined) {
                    fields.push(`${key} = $${paramCount}`);
                    values.push(value);
                    paramCount++;
                }
            }

            if (fields.length === 0) {
                throw new Error('No valid fields to update');
            }

            fields.push(`updated_at = NOW()`);
            values.push(stripePaymentId);

            const query = `
                UPDATE payment_transaction 
                SET ${fields.join(', ')}
                WHERE stripe_payment_id = $${paramCount}
                RETURNING *
            `;

            const result: QueryResult<PaymentTransaction> = await this.db.query(query, values);
            return result.rows[0] || null;
        } catch (error) {
            throw new Error(`Error updating payment by Stripe ID: ${error}`);
        }
    }

    async updateById(paymentId: number, updateData: Partial<PaymentTransaction>): Promise<PaymentTransaction | null> {
        try {
            const fields: string[] = [];
            const values: any[] = [];
            let paramCount = 1;

            for (const [key, value] of Object.entries(updateData)) {
                if (key !== 'payment_transaction_id' && key !== 'created_at' && value !== undefined) {
                    fields.push(`${key} = $${paramCount}`);
                    values.push(value);
                    paramCount++;
                }
            }

            if (fields.length === 0) {
                throw new Error('No valid fields to update');
            }

            fields.push(`updated_at = NOW()`);
            values.push(paymentId);

            const query = `
                UPDATE payment_transaction 
                SET ${fields.join(', ')}
                WHERE payment_transaction_id = $${paramCount}
                RETURNING *
            `;

            const result: QueryResult<PaymentTransaction> = await this.db.query(query, values);
            return result.rows[0] || null;
        } catch (error) {
            throw new Error(`Error updating payment: ${error}`);
        }
    }

    async findAllByOrderId(orderId: number): Promise<PaymentTransaction[]> {
        try {
            const query = 'SELECT * FROM payment_transaction WHERE order_id = $1 ORDER BY created_at DESC';
            const result: QueryResult<PaymentTransaction> = await this.db.query(query, [orderId]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting all payments by order ID: ${error}`);
        }
    }
}

const paymentModel = new PaymentModel();

export { paymentModel };
