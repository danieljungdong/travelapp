const username = "dxudacityapp"

//function to get lat and long
let geonames = (str) =>{
    const params = {
        q: str, 
        username: username
    }
    const url = new URL('http://api.geonames.org/geoCodeAddressJSON')
    url.search = new URLSearchParams(params).toString();
    console.log(url)
    return fetch(url)
}

export {geonames}