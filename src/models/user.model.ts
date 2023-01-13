import db from '../database';
import bcrypt from 'bcrypt';
import config from '../config';


export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
};

const hashPassword = (password: string) => {
  const salt: number = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
  async create(user: User): Promise<User> {
    try {
      // first open connection
      const connection = await db.connect();

      // second run query
      const sql = `INSERT INTO users (email, username, password)
      VALUES ($1, $2, $3)   returning *`;

      const result = await connection.query(sql, [
        user.email,
        user.username,
        hashPassword(user.password),
      ]);
      // release the connection
      connection.release();
      // return new user
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }


  async index(): Promise<User[]> {
    try {
      const conn = await db.connect();

      const sql = 'SELECT email, username from users';

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await db.connect();

      const sql = `SELECT  id, email, username FROM users WHERE id=$1`;

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }

  async update(user: User): Promise<User> {
    try {
      const conn = await db.connect();

      const sql = `UPDATE users
                    SET email=$1, username=$2, password=$3
                    WHERE id=$4
                    RETURNING id, email, username`;

      // run query in database
      const result = await conn.query(sql, [
        user.email,
        user.username,
        hashPassword(user.password),
        user.id,
      ]);

      // release connection
      conn.release();
      return result.rows[0];
    }  catch (error) {
      throw new Error((error as Error).message
      )
    }
  }

  // +[5] delete user
  async delete(id: string): Promise<User> {
    try {
      // connection
      const conn = await db.connect();

      // sql query
      const sql = `DELETE FROM users
                  WHERE id=($1)
                  RETURNING id, email, username`;

      // run query
      const result = await conn.query(sql, [id]);

      // release connection
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await db.connect();

      const sql = 'SELECT password from users WHERE email=$1';
      const result = await conn.query(sql, [email]);

      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await conn.query(
            'SELECT id, email, username FROM users WHERE email=$1',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      conn.release();

      return null;
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }
}

export default UserModel;
