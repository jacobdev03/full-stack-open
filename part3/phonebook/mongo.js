const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://jacobdev03:${password}@cluster0.2g1v6jy.mongodb.net/phoneBookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument: node mongo.js <password>");
  process.exit(1);
} else if (process.argv.length === 3) {
  mongoose.connect(url).then((result) => {
    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(person);
      });
      mongoose.connection.close();
    });
  });
} else {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");
      const person = new Person({
        name: `${process.argv[3]}`,
        number: `${process.argv[4]}`,
      });
      person.save().then((result) => {
        console.log(`added ${person.name} number ${person.number} to phonebook`);
        mongoose.connection.close();
      });
    })
    .catch((err) => console.log(err));
}
