import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  useEffect(() => {
    let filtered = [...countries];
    filtered = filtered.filter((country) => {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredResults(filtered);
  }, [search, countries]); // Run whenever search change

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const SingleCountry = ({ filteredResults }) => {
    console.log(filteredResults);
    return (
      <div>
        <h1>{filteredResults.name.common}</h1>
        <p>Capital: {filteredResults.capital}</p>
        <p>Area: {filteredResults.area}</p>
        <h2>Languages: </h2>
        <ul>
          {Object.entries(filteredResults.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={filteredResults.flags.png} alt="country flag" />
      </div>
    );
  };

  const DisplayResults = ({ filteredResults }) => {
    if (filteredResults.length === 1) {
      return <SingleCountry filteredResults={filteredResults[0]} />;
    } else if (filteredResults.length > 10) {
      return <p>Too many results, type more filters</p>;
    } else {
      return filteredResults.map((item) => <p key={item.ccn3}>{item.name.common}</p>);
    }
  };

  return (
    <div className="App">
      find countries <input onChange={handleSearch} />
      <DisplayResults filteredResults={filteredResults} />
    </div>
  );
}

export default App;
