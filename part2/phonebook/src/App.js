import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => setPersons(res.data));
  }, []);

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
      axios.post("http://localhost:3001/persons", personObject).then((res) => {
        setPersons(persons.concat(res.data));
      });
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
