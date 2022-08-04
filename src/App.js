import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Left from './components/left/Left';
import './App.css'

function App() {

  const [data,setData] = useState();
  const [city,setCity] = useState("");
  const [name ,setName] = useState();
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
          const req = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&appid=0050554df76069000b6244f23bb336fd`)
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
        const req = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0050554df76069000b6244f23bb336fd`);
        setData(req.data);
        setWeather({
          name: req.data.city.name,
          weather:req.data.list

        })
        return
      }  
      
      
    }
    console.log(weather.weather);
    getData()
  },[city])
  console.log(weather.weather.map((e) => e.weather[0].main));
  return (
    <div className='main-container'>
      <Left changeCity={(name => setCity(name))}/>
      <div className='right-container'>
    <h2>{weather.name}</h2>

    </div>
    </div>

  )
}

export default App