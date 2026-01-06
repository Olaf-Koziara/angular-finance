import OpenAI from "openai";
import { TRANSACTION_CATEGORIES } from "../constants/categories.constant";
import { logger } from "../utils/logger";
import { AppError } from "../utils/errors";

export class AICategoryService {
  private readonly client: OpenAI;
  private readonly model = "gpt-4o-mini";

  constructor() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error("GITHUB_TOKEN environment variable is required");
    }

    this.client = new OpenAI({
      baseURL: 'https://models.github.ai/inference"',
      apiKey: token,
    });
  }

  async suggestCategory(title: string): Promise<string> {
    try {
      logger.info("Requesting AI category suggestion", { title });

      const categories = TRANSACTION_CATEGORIES.join(", ");
      const prompt = `You are a financial transaction categorizer. Given a transaction title, return ONLY ONE category that best matches it.

Available categories: ${categories}

Rules:
- Return ONLY the category name, nothing else
- Choose the most appropriate single category
- If unsure, return "Other"

Transaction title: "${title}"

Category:`;

      const response = await this.client.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: this.model,
        temperature: 0.3,
        max_tokens: 20,
      });

      const suggestedCategory =
        response.choices[0]?.message?.content?.trim() || "Other";

      // Validate that the suggested category is valid
      if (
        !(TRANSACTION_CATEGORIES as readonly string[]).includes(
          suggestedCategory
        )
      ) {
        logger.warn("AI suggested invalid category, defaulting to Other", {
          suggested: suggestedCategory,
          title,
        });
        return "Other";
      }

      logger.info("AI category suggestion successful", {
        title,
        category: suggestedCategory,
      });

      return suggestedCategory;
    } catch (error) {
      logger.error("Failed to get AI category suggestion", {
        error: error instanceof Error ? error.message : "Unknown error",
        title,
      });
      throw new AppError("Failed to get category suggestion from AI");
    }
  }
}

export const aiCategoryService = new AICategoryService();
