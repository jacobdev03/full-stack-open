const Form = ({ handleSubmit, handleChange, handleNumberChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new</h2>
      <div>
        <div>
          name: <input onChange={handleChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
