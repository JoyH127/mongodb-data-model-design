const db = require("../db");
const book = require("../models/book");
const Publisher = require("../models/publisher");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const main = async () => {
  const penguinBooks = await Publisher.find({ name: "Penguin Books" });
  const harperCollins = await Publisher.find({ name: "HarperCollins" });
  const books = [
    {
      title: "The Power of Now",
      author: "Eckhart Tolle",
      published_date: "2005",
      publisher_id: penguinBooks[0]._id,
    },
    {
      title: "Zen and the Art of Motorcycle Maintenance",
      author: "Robert M. Pirsig",
      published_date: "1999",
      publisher_id: harperCollins[0]._id,
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      published_date: "1988",
      publisher_id: harperCollins[0]._id,
    },
  ];
  await book.insertMany(books);
  console.log("Created books with publishers!");
};

const run = async () => {
  await main();
  db.close();
};

run();
