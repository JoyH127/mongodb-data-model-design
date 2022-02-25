//CRUD actions
const db = require("./db");
const Publisher = require("./models/publisher");
const Book = require("./models/book");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const findBook = async () => {
  const thePowerOfNow = await Book.find({ title: "The Power of Now" });
  console.log(thePowerOfNow);
};

const createBook = async () => {
  const penguinBooks = await Publisher.find({ name: "Penguin Books" });
  const aNewEarthBook = new Book({
    title: "A New Earth",
    author: "Eckhart Tolle",
    published_date: "2005",
    publisher_id: penguinBooks[0]._id,
  });
  await aNewEarthBook.save();
  console.log("Created book:", aNewEarthBook);
};

const updateBook = async () => {
  const updated = await Book.updateOne(
    { title: "A New Earth" },
    { title: "A New Earth: Awakening to Your Life's Purpose" }
  );
  console.log(updated);
};

const deleteBook = async () => {
  const deleted = await Book.deleteOne({ title: "A New Earth" });
  console.log(deleted);
};

const run = async () => {
  //   await findBook();
  //   await createBook();
  await updateBook();
  // await deleteBook()
  db.close();
};

run();
