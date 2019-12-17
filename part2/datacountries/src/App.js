import React, {useState, useEffect} from 'react';
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])
  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Display countries={countries} filter={filter}/>
    </div>
  );
}
  const Filter = ({filter, setFilter}) => {
    const handleOnFilter = (event) => setFilter(event.target.value)
    return(
      <div>
        Find countries <input value={filter} onChange={handleOnFilter}/>
      </div>
    )
  }
  const Display = ({countries, filter}) => {
    const countriesToShow = countries.filter(country => country.name.toLowerCase().match(filter.toLowerCase()))
    
    console.log(countriesToShow.length)
    if ((countriesToShow.length > 10 )|| (countriesToShow.length === 0)) {
      return(
        <div>Too many matches, specify another filter</div>
      )
    }
    else if ((countriesToShow.length > 1) && (countriesToShow.length <=10)){
      return(
        <CountriesTen countriesToShow={countriesToShow} />
      )
    } 
    else if (countriesToShow.length === 1) {
      return(
        <div>
          <CountryForm country={countriesToShow[0]}/>
        </div>
      )}
  }
  const CountriesTen = ({countriesToShow}) => {
    const Country = ({name}) => <form><div>{name}<button onClick={showCountry}>show</button></div></form>
    const showCountry = (event) => {
      event.preventDefault()
      return(
        <CountryForm country={countriesToShow[0]} />
      )
    }
    return(
      countriesToShow.map(country => <Country key={countriesToShow.indexOf(country)} name={country.name} />)
    )
  }

  const CountryForm = ({country, weather, setWeather}) => {
    const Rows = ({language}) => <li>{language}</li>
    const Languages = ({languages}) => languages.map(language => <Rows key={languages.indexOf(language)} language={language.name} />)

    return(
      <div>
        <h1>{country.name}</h1>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
        <h2>Languages</h2>
        <ul>
          <Languages languages={country.languages} /> 
        </ul>
        <img src={country.flag} alt='flag' width='30%' height='30%'/>
        <Weather capital={country.capital} weather={weather} setWeather={setWeather} />
      </div>
    )
  }
  const Weather = ({capital, weather, setWeather}) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=63879a9b19bc9fa80e75ca0adc836c7e`
    console.log(url)
    useEffect(() => {
      axios
        .get(url)
        .then(response => {
          setWeather(response.data)
        })
    },[])
    console.log(weather)
    return(
      <div>
        <h2>Weather in {capital}</h2>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} width='200%' height='200%' />
      </div>
    )
  }
  /*const icon_url = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`*/
/*        <img src={icon_url} width='200%' height='200%' /> */
export default App;
