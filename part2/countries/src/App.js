import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [weather, setWeather] = useState();

  const api_key = process.env.REACT_APP_API_KEY;

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

  const handleShow = (event) => {
    event.preventDefault();
    const countryName = event.target.parentElement.firstChild.textContent;
    const countryObject = filteredResults.filter((el) => el.name.common === countryName);
    setFilteredResults(countryObject);
  };

  const DisplayWeather = ({ capital }) => {
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
        .then((res) => {
          setWeather(res.data);
          console.log(weather);
        }, []);
    });

    if (!weather) return <p>No weather data</p>;

    return (
      <div>
        <h2>weather in {capital}</h2>
        <p>
          Temperature: {Math.round((weather.main.temp - 273.15 + Number.EPSILON) * 100) / 100}{" "}
          Celsius
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather-icon"
        />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    );
  };

  const SingleCountry = ({ filteredResults }) => {
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
        <DisplayWeather capital={filteredResults.capital} />
      </div>
    );
  };

  const DisplayResults = ({ filteredResults }) => {
    if (filteredResults.length === 1) {
      return (
        <div>
          <SingleCountry filteredResults={filteredResults[0]} />
        </div>
      );
    } else if (filteredResults.length > 10) {
      return <p>Too many results, type more filters</p>;
    } else {
      return filteredResults.map((item, index) => {
        return (
          <p key={index}>
            {item.name.common} <button onClick={handleShow}>Show</button>
          </p>
        );
      });
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
