import { db } from '@/database/db';
import { user } from '@/database/schema';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { Service } from 'typedi';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[] | any> {
    const users = await db.query.user.findMany({});
    console.log('users', users);
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User[] = await db.select().from(user).where(eq(user.id, userId)).execute();
    if (!findUser.length) throw new HttpException(409, "User doesn't exist");
    return findUser[0];
  }

  public async createUser(userData: User): Promise<User | any> {
    const findUser: User[] = await db.select().from(user).where(eq(user.email, userData.email)).execute();
    console.log('findUser', findUser);
    if (findUser.length > 0) throw new HttpException(409, `This email ${userData.email} already exists`);
    const hashedPassword = await hash(userData.password, 10);
    const [createUserData]: User[] = await db
      .insert(user)
      .values({ ...userData, password: hashedPassword })
      .returning();
    return createUserData;
  }

  public async updateUser(userId: number, userData: User): Promise<User> {
    const findUser: User[] = await db.select().from(user).where(eq(user.id, userId)).execute();
    if (!findUser.length) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await db
      .update(user)
      .set({ ...userData, password: hashedPassword })
      .where(eq(user.id, userId))
      .execute();

    const [updatedUser]: User[] = await db.select().from(user).where(eq(user.id, userId)).execute();
    return updatedUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User[] = await db.select().from(user).where(eq(user.id, userId)).execute();
    if (!findUser.length) throw new HttpException(409, "User doesn't exist");

    await db.delete(user).where(eq(user.id, userId)).execute();
    return findUser[0];
  }
}
