import db from '../database';

export type Product = {
  id: string;
  name: string;
  price: string;
  quantity:string};

class productModel {
  async create(product: Product): Promise<Product> {
    try {
      const connection = await db.connect();

      const sql = `INSERT INTO products (name, price, quantity)
      VALUES ($1, $2, $3)  returning *`;
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.quantity,
      ]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }

  async index(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT name, price, quantity FROM products';

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }

  async show(id?:string): Promise<Product> {
    try {
      const connection = await db.connect();

      const sql = `SELECT name, price, quantity FROM products
                    WHERE id=$1`;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const connection = await db.connect();

      const sql = `UPDATE products
                    SET name=$1, price=$2, quantity=$3
                    WHERE id=$4
                    RETURNING name, price, quantity`;

      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.quantity,
        product.id,
      ]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }

  async delete(id:string): Promise<Product> {
    try {
      const connection = await db.connect();

      const sql = `DELETE FROM products
                    WHERE id=$1
                    RETURNING id, name, price, quantity`;

      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }
}

export default productModel;
