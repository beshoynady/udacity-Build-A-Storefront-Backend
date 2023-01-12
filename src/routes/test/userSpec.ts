import supertest from 'supertest';
import app from '../../index';
import UserModel, { User } from '../../models/user.model';
import db from '../../database';

let token = '';
const userModel = new UserModel();

const request = supertest(app);

describe('Test User API Endpoint', () => {
  const user = {
    email: 'test13@test.com',
    username: 'test13',
    password: 'test0',
  } as User;

  beforeAll(async () => {
    const createUser = await userModel.create(user);
    user.id = createUser.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = 'DELETE FROM users';
    await connection.query(sql);
    connection.release();
  });

  describe('Test Authentication Methods', () => {
    it('Get Token From Authenticate Method', async () => {
      const res = await request
        .post('/api/users/login')
        .set('Content-type', 'application/json')
        .send({
          email: 'test13@test.com',
          password: 'test0',
        });
      expect(res.status).toBe(200);
      const {email, token: userToken } = res.body.data;
      expect(email).toBe('test13@test.com');
      token = userToken;
    });
  });
});
