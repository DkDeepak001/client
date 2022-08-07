import React, { useState } from 'react';
import './left.css';
function Left(props) {
  const [city,setCity] = useState("");

  function updateCity(e){
    setCity(e.target.value);
  }

  
  return (
    <div className='container'>
      {/* <input type="text" onChange={updateCity} value={city}></input>
      <button onClick={() => props.changeCity(city)}>Check</button> */}
      
      <form >
        <input type="text" className="textbox" placeholder="Enter a city to search weather" onChange={updateCity} value={city} />
        <button className="button"  title="Search" onClick={() => {props.changeCity(city);setCity("")}} > <i class="fa fa-search"></i></button>


      </form>
    </div>
  )
}

export default Left