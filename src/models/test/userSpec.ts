import userModel, { User } from '../user.model';
import db from '../../database';

const UserModel = new userModel();

describe('User Model', () => {
  describe('Test Methods Exists', () => {
    it('Should have Create User Method', () => {
      expect(UserModel.create).toBeDefined();
    });

    it('Should have Get All Users Method', () => {
      expect(UserModel.index).toBeDefined();
    });

    it('Should have Get One Users Method', () => {
      expect(UserModel.show).toBeDefined();
    });

    it('Should have Update User Method', () => {
      expect(UserModel.update).toBeDefined();
    });

    it('Should have Delete User Method', () => {
      expect(UserModel.delete).toBeDefined();
    });

    it('Should have Users Authentication Method', () => {
      expect(UserModel.authenticate).toBeDefined();
    });
  });

  describe('Test User Model Logic', () => {
    const user = {
      email: 'testUser@test.com',
      username: 'testUs',
      password: 'testUs',
    } as User;

    beforeAll(async () => {
      const createdUser = await UserModel.create(user);
      user.id = createdUser.id;
    });

    afterAll(async () => {
      const connection = await db.connect();

      const sql = 'DELETE FROM users';

      await connection.query(sql);

      connection.release();
    });

    it('Create new  user should  return the new user in db ', async () => {
      const user = {
        email: 'test1@test.com',
        username: 'test',
        password: 'test'
      } as User
      const createUser = await UserModel.create(user)
      user.id = createUser.id
      expect(createUser.id).toBe(user.id)
      expect(createUser.email).toBe(user.email)
      expect(createUser.username).toBe(user.username)
    })

    it('get one  user should  return specific in db ', async () => {
      const getUser = await UserModel.show(user.id)
      expect(getUser.id).toBe(user.id)
      expect(getUser.email).toBe(user.email)
      expect(getUser.username).toBe(user.username)
    })
    it('update one  user should  return the updated user in db ', async () => {
      const updatedUser = await UserModel.update({
        ...user,
        username: 'test3'
      })
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.email).toBe(user.email)
      expect(updatedUser.username).toBe('test3')
    })
    it('delete one  user should  return the deleted one  in db ', async () => {
      const deleteUser = await UserModel.delete(
        user.id as string
      )
      expect(deleteUser.id).toBe(user.id)
      const users = await UserModel.index()
      expect(users.length).toBe(1)
    })
  })


  describe('Authentication Module', () => {
    describe('Test method exists', () => {
      it('should have a authenticate User method', () => {
        expect(UserModel.authenticate).toBeDefined();
      });
    });
  
    describe('Test Authenticate logic', () => {
      const user = {
        email: 'test@test.com',
        username: 'test',
        password: 'test',
      } as User;
  
      beforeAll(async () => {
        const createUser = await UserModel.create(user);
        user.id = createUser.id;
      });
  
      afterAll(async () => {
        const conn = await db.connect();
  
        const sql = 'DELETE FROM users;';
        await conn.query(sql);
        conn.release();
      });
  
      it('Authenticate method should return the authenticated user', async () => {
        const authenticatedUser = await UserModel.authenticate(
          user.email,
          user.password as string
        );
  
        expect(authenticatedUser?.email).toBe(user.email);
        expect(authenticatedUser?.username).toBe(user.username);
      });
  
      it('Authenticate method should return null for wrong credentials', async () => {
        const authenticatedUser = await UserModel.authenticate(
          'xxxx@wrong.com',
          'xxxxx'
        );
        expect(authenticatedUser).toBe(null);
      });
    });
});
})
