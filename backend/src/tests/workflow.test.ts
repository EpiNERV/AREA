import request from 'supertest';
import app, { connectDB } from '../app'; // Assuming your Express app is exported from app.ts
import { closeDatabase, clearDatabase } from "./dbSetup";

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

const registerUser = (email?: string, password?: string, username?: string) => {
    return request(app)
      .post("/api/v1/user/auth/register")
      .send({
        email: email ?? "admin124@area.local",
        password: password ?? "password123",
        username: username ?? "rftgyhujiko",
    });
};

const createWorkflow = (name: string, token: string) => {
    return request(app)
      .post("/api/v1/workflow")
      .send({ name })
      .set("Authorization", `Bearer ${token}`);
}

describe('Workflow API', () => {
  let userToken: string;

  beforeEach(async () => {
    const response = await registerUser();
    userToken = response.body.tokens.access_token;
  });

  afterEach(async () => {
    await clearDatabase();
  });

  it('should create a new workflow', async () => {
    const res = await createWorkflow("New Workflow", userToken);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('New Workflow');
  });

  it('should not create a new workflow without a name', async () => {
    const res = await request(app)
      .post('/api/v1/workflow')
      .send({})
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Workflow name is required');
  });

  it('should fetch all workflows', async () => {

    await createWorkflow("Workflow 1", userToken);
    await createWorkflow("Workflow 2", userToken);

    const res = await request(app)
      .get('/api/v1/workflow')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it('should update an existing workflow', async () => {
    const workflow = await createWorkflow("Old Workflow", userToken);

    const res = await request(app)
      .put(`/api/v1/workflow/${workflow.body._id}`)
      .send({ name: 'Updated Workflow' })
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Workflow');
  });

  it('should not update a non-existing workflow', async () => {
    const res = await request(app)
      .put('/api/v1/workflow/aaaaaaaaaaaaaaaaaaaaaaaa')
      .send({ name: 'Updated Workflow' })
      .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Workflow not found');
  });

  it('should not update a workflow with an invalid ID', async () => {
    const res = await request(app)
      .put('/api/v1/workflow/invalid_id')
      .send({ name: 'Updated Workflow' })
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid workflow ID');
  });

  it('should delete a workflow', async () => {
    const workflow = await createWorkflow("Delete Me", userToken);

    const res = await request(app)
      .delete(`/api/v1/workflow/${workflow.body._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(204);
  });

  it('should not delete a non-existing workflow', async () => {
    const res = await request(app)
      .delete('/api/v1/workflow/aaaaaaaaaaaaaaaaaaaaaaaa')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Workflow not found');
  });

  it('should not delete a workflow with an invalid ID', async () => {
    const res = await request(app)
      .delete('/api/v1/workflow/invalid_id')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid workflow ID');
  });
});
