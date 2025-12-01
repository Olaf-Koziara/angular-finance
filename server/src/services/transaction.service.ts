import { Prisma } from "@prisma/client";
import { prisma } from "../config/database";
import {
  CreateTransactionInput,
  QueryTransactionInput,
} from "../validators/transaction.validator";

export class TransactionService {
  async create(userId: string, data: CreateTransactionInput) {
    const transaction = await prisma.transaction.create({
      data: {
        ...data,
        userId,
        amount: new Prisma.Decimal(data.amount),
        date: new Date(data.date),
      },
    });
    return {
      ...transaction,
      amount: transaction.amount.toNumber(),
    };
  }

  async update(userId: string, id: string, data: CreateTransactionInput) {
    const transaction = await prisma.transaction.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        ...data,
        amount: new Prisma.Decimal(data.amount),
        date: new Date(data.date),
      },
    });
    
    if (transaction.count === 0) {
      throw new Error('Transaction not found or unauthorized');
    }
    
    const updatedTransaction = await prisma.transaction.findFirst({
      where: { id, userId },
    });
    
    return {
      ...updatedTransaction!,
      amount: updatedTransaction!.amount.toNumber(),
    };
  }

  async findAll(userId: string, query: QueryTransactionInput) {
    const { page, limit, search, type, categories, sortBy, sortOrder } = query;
    const categoriesParam = query["categories[]"] || categories;

    const where: Prisma.TransactionWhereInput = {
      userId,
    };

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (type && type !== "all") {
      where.type = type;
    }

    if (categoriesParam) {
      const categoryList = Array.isArray(categoriesParam)
        ? categoriesParam
        : [categoriesParam];

      if (categoryList.length > 0) {
        where.category = {
          in: categoryList,
        };
      }
    }

    const [total, items] = await Promise.all([
      prisma.transaction.count({ where }),
      prisma.transaction.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder ?? "asc",
        },
      }),
    ]);

    return {
      items: items.map((item) => ({
        ...item,
        amount: item.amount.toNumber(),
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async delete(userId: string, id: string) {
    return prisma.transaction.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }

  async findOne(userId: string, id: string) {
    return prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });
  }
}

export const transactionService = new TransactionService();
