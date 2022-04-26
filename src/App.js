import './App.css';
import { Suspense, useEffect, useState } from "react";
import vec from "./Vector.png";
import Weather from "./weather";
import searchIcon from './static/search-interface-symbol.png';
import { Canvas } from '@react-three/fiber';
import Model from './Model'
import { OrbitControls } from '@react-three/drei';
function App() {

  const [input, setInput] = useState('');
  const [coord, setCoord] = useState({ lat: 0, long: 0 })
  const [weather, setWeather] = useState([1, 2, 3, 4])
  const [currentWeather, setCurrentWeather] = useState(null);
  let dateNow = new Date(currentWeather ? (currentWeather.dt * 1000) : 0);
  const searchLocation = () => {
    console.log(input);
    let url = "https://api.openweathermap.org/geo/1.0/direct?q=" + input + "&limit=5&appid=5e532fb5655cf4c4f0e3d2a54be74067";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCoord({
          lat: data[0].lat,
          long: data[0].lon
        });
      })
  }
  const handleChange = (event) => {
    setInput(event.target.value);
  }

  useEffect(() => {

    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + coord.lat + "&lon=" + coord.long + "&appid=5e532fb5655cf4c4f0e3d2a54be74067")
      .then(res => res.json())
      .then(data => {
        setCurrentWeather(data);
        console.log(data);
      })
      .then(() => console.log(currentWeather))
      .catch(e => console.log(e));

    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + coord.lat + "&lon=" + coord.long + "&appid=5e532fb5655cf4c4f0e3d2a54be74067")
      .then(res => res.json())
      .then(data => {
        let z = data.city.timezone;
        let list = [];
        data.list.forEach((e) => {
          let objWeather = {
            temp: e.main.temp,
            time: e.dt + z,
            description: e.weather[0].main
          }
          list.push(objWeather);
        })
        setWeather(list);
        console.log(weather);
      })
      .catch(e => console.log(e))
  }, [coord]
  )

  const [toggle, setToggle] = useState(true);
  const [unit, setUnit] = useState(true);

  useEffect(() => {
    toggle ? setUnit('°C') : setUnit('°F')
  }, [toggle])

  let date = new Date();

  return (weather === [1, 2, 3, 4] || currentWeather === null) ? (<div />) : (
    <div className="App">
      <div className={"App-header"}>
        <div className="input">
          <div className="logodiv">
            <img src={vec} className="logo" />
            <p className="name">Weather</p>
          </div>
          <input onChange={(event) => handleChange(event)} className="textin"
            placeholder="Search city..." />
          <button className="Search" onClick={() => searchLocation()}><img className="searchIcon"
            src={searchIcon} /></button>
          <button
            className={toggle ? "cel-clicked" : "cel"}
            onClick={() => {
              setToggle(true);

            }}>°C
          </button>
          <button
            className={toggle ? "far" : "far-clicked"}
            onClick={() => {
              setToggle(false);
            }}>°F
          </button>
        </div>

      </div>
      <div className="main">
        <div className="stats">
          <h1>{currentWeather.name}</h1>
          <p>{date.toLocaleString('en-US', { weekday: "long" }) + date.toLocaleDateString()}</p>
          <h1 className="currentTemp">
            {toggle ? (parseFloat(currentWeather.main.temp) - 273).toFixed(0)
              : ((parseFloat(currentWeather.main.temp) - 273) * 9 / 5 + 32).toFixed(0)}
            {unit}
          </h1>
        </div>
        <div className="list">
          <Weather
            temp={
              toggle ? (parseFloat(weather[0].temp) - 273).toFixed(0)
                : ((parseFloat(weather[0].temp) - 273) * 9 / 5 + 32).toFixed(0)}
            time={weather[0].time}
            unit={unit}
            description={weather[0].description}
          />
          <Weather
            temp={toggle ? (parseFloat(weather[1].temp) - 273).toFixed(0)
              : ((parseFloat(weather[1].temp) - 273) * 9 / 5 + 32).toFixed(0)}
            time={weather[1].time}
            unit={unit}
            description={weather[1].description} />
          <Weather
            temp={toggle ? (parseFloat(weather[2].temp) - 273).toFixed(0)
              : ((parseFloat(weather[2].temp) - 273) * 9 / 5 + 32).toFixed(0)}
            time={weather[2].time}
            unit={unit}
            description={weather[2].description} />
          <Weather
            temp={toggle ? (parseFloat(weather[3].temp) - 273).toFixed(0)
              : ((parseFloat(weather[3].temp) - 273) * 9 / 5 + 32).toFixed(0)}
            time={weather[3].time}
            unit={unit}
            description={weather[3].description} />
        </div>
      </div>
      <div className="current">
        <h2 className="now">Now</h2>
        <div className="current-container">
          <div className={"current-attributes"}>
            <p className={"white-text"}>Feels like</p>
            <p className={"attributes"}>{
              toggle ? (parseFloat(currentWeather.main.feels_like) - 273).toFixed(0)
                : ((parseFloat(currentWeather.main.feels_like) - 273) * 9 / 5 + 32).toFixed(0)}{unit}</p>
          </div>
          <div className={"current-attributes"}>
            <p className={"white-text"}>Humidity</p>
            <p className={"attributes"}> {currentWeather.main.humidity}%</p>
          </div>
          <div className={"current-attributes"}>
            <p className={"white-text"}>Wind speed</p>
            <p className="attributes">{(parseFloat(currentWeather.wind.speed) * 1.852).toFixed(0)} km/h</p>
          </div>
          <div className={"current-attributes"}>
            <p className={"white-text"}>Visibility</p>
            <p className="attributes">{currentWeather.visibility} m</p>
          </div>
          <div className={"current-attributes"}>
            <p className={"white-text"}>Pressure</p>
            <p className="attributes">{currentWeather.main.pressure} hPa</p>
          </div>
        </div>

      </div>
      <div className='Earth'>
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 0]} intensity={1} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Canvas>
    </div>
    </div>
  );
}

export default App;
