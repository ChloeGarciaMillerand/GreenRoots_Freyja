import type { QueryResult } from 'pg';
import type { Tree } from '../../@types/Tree.js';
import DatabaseService from '../Services/database.js'; // Adjust path as needed

class TreeModel {
    private db = DatabaseService;

    // Get all trees
    async findAll(): Promise<Tree[]> {
        try {
            const query = `
                SELECT tree_id, name, description, price, image, created_at, updated_at 
                FROM tree 
                ORDER BY created_at DESC
            `;
            const result: QueryResult<Tree> = await this.db.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Error fetching trees: ${error}`);
        }
    }

    // Get tree by ID
    async findById(id: number): Promise<Tree | null> {
        try {
            const query = `
                SELECT tree_id, name, description, price, image, created_at, updated_at 
                FROM tree 
                WHERE tree_id = $1
            `;
            const result: QueryResult<Tree> = await this.db.query(query, [id]);
            return result.rows[0] || null;
        } catch (error) {
            throw new Error(`Error fetching tree with ID ${id}: ${error}`);
        }
    }

    // Create new tree
    async create(treeData: Omit<Tree, 'tree_id' | 'created_at' | 'updated_at'>): Promise<Tree> {
        try {
            const query = `
                INSERT INTO tree (name, description, price, image, created_at, updated_at)
                VALUES ($1, $2, $3, $4, NOW(), NOW())
                RETURNING tree_id, name, description, price, image, created_at, updated_at
            `;
            const values = [
                treeData.name,
                treeData.description || null,
                treeData.price,
                treeData.image || null
            ];
            const result: QueryResult<Tree> = await this.db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error creating tree: ${error}`);
        }
    }

    // Update tree by ID
    async updateById(id: number, treeData: Partial<Omit<Tree, 'tree_id' | 'created_at' | 'updated_at'>>): Promise<Tree | null> {
        try {
            const updateFields: string[] = [];
            const values: any[] = [];
            let paramCount = 1;

            if (treeData.name !== undefined) {
                updateFields.push(`name = $${paramCount++}`);
                values.push(treeData.name);
            }
            if (treeData.description !== undefined) {
                updateFields.push(`description = $${paramCount++}`);
                values.push(treeData.description);
            }
            if (treeData.price !== undefined) {
                updateFields.push(`price = $${paramCount++}`);
                values.push(treeData.price);
            }
            if (treeData.image !== undefined) {
                updateFields.push(`image = $${paramCount++}`);
                values.push(treeData.image);
            }

            if (updateFields.length === 0) {
                throw new Error('No fields to update');
            }

            updateFields.push(`updated_at = NOW()`);
            values.push(id);

            const query = `
                UPDATE tree 
                SET ${updateFields.join(', ')}
                WHERE tree_id = $${paramCount}
                RETURNING tree_id, name, description, price, image, created_at, updated_at
            `;

            const result: QueryResult<Tree> = await this.db.query(query, values);
            return result.rows[0] || null;
        } catch (error) {
            throw new Error(`Error updating tree with ID ${id}: ${error}`);
        }
    }

    // Delete tree by ID
    async deleteById(id: number): Promise<boolean> {
        try {
            const query = `DELETE FROM tree WHERE tree_id = $1`;
            const result = await this.db.query(query, [id]);
            return result.rowCount !== null && result.rowCount > 0;
        } catch (error) {
            throw new Error(`Error deleting tree with ID ${id}: ${error}`);
        }
    }

    // Get trees with pagination
    async findWithPagination(limit: number = 10, offset: number = 0): Promise<{trees: Tree[], total: number}> {
        try {
            // Get total count
            const countQuery = `SELECT COUNT(*) as total FROM tree`;
            const countResult = await this.db.query(countQuery);
            const total = parseInt(countResult.rows[0].total);

            // Get paginated results
            const query = `
                SELECT tree_id, name, description, price, image, created_at, updated_at 
                FROM tree 
                ORDER BY created_at DESC
                LIMIT $1 OFFSET $2
            `;
            const result: QueryResult<Tree> = await this.db.query(query, [limit, offset]);

            return {
                trees: result.rows,
                total
            };
        } catch (error) {
            throw new Error(`Error fetching paginated trees: ${error}`);
        }
    }
}

export { TreeModel };