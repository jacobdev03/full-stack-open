import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = persons.find((p) => p.name === newName);

    if (found) {
      alert(`${found.name} is already added to phonebook`);
    } else if (newName === "" || newNumber === "") {
      alert("Fields can't be empty");
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
    }
  };

  const handleChange = (event) => {
    setShowAll(true);
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    event.preventDefault();
    const filterName = event.target.value;

    if (filterName !== "") {
      setShowAll(false);
      setNewName(filterName.toLocaleLowerCase());
    } else {
      setShowAll(true);
    }
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) => person.name.toLocaleLowerCase().startsWith(newName));

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
      />
      <Numbers personsToShow={personsToShow} />
    </div>
  );
};

export default App;
