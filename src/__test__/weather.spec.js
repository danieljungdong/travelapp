import { node } from "webpack";
import { currentWeather } from "../client/js/weatherbit"
import fetch from 'node-fetch'

describe("Current weather", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the current weather function ", async() => {
            //get SF weather
            //const weather = await 
            currentWeather(-122.43, 37.77, fetch)
            // const data = weather.json()
            //console.log(weather)
            
            .then(res=>res.json()).then((data)=>{
                const count = data.count;
                const city = data.data[0].city_name;
                const app_temp = data.data[0].app_temp
                expect(count).toEqual(1);
                expect(city).toEqual('San Francisco');
                expect(typeof app_temp).toEqual('number');
            })  
    })


});