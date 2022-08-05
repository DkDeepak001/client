import React, { useState } from 'react';

function Left(props) {
  const [city,setCity] = useState("");

  function updateCity(e){
    setCity(e.target.value);
  }
  return (
    <div className='container'>
      <input type="text" onChange={updateCity} value={city}></input>
      <button onClick={() => props.changeCity(city)}>Check</button>
    </div>
  )
}

export default Left