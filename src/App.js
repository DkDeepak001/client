import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Left from './components/left/Left';
import './App.css';
import sunnyImg from './components/images/raimond-klavins-iyO88eEUKec-unsplash (1).jpg'
import code200 from "./components/images/tasos-mansour-_hGPdpyMV-8-unsplash.jpg";
import code300 from "./components/images/hafidh-satyanto-UytSb_a2YE0-unsplash.jpg";
import code500 from "./components/images/natsuki-4DsowKunk84-unsplash.jpg";
import code600 from "./components/images/federico-bottos-vOrTxzT5KCo-unsplash.jpg";
import code701 from  "./components/images/goran-vucicevic-EuuIa8XTLK4-unsplash.jpg";
import code711 from "./components/images/daniel-gregoire-hZe5eOlvqDk-unsplash.jpg";
import code721 from "./components/images/paul-earle-l98YXp1X8dA-unsplash.jpg";
import code731 from "./components/images/noaa-vh45wCZMRyA-unsplash.jpg";
import code741 from "./components/images/jakub-kriz-arOyDPUAJzc-unsplash.jpg";
import code800 from "./components/images/raimond-klavins-a-Xz1GNZDa8-unsplash.jpg";
import code801 from "./components/images/lukasz-lada-q7z-AUlHPaw-unsplash.jpg";
import codeDefault from "./components/images/raimond-klavins-iyO88eEUKec-unsplash (1).jpg";
import Clock from './components/clock';
import swal from 'sweetalert';
import {motion} from 'framer-motion';
function App() {

  const [data, setData] = useState();
  const [city, setCity] = useState("");
  const [name, setName] = useState();
  const [currentDate , setCurrentDate] = useState();
  const [currentWeather, setCurrentWeather] = useState({
    name: "",
    temp: "",
    icon: "",
    code:""
  });
  const [weather, setWeather] = useState({
    name: "",
    weather: []

  })
  const [bgImg,setBgImg]  = useState();



  useEffect(() => {
    const getData = async () => {
      if (city === "") {
        navigator.geolocation.getCurrentPosition(success, error);
        async function success(pos) {
         try {
          const crd = pos.coords;
          const req = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&cnt=8&appid=0050554df76069000b6244f23bb336fd`)
          const currentData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&&appid=0050554df76069000b6244f23bb336fd`)
          setCurrentWeather({
            name: currentData.data.weather[0].main,
            temp: currentData.data.main.temp,
            icon: currentData.data.weather[0].icon,
            code:currentData.data.weather[0].id
          })
          setData(req.data);
          setWeather({
            name: req.data.city.name,
            weather: req.data.list
          })
          return
         }catch (err) {
          if(err.response.status ==404){
           swal("Error!", "Please enter the correct Location!", "error");
         }  
          
         }
        }

        function error(err) {
          alert("please enable location access to get current data");
        }
      } else {
        try {
          const req = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=8&appid=0050554df76069000b6244f23bb336fd`);
        const currentData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0050554df76069000b6244f23bb336fd`)
        setCurrentWeather({
          name: currentData.data.weather[0].main,
          temp: currentData.data.main.temp,
          icon: currentData.data.weather[0].icon,
          code:currentData.data.weather[0].id
        })
        setData(req.data);
        setWeather({
          name: req.data.city.name,
          weather: req.data.list

        })
        return
        } catch (err) {
         if(err.response.status ==404){
          swal("Error!", "Please enter the correct Location!", "error");
        }           
        }       
      }
    }
    getData();
  }, [city])



function Display(){
  return(
    <motion.div  className='right-container-bg'  animate={{opacity:1}} initial={{opacity:.2}} transition={{duration:.5}}>
        <img src={currentWeather.code <=200 ? code200 :(currentWeather.code <= 300 ? code300 : (currentWeather.code <=500 ? code500 :(currentWeather.code <= 600 ? code600 : (currentWeather.code === 701 ? code701 : (currentWeather.code === 711 ? code711 : (currentWeather.code === 721 ? code721 : (currentWeather.code === 731 ? code731 : (currentWeather.code === 741 ? code741 : (currentWeather.code === 800 ? code800:(currentWeather.code <= 801 || currentWeather.code <= 804 ? code801 :codeDefault))))))))))   }></img>
      </motion.div>
  )
}

function AnimationRight(){
  return(
    <motion.div className='right-container-text' animate={{opacity:1,y:0}} initial={{opacity:0 ,y:-50}} transition={{duration:.8}}>
          <div className='degree'>
            <h1 >{(currentWeather.temp - 273.5).toFixed(1)} </h1>
            <h2 > °C</h2>
          </div>
          <div className='location'>
            <h3>{weather.name}</h3>
            <Clock />
          </div>
          <div className='forecast'>
            <img src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}></img>
            <h2>{currentWeather.name}</h2>
          </div>
        </motion.div>
  )
}

function LeftAnim(){
  return(
    <motion.div className='left-container-align' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8}}>
      <Left changeCity={(name => setCity(name))} />
      <div className='left-container-forecastData-container'>
          <motion.h2 className='left-container-forecastData-heading' initial={{y:-10,opacity:.5}} animate={{ y:0,opacity:1}} transition={{duration:.5}}> forecast of {weather.name} next few hours</motion.h2>
          <div className='left-container-forecastData'>
          <ul>
            {weather.weather.map((e, index) => (new Date()) <= (new Date(e.dt_txt)) ?
              <motion.div key={index} className="forecast-single-container" initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:1}}>
              <img src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`}></img>
              <h2>{(e.main.temp - 273.5).toFixed(1)}°C</h2>
              <h4>{e.weather[0].main}</h4>
              <h5>{ new Date(e.dt_txt).toLocaleTimeString()}</h5>
              </motion.div> : <> </>
            )}
          </ul>
          </div>
        </div>
    </motion.div>
  )
}

  
  return (
    <div className='main-container'>

     <Display />
      <div className='left-container'>
       <LeftAnim />
      </div>
      <div className='right-container'>
      <AnimationRight />
      </div>
    </div>

  )
}

export default App