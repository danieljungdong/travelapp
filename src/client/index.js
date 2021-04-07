import { geonames } from './js/geonames';
import { currentWeather, futureWeather } from './js/weatherbit';
import {findPic} from './js/pixabay'

import './styles/base.scss'


console.log(":::Initiating Webapp:::")

//helper function
let fragment = ()=> new DocumentFragment()
let populateWeatherCard = (w)=>{
    const div = document.createElement('div')
    div.setAttribute("class", "result-weather-card");
    const weatherdate = document.createElement('div')
    weatherdate.setAttribute("class", "date");
    weatherdate.innerHTML = w.datetime;
    const temperature = document.createElement('div')
    temperature.setAttribute("class", "temperature");
    temperature.innerHTML = `${w.temp} C` ;
    div.appendChild(weatherdate);
    div.appendChild(temperature);
    return div
}

//define today's date in menu dropdown
const today = new Date();
const todayStr = today.toISOString().split('T')[0];
document.querySelector("#TravelDate").setAttribute("value", todayStr);
document.querySelector("#TravelDate").setAttribute("min", todayStr);

//add listener for submit
document.querySelector("form.selector").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const form = e.target
    const city = form.querySelector("#city").value
    const datesubmit = form.querySelector("#TravelDate").value
    // console.log(e.target)
    //get pics 
    findPic(city).then(res=>res.json()).then(async (r)=>{
        const doc = fragment()
        const data = r;
        // console.log(data.hits)
        data.hits.forEach((src)=>{
            const im = document.createElement('img')
            im.setAttribute("src", src.previewURL)
            doc.appendChild(im)
        })
        const imgColumn = document.querySelector(".result .result-pics");
        imgColumn.innerHTML = '';
        imgColumn.append(doc);
        console.log("All pictures successfully appended")
    }).catch((e)=>{console.log(e)})

    //get previous search
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({city}) // body data type must match "Content-Type" header
      };

      console.log("::: Retrieving Previous Result :::")
      fetch('http://localhost:8081/postcity', options)
      .then((res) => res.json())
      .then((res) => {
          console.log(res)
          document.querySelector("div.previous-search").innerHTML = res.city
      })
      .catch(e=>console.log(e))
    
    //get geo location
    const response = await geonames("San Francisco")
    const geo = await response.json()
    const lat = geo.address.lat, long = geo.address.lng
    // get Date difference
    const date2 = new Date(datesubmit.replace(/-/g,'/'));
    const diffDays = Math.ceil(Math.abs(date2 - today) / (1000 * 60 * 60 * 24)); 
    // populate 
    if (diffDays <= 7){
        const response = await currentWeather(long, lat );
        const weather = await response.json();
        console.log("current weather:", weather);
        const div = populateWeatherCard(weather.data[0]);
        const column = document.querySelector(".result-weather");
        column.innerHTML = '';
        column.append(div);
    }
    else {
        const doc = fragment();
        const response = await futureWeather(long, lat);
        const weather = await response.json();
        weather.data.slice(6,13).forEach((w)=>{
            const div = populateWeatherCard(w);
            doc.appendChild(div);
        })
        const column = document.querySelector(".result-weather");
        column.innerHTML = '';
        column.append(doc);
        // console.log("future weather:", weather)
    }
    //console.log(geo, lat, long)
})


//remove trip
document.querySelector("form.selector").addEventListener("reset", async (e)=>{
    const clear = [".result-weather","div.previous-search",".result .result-pics"]
    clear.forEach((e)=>{
        document.querySelector(e).innerHTML=''
    })

})

export { geonames, currentWeather, futureWeather,findPic  } 