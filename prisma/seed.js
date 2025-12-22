/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv/config");

const { PrismaClient } = require("../lib/generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const transactions = require("./scripts/mock-data.json");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const userId = "cmjbra4e900004svtbnh9cqdc";

    // cache to avoid duplicate category queries
    const categoryCache = new Map();

    for (const tx of transactions) {
        let categoryId = null;

        if (tx.category) {
            if (categoryCache.has(tx.category)) {
                categoryId = categoryCache.get(tx.category);
            } else {
                const category =
                    (await prisma.category.findFirst({
                        where: { userId, name: tx.category },
                    })) ??
                    (await prisma.category.create({
                        data: { userId, name: tx.category },
                    }));

                categoryCache.set(tx.category, category.id);
                categoryId = category.id;
            }
        }

        await prisma.transaction.create({
            data: {
                userId,
                amount: tx.amount,
                date: new Date(tx.date),
                description: tx.description,
                type: tx.type,
                recurring: tx.recurring ?? false,
                categoryId,
            },
        });
    }

    console.log("✅ Categories + Transactions seeded correctly");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
