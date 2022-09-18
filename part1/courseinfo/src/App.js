const App = () => {
  const course = "Half Stack application development";
  const parts = [
    { part: "Fundamentals of React", exercise: 10 },
    { part: "Using props to pass data", exercise: 7 },
    { part: "State of a component", exercise: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

const Part = (props) => {
  return <p>{props.name}</p>;
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].part} />
      <Part name={props.parts[1].part} />
      <Part name={props.parts[2].part} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises:{" "}
      {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}
    </p>
  );
};

export default App;
