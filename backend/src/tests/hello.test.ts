import request from 'supertest';
import app from '../app';

describe('GET /api/v1/hello', () => {
  it('should return a 200 status and a hello message', async () => {
    const response = await request(app).get('/api/v1/hello');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello World!');
  });
});
