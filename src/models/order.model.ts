import db from '../database';

export type Order = {
  id: number;
  product_id: number;
  quantity: number;
  user_email: string;
};


class OrderModel {
  async create(order: Order): Promise<Order> {
    try {
      const connection = await db.connect();

      const sql = `INSERT INTO orders (product_id, user_email, quantity,)
                   VALUES ($1, $2, $3) returning *`;
      const result = await connection.query(sql, [
        order.product_id,
        order.user_email,
        order.quantity,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }

  async index(user_email: string): Promise<Order[]> {
    try {
      const connection = await db.connect();

      const sql = `SELECT product_id, quantity, user_email FROM orders
                    WHERE user_email=$1`;

      const result = await connection.query(sql, [user_email]);
      connection.release();

      // return orders
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }

  async show(orderId: number): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `SELECT products.name, products.price
                    FROM orders
                    INNER JOIN products ON orders.product_id=products.id
                    WHERE orders.id=($1)`;
      const result = await connection.query(sql, [orderId]);

      connection.release();

      // return result
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }
  //
  async update(order: Order): Promise<Order> {
    try {
      const connection = await db.connect();

      const sql = `UPDATE orders
                   SET product_id=$1, quantity=$2
                   WHERE id=$3
                   RETURNING product_id, quantity, user_email`;

      const result = await connection.query(sql, [
        order.product_id,
        order.quantity,
        order.id,
      ]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const connection = await db.connect();

      const sql = `DELETE FROM orders 
                    WHERE id=$1
                    RETURNING product_id, quantity, user_email`;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }
}

export default OrderModel;
