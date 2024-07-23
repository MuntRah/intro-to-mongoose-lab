const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const prompt = require("prompt-sync")();

const customer = require("./model");

const username = prompt("What is your name? ");

console.log(`Your name is ${username}`);

function fixed() {
  console.log("the answer is on the top ");
  console.log(`What would you like to do?\n\n1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. quit
`);
}
console.log(`welcome ${username}`);
console.log(`What would you like to do?\n\n1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. quit
`);
let numberOfActions = prompt("Number of action to run: ");

/*-------------------------------- Starter Code --------------------------------*/

const connect = async () => {
  await mongoose.connect(process.env.MONGOOB_URI);

  await runQueries();
  await mongoose.disconnect();

  process.exit();
};

const runQueries = async () => {
  if (numberOfActions === "1") {
    const n = prompt("What is the customers name?");
    const a = prompt("What is the customers age?");
    await createc(n, a);
    fixed();
    numberOfActions = prompt("Number of action to run: ");
    await runQueries();
  } else if (numberOfActions === "2") {
    await View();
    fixed();
    numberOfActions = prompt("Number of action to run: ");
    await runQueries();
  } else if (numberOfActions === "3") {
    await View();
    const idNum = prompt("choose one of the ids : ");
    const n = prompt("What is the customers name?");
    const a = prompt("What is the customers age?");
    await updateCust(idNum, n, a);
    fixed();
    numberOfActions = prompt("Number of action to run: ");
    await runQueries();
  } else if (numberOfActions === "4") {
    await View();
    const idNum = prompt("choose one of the ids : ");
    await Delete(idNum);
    fixed();
    numberOfActions = prompt("Number of action to run: ");
    await runQueries();
  } else if (numberOfActions === "5") {
    console.log("exit");
    await mongoose.disconnect();
    process.exit();
  }
};

/*-------------------------------- Query Functions --------------------------------*/

const createc = async (n, a) => {
  const solveSchema = {
    name: n,
    age: a,
  };

  const customerA = await customer.create(solveSchema);
};
const View = async () => {
  const solveSchema = await customer.find({});
  solveSchema.forEach((n) => {
    console.log(`id : ${n._id} - name : ${n.name} - age : ${n.age}`);
  });
};
const updateCust = async (idNum, n, a) => {
  const updateCustomer = await customer.findByIdAndUpdate(
    idNum,
    { name: n, age: a },
    { new: true }
  );
  console.log("Updated customer:", updateCustomer);
  console.log(a);
};
const Delete = async (idNum) => {
  const id = idNum;
  const removed = await customer.findByIdAndDelete(id);
  console.log("Removed customer:", removed);
};

connect();
