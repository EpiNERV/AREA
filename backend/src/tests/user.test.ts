import request from 'supertest';
import app, { connectDB } from '../app';
import { closeDatabase, clearDatabase } from './dbSetup';

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

const registerUser = () => {
  return request(app)
    .post('/api/v1/register')
    .send({
      email: 'admin@admin.local',
      password: 'admin',
    });
};

describe('POST /api/v1/auth/register', () => {
  it('should return a 201 status and a user info', async () => {
    const response = await registerUser();
    expect(response.status).toBe(201);
    expect(response.body.user).toBe({
      "email": "admin@admin.local",
      "role": "admin", // It should be 'admin' because it's the first user.
    });
  });
});
