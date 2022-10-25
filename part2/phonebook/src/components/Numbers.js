import axios from "axios";

const Numbers = ({ personsToShow }) => {
  const handleDelete = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      axios.delete(`/api/persons/${person.id}`);
    }
  };
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map((el) => (
        <p key={el.name}>
          {el.name} - {el.number}
          <span>
            <button onClick={() => handleDelete(el)}>Delete</button>
          </span>
        </p>
      ))}
    </div>
  );
};

export default Numbers;
