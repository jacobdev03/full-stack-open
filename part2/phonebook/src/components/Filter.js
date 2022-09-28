const Filter = ({ handleFilter }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input onChange={handleFilter} />
    </div>
  );
};

export default Filter;
