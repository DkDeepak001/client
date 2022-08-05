import React, { useEffect, useState } from 'react';

function Clock() {
    const [date,setDate] = useState(new Date().toLocaleString());

  useEffect(() =>{
        setInterval(()=>{
            const newDate = new Date().toLocaleString();
            setDate(newDate);
        },1000)
     },[date])  

  return (
    <h5>{date}</h5>
  )
}

export default Clock