import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import phoneService from "./services/phones";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    phoneService.getAll().then((phoneNumbers) => setPersons(phoneNumbers));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = persons.find((p) => p.name === newName);

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (found) {
      if (
        window.confirm(
          `${found.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        phoneService
          .update(found.id, personObject)
          .then((newPhone) =>
            persons.map((person) => (person.id !== found.id ? person : newPhone))
          );
      }
    } else if (newName === "" || newNumber === "") {
      alert("Fields can't be empty");
    } else {
      phoneService.create(personObject).then((newPerson) => setPersons(persons.concat(newPerson)));
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
