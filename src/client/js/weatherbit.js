const regeneratorRuntime = require("regenerator-runtime");
const apiKey = "d5b073eeff9c47d1877c402515dbb57f";	
// const fetch = require("node-fetch");
// const fetch = global.fetch;

let currentWeather = (lo, la, fetch = global.fetch)=>{
    const params = {
        key:apiKey,
        units:"M", 
        lat:la, 
        lon:lo
    }
    const url = new URL("http://api.weatherbit.io/v2.0/current");
    url.search = new URLSearchParams(params).toString();
    return fetch(url)
}

let futureWeather = (lo, la)=>{
    const params = {
        key:apiKey,
        units:"M", 
        lat:la, 
        lon:lo
    }
    const url = new URL("http://api.weatherbit.io/v2.0/forecast/daily");
    url.search = new URLSearchParams(params).toString();
    return fetch(url)
}

export {currentWeather, futureWeather}