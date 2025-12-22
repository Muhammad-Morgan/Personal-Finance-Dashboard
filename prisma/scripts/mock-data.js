/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

// We only use it to get the COUNT (length)
const old = require("./mock-data.json");
const count = Array.isArray(old) ? old.length : 0;

const now = Date.now();
const day = 1000 * 60 * 60 * 24;
const sixMonths = day * 30 * 6;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[rand(0, arr.length - 1)];
}

// Date distribution
function generateDate(index) {
  const pastCount = Math.min(10, count);
  const recentCount = Math.min(50, Math.max(count - pastCount, 0));

  if (index < pastCount) {
    const offset = sixMonths + Math.random() * sixMonths;
    return new Date(now - offset);
  }
  if (index < pastCount + recentCount) {
    const offset = Math.random() * sixMonths;
    return new Date(now - offset);
  }
  const offset = Math.random() * sixMonths;
  return new Date(now + offset);
}

// Categories + descriptions
const expenseCategories = [
  "Groceries",
  "Rent",
  "Utilities",
  "Transport",
  "Dining",
  "Coffee",
  "Shopping",
  "Health",
  "Subscriptions",
  "Entertainment",
  "Education",
  "Travel",
  "Phone & Internet",
  "Gifts",
];

const incomeCategories = [
  "Salary",
  "Freelance",
  "Bonus",
  "Refund",
  "Investment",
  "Gift Received",
];

const descriptionsByCategory = {
  Groceries: [
    "Weekly groceries",
    "Supermarket run",
    "Fresh produce and essentials",
    "Snacks and household items",
  ],
  Rent: ["Monthly rent payment", "Rent transfer", "Apartment rent"],
  Utilities: ["Electricity bill", "Water bill", "Gas bill", "Utility payment"],
  Transport: ["Uber ride", "Bus/metro card top-up", "Fuel refill", "Taxi fare"],
  Dining: ["Lunch with friends", "Dinner out", "Takeaway order"],
  Coffee: ["Coffee and pastry", "Morning coffee", "Cafe visit"],
  Shopping: ["Clothes purchase", "Online shopping order", "New shoes"],
  Health: ["Pharmacy items", "Doctor visit", "Medical checkup"],
  Subscriptions: ["Streaming subscription", "App subscription", "Monthly service fee"],
  Entertainment: ["Movie tickets", "Concert ticket", "Game purchase"],
  Education: ["Online course fee", "Books purchase", "Workshop ticket"],
  Travel: ["Hotel booking", "Flight ticket", "Travel expenses"],
  "Phone & Internet": ["Mobile plan", "Internet bill", "Data top-up"],
  Gifts: ["Gift for a friend", "Birthday present", "Small gift purchase"],

  Salary: ["Monthly salary", "Salary payment received"],
  Freelance: ["Client project payment", "Freelance invoice paid"],
  Bonus: ["Performance bonus", "Team bonus received"],
  Refund: ["Refund from store", "Service refund received"],
  Investment: ["Dividend payout", "Investment return"],
  "Gift Received": ["Gift money received", "Cash gift received"],
};

function makeTransaction(index) {
  // More expenses than incomes (typical)
  const type = Math.random() < 0.75 ? "EXPENSE" : "INCOME";

  const category =
    type === "EXPENSE" ? pick(expenseCategories) : pick(incomeCategories);

  const description = pick(descriptionsByCategory[category] || ["Transaction"]);

  const amount =
    type === "INCOME"
      ? rand(500, 5000) // random income
      : rand(10, 800);  // random expense

  const recurring = Math.random() < 0.5;

  return {
    amount,
    date: generateDate(index).toISOString(), // keep as ISO in JSON
    category,
    type,
    description,
    recurring,
  };
}

const transactions = Array.from({ length: count }, (_, i) => makeTransaction(i));

// Overwrite mock-data.json
fs.writeFileSync(
  path.join(__dirname, "mock-data.json"),
  JSON.stringify(transactions, null, 2)
);

console.log(`✅ mock-data.json replaced with ${transactions.length} transactions`);
