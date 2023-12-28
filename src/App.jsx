import axios from "axios";
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCloudRain, faSun, faWind,faCloudSunRain,faPerson ,faSmog} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

function App() {
  const [search, setSearch] = useState("Delhi");
  const [datas, setDatas] = useState(null);

  //  this is a functuion to canage the shadow color acording to the weather=============
  const color = (a)=>{
    console.log(a);
    if(a == 'Clear'){
    document.getElementById('app_box').style.boxShadow = "inset 0 0 15px 5px #ffc400";
    document.getElementById('app').style.backgroundImage = "url('https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d2VhdGhlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60.jpg')";
    } else if(a == 'Clouds'){
      document.getElementById('app_box').style.boxShadow = "inset 0 0 15px 5px #356578eb"
      document.getElementById('app').style.backgroundImage = "url('https://images.unsplash.com/photo-1562155955-1cb2d73488d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2VhdGhlciUyMGNsb3VkZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60.jpg')";
    } else if(a == 'Rain'){
      document.getElementById('app_box').style.boxShadow = "inset 0 0 15px 5px #0a0b0b"
      document.getElementById('app').style.backgroundImage = "url('https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmFpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60.jpg')";
    }else if(a == 'Haze'){
      document.getElementById('app_box').style.boxShadow = "inset 0 0 20px 5px #929393"
      document.getElementById('app').style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1673081112888-f877c594ad18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2VhdGhlciUyMGhhemV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60.jpg')";

    }
  }

//  fetch teh api data for current weatehr data on the basic of name=========
  const fetchData =  () => {
       axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=a2c92377c31c40e8a0cece995d1037ad`)
      .then((resp)=>{
        setDatas(resp.data);
        // send the weather name to color function===========
        color(resp.data.weather[0].main);
        console.log("resp",resp);
      }).catch((err)=>{
          console.log("err",err);
      })
  }

  //  feth the data from device location=============== 
 const location = ()=>{
     console.log("location");
     navigator.geolocation.getCurrentPosition((pos)=>{
          //  the is api which tack latitudes and longitude to filter the data ==== 
         axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=a2c92377c31c40e8a0cece995d1037ad`)
         .then((resp)=>{
           setDatas(resp.data);
           console.log("fethe the data on the basic of location>",resp.data);
           // send the weather name to color function===========
           color(resp.data.weather[0].main);
         }).catch((err)=>{
             console.log("err",err.message);
         }) 
     });
 }

//   useEffect==============
  useEffect(() => {
    fetchData();
  }, [search]);


  return (
    <div className="App" id="app">
  <div className='box' id="app_box"> 
    <div className='input_box'>
      <div className='input'>
        <input 
          type="search" 
          className='in_box'
          onChange={(e)=>{ setSearch(e.target.value)}} 
          autocomplete="on" />
      </div>
      <div className='icon_box'>
        <FontAwesomeIcon icon={faLocationDot} className='icon'  onClick={location}/>
      </div>
    </div>
    <div className='weather_icon'>
      {datas &&  datas.weather[0].main == 'Rain'?<FontAwesomeIcon icon={faCloudRain} style={{color: "#2c5190"}} className='weather_icon_box'/>:''}
      {datas &&  datas.weather[0].main == 'Clear'?<FontAwesomeIcon icon={faSun}  className='weather_icon_box'/>:''}
      {/* {datas &&  datas.weather[0].main == 'Clouds'?<FontAwesomeIcon icon={faWind} className='weather_icon_box' />:''} */}
      { datas &&  datas.weather[0].main == 'Clouds'?<FontAwesomeIcon icon={faCloudSunRain} className='weather_icon_box rain' />:''}
      { datas &&  datas.weather[0].main == 'Haze'?<FontAwesomeIcon icon={faSmog} className='weather_icon_box rain' />:''}
    </div>
    <div className='place_name_box'>
      <div className='logo'>
        <FontAwesomeIcon icon={faPerson}  className='logo_i'/>
      </div>
      <div className='place'>
      {datas ?<><h1>{datas.name}</h1><span className="country">{datas.sys.country}</span></>:<h2>"Null"</h2>}

      </div>
    </div>
    <div className='temp_box'>
      <div className='temp'>
        {datas && <p>{datas.main.temp} Cel</p>}
      </div>
    </div>
    <div className='other_temp'>
      {/* <p>Min: 3.18Cel || Max: 3.18Cel</p> */}
      {datas && <p>Min: {datas.main.temp_min} Cel</p>} || {datas && <p> Max: {datas.main.temp_max} Cel</p>}
    </div>
    <div className="weather_name_box">
          { datas && <h4>{datas.weather[0].main}</h4> }
    </div>
  </div>
</div>

  )
}

export default App
