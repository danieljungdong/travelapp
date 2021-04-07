const apiKey = "21023905-3c84ddcd0237d31e961bcde87"	

let findPic = (q)=>{
    const params = {
        key:apiKey,
        lang:"en", 
        image_type: "photo", 
        category: "places",
        orientation: "horizontal",
        per_page: 3,
        q: q
    }
    const url = new URL("https://pixabay.com/api/");
    url.search = new URLSearchParams(params).toString();
    return fetch(url)
}

export {findPic}