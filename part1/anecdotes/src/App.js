import { useState } from "react";

const MostVoted = ({ anecdotes, voted }) => {
  const mostVotes = Math.max(...voted);
  const anectodeIndex = voted.indexOf(mostVotes);

  return (
    <div>
      <h1>Anectode with most votes</h1>
      <p>{anecdotes[anectodeIndex]}</p>
      <p>has {voted[anectodeIndex]} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const n = anecdotes.length;
  const points = Array(n).fill(0);

  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length));
  const [voted, setVoted] = useState([...points]);

  const handleRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleVote = () => {
    const copy = [...voted];
    copy[selected] += 1;
    setVoted(copy);
  };

  const mostVotes = Math.max(...voted);
  const anectodeIndex = voted.indexOf(mostVotes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {voted[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleRandom}>Next anectode</button>
      <MostVoted voted={voted} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
