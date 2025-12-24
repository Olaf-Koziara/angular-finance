import request from "supertest";
import { createApp } from "../app";
import { prisma } from "../config/database";

const app = createApp();

function isoDateForMonthOffset(monthOffset: number, day = 15): string {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() + monthOffset, day, 12, 0, 0, 0);
  return date.toISOString();
}

describe("Transaction Statistics Endpoint", () => {
  beforeAll(async () => {
    await prisma.refreshToken.deleteMany({});
    await prisma.transaction.deleteMany({});
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.refreshToken.deleteMany({});
    await prisma.transaction.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  it("should return dashboard statistics for the authenticated user", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        email: "stats-test@example.com",
        password: "Test1234",
        name: "Stats Test",
      })
      .expect(201);

    const token: string = registerResponse.body.data.accessToken;

    // Seed a few transactions across current and previous month
    await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Prev month salary",
        amount: 2000,
        category: "Other",
        date: isoDateForMonthOffset(-1, 10),
        type: "income",
      })
      .expect(201);

    await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Prev month groceries",
        amount: 500,
        category: "Food",
        date: isoDateForMonthOffset(-1, 12),
        type: "expense",
      })
      .expect(201);

    await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Current month salary",
        amount: 3000,
        category: "Other",
        date: isoDateForMonthOffset(0, 10),
        type: "income",
      })
      .expect(201);

    await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Current month groceries",
        amount: 1200,
        category: "Food",
        date: isoDateForMonthOffset(0, 12),
        type: "expense",
      })
      .expect(201);

    const response = await request(app)
      .get("/api/transactions/statistics?months=2")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty("financialSummary");
    expect(response.body).toHaveProperty("monthlyData");
    expect(response.body).toHaveProperty("budgetCategories");
    expect(response.body).toHaveProperty("trends");
    expect(response.body).toHaveProperty("alerts");
    expect(response.body).toHaveProperty("topCategories");

    expect(response.body.financialSummary.income).toBe(3000);
    expect(response.body.financialSummary.expenses).toBe(1200);
    expect(response.body.financialSummary.balance).toBe(3300);
    expect(Array.isArray(response.body.alerts)).toBe(true);
    expect(response.body.alerts.length).toBeGreaterThanOrEqual(1);

    expect(response.body.topCategories.expense).toEqual({ category: "Food", amount: 500 });
    expect(response.body.topCategories.income).toEqual({ category: "Other", amount: 2000 });

    const balanceTrend = response.body.trends.find(
      (t: any) => t.label === "DASHBOARD.BALANCE_CHANGE"
    );
    expect(balanceTrend).toBeDefined();
    expect(balanceTrend.value).toBe(1800); // 3000 - 1200
  });
});


