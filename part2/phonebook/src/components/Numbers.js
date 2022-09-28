const Numbers = ({ personsToShow }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map((el) => (
        <p key={el.name}>
          {el.name} - {el.number}
        </p>
      ))}
    </div>
  );
};

export default Numbers;
