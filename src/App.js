import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Left from './components/left/Left';
import './App.css';
import sunnyImg from './components/images/raimond-klavins-iyO88eEUKec-unsplash (1).jpg'
import rainyBG from './components/images/natsuki-4DsowKunk84-unsplash.jpg';
import Clock from './components/clock'
function App() {

  const [data,setData] = useState();
  const [city,setCity] = useState("");
  const [name ,setName] = useState();
  const [currentWeather, setCurrentWeather] = useState({
    name:"",
    temp:"",
    icon:""
  });
  const [weather ,setWeather] = useState({
    name:"",
    weather:[]

  })
  
  

  useEffect(()=>{

    const getData = async () => {
      if(city === ""){
        navigator.geolocation.getCurrentPosition(success, error);
        async function success(pos) {
          const crd = pos.coords;
          const req = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&cnt=8&appid=0050554df76069000b6244f23bb336fd`)
          const currentData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&&appid=0050554df76069000b6244f23bb336fd`)
          setCurrentWeather({
            name:currentData.data.weather[0].main,
            temp:currentData.data.main.temp,
            icon:currentData.data.weather[0].icon

          })

          setData(req.data);
          setWeather({
            name: req.data.city.name,
            weather:req.data.list
          })
          return
        }
        
        function error(err) {
          alert("please enable location access to get current data");
        }
      }else{
        const req = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=8&appid=0050554df76069000b6244f23bb336fd`);
        const currentData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0050554df76069000b6244f23bb336fd`)
          setCurrentWeather({
            name:currentData.data.weather[0].main,
            temp:currentData.data.main.temp,
            icon:currentData.data.weather[0].icon

          })
        setData(req.data);
        setWeather({
          name: req.data.city.name,
          weather:req.data.list

        })
        return
      }  
      
      
    }
    getData()
  },[city])
  console.log(weather.weather.map((e) => e.weather[0].main));
  console.log(weather.weather);
  console.log(weather.weather.map((e) => e.dt_txt));
  console.log();
  return (
    <div className='main-container'>
        <div className='right-container-bg'>
          <img src={sunnyImg}></img>
        </div>
      <div className='left-container'>
          <Left changeCity={(name => setCity(name))}/>
    <ul>
      {weather.weather.map((e,index) => <div key={index}>
        <p>{e.weather[0].main}</p>
        <p>{(e.main.temp - 273.5).toFixed(2)}</p>
        </div>)}
    </ul>
      </div>
      <div className='right-container'>
        <div className='right-container-text'>
            <div className='degree'>
              <h1>{(currentWeather.temp - 273.5).toFixed(1)} </h1>
              <h2> °C</h2>
            </div>
            <div className='location'>
              <h3>{weather.name}</h3>
              <Clock />
            </div>
            <div className='forecast'>
              <img src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}></img>
            <h2>{currentWeather.name }</h2>
            </div>
        </div>
    </div>
    </div>

  )
}

export default App