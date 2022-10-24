import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import phoneService from "./services/phones";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notiMessage, setNotiMessage] = useState(null);

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
        setNotiMessage(`Replaced number`);
        setTimeout(() => {
          setNotiMessage(null);
        }, 2000);
      }
    } else if (newName === "" || newNumber === "") {
      alert("Fields can't be empty");
    } else {
      phoneService
        .create(personObject)
        .then((newPerson) => setPersons(persons.concat(newPerson)))
        .catch((error) => {
          setErrorMessage(error.response.data.error);
        });
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
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
      <Notification message={notiMessage} />
      <ErrorMessage message={errorMessage} />
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
