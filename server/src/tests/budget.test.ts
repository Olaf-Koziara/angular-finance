import request from 'supertest';
import { createApp } from '../app';
import { prisma } from '../config/database';

const app = createApp();

describe('Budget Endpoints', () => {
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    await prisma.budget.deleteMany({});
    await prisma.transaction.deleteMany({});
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});

    // Create a test user and get auth token
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'budget-test@example.com',
        password: 'Test1234',
        name: 'Budget Test User',
      });

    authToken = registerResponse.body.data.accessToken;
    userId = registerResponse.body.data.user.id;
  });

  afterAll(async () => {
    await prisma.budget.deleteMany({});
    await prisma.transaction.deleteMany({});
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  describe('POST /api/budgets', () => {
    it('should create a new budget successfully', async () => {
      const budgetData = {
        generalBudget: 5000,
        categoryBudgets: {
          Food: 500,
          Transport: 300,
          Housing: 1500,
        },
      };

      const response = await request(app)
        .post('/api/budgets')
        .set('Authorization', `Bearer ${authToken}`)
        .send(budgetData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.generalBudget).toBe(5000);
      expect(response.body.categoryBudgets).toHaveProperty('Food');
      expect(response.body.categoryBudgets).toHaveProperty('Transport');
      expect(response.body.categoryBudgets).toHaveProperty('Housing');
      expect(response.body.categoryBudgets.Food).toBe(500);
      expect(response.body.categoryBudgets.Transport).toBe(300);
      expect(response.body.categoryBudgets.Housing).toBe(1500);
    });

    it('should fail to create budget without authentication', async () => {
      const budgetData = {
        generalBudget: 5000,
        categoryBudgets: {},
      };

      await request(app)
        .post('/api/budgets')
        .send(budgetData)
        .expect(401);
    });

    it('should fail to create budget with negative general budget', async () => {
      const budgetData = {
        generalBudget: -1000,
        categoryBudgets: {},
      };

      const response = await request(app)
        .post('/api/budgets')
        .set('Authorization', `Bearer ${authToken}`)
        .send(budgetData)
        .expect(400);

      expect(response.body.message).toContain('non-negative');
    });

    it('should fail to create duplicate budget', async () => {
      const budgetData = {
        generalBudget: 3000,
        categoryBudgets: {},
      };

      await request(app)
        .post('/api/budgets')
        .set('Authorization', `Bearer ${authToken}`)
        .send(budgetData)
        .expect(500);
    });
  });

  describe('GET /api/budgets', () => {
    it('should get user budget successfully', async () => {
      const response = await request(app)
        .get('/api/budgets')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('generalBudget');
      expect(response.body).toHaveProperty('categoryBudgets');
      expect(typeof response.body.categoryBudgets).toBe('object');
      expect(Array.isArray(response.body.categoryBudgets)).toBe(false);
    });

    it('should fail to get budget without authentication', async () => {
      await request(app)
        .get('/api/budgets')
        .expect(401);
    });
  });

  describe('PUT /api/budgets/general', () => {
    it('should update general budget successfully', async () => {
      const response = await request(app)
        .put('/api/budgets/general')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ amount: 6000 })
        .expect(200);

      expect(response.body.generalBudget).toBe(6000);
    });

    it('should fail with negative amount', async () => {
      const response = await request(app)
        .put('/api/budgets/general')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ amount: -500 })
        .expect(400);

      expect(response.body.message).toContain('non-negative');
    });

    it('should fail without authentication', async () => {
      await request(app)
        .put('/api/budgets/general')
        .send({ amount: 7000 })
        .expect(401);
    });
  });

  describe('PUT /api/budgets/category', () => {
    it('should update existing category budget', async () => {
      const response = await request(app)
        .put('/api/budgets/category')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ category: 'Food', amount: 700 })
        .expect(200);

      expect(response.body.categoryBudgets.Food).toBe(700);
    });

    it('should create new category budget if not exists', async () => {
      const response = await request(app)
        .put('/api/budgets/category')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ category: 'Entertainment', amount: 400 })
        .expect(200);

      expect(response.body.categoryBudgets.Entertainment).toBeDefined();
      expect(response.body.categoryBudgets.Entertainment).toBe(400);
    });

    it('should fail with invalid data', async () => {
      await request(app)
        .put('/api/budgets/category')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ category: '', amount: 100 })
        .expect(400);
    });

    it('should fail without authentication', async () => {
      await request(app)
        .put('/api/budgets/category')
        .send({ category: 'Food', amount: 800 })
        .expect(401);
    });
  });

  describe('PUT /api/budgets', () => {
    it('should update entire budget successfully', async () => {
      const updateData = {
        generalBudget: 7000,
        categoryBudgets: {
          Food: 600,
          Transport: 400,
          Utilities: 250,
        },
      };

      const response = await request(app)
        .put('/api/budgets')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.generalBudget).toBe(7000);
      expect(response.body.categoryBudgets.Food).toBe(600);
      expect(response.body.categoryBudgets.Transport).toBe(400);
      expect(response.body.categoryBudgets.Utilities).toBe(250);
    });

    it('should update only general budget', async () => {
      const response = await request(app)
        .put('/api/budgets')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ generalBudget: 8000 })
        .expect(200);

      expect(response.body.generalBudget).toBe(8000);
    });

    it('should fail without authentication', async () => {
      await request(app)
        .put('/api/budgets')
        .send({ generalBudget: 9000 })
        .expect(401);
    });
  });

  describe('DELETE /api/budgets', () => {
    it('should delete budget successfully', async () => {
      await request(app)
        .delete('/api/budgets')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);

      // Verify budget is deleted
      const response = await request(app)
        .get('/api/budgets')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('should fail to delete non-existent budget', async () => {
      await request(app)
        .delete('/api/budgets')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('should fail without authentication', async () => {
      await request(app)
        .delete('/api/budgets')
        .expect(401);
    });
  });
});






