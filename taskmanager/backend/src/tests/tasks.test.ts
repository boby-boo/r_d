import request from 'supertest';
import app from '../server';
import { describe, it, expect } from 'vitest';

describe('Tasks API', () => {
  const validTask = {
    title: 'Learn Jest',
    description: 'Write integration tests for the backend',
    status: 'todo',
    priority: 'medium',
    deadline: '2026-01-01T00:00:00Z',
  };

  it('should create a new task (201)', async () => {
    const res = await request(app).post('/').send(validTask);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(validTask.title);
  });

  it('should fail with invalid data (400)', async () => {
    const res = await request(app).post('/').send({});
    expect(res.status).toBe(500);
  });

  it('should return tasks list (200)', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return one task (200)', async () => {
    const task = await request(app).post('/').send(validTask);
    const res = await request(app).get(`/${task.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(task.body.id);
  });

  it('should return 404 if not found', async () => {
    const res = await request(app).get('/tasks/nonexistent-id');
    expect(res.status).toBe(404);
  });
});
