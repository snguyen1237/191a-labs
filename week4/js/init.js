// declare variables
let mapOptions = {'centerLngLat': [-118.444,34.0709],'startingZoomLevel':14}

let dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQgQ4dNkB6Z1K4V_UpGR2yBO6YM0-FgnHZF_WJsoS3ui_UEDsN_f4VVyRg9cA9SaZE-9d8XoNTueNyD/pub?output=csv"

console.log(maplibregl);

//const map = new maplibregl.Map({
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});



function addMarker(feature){
    let lng = feature.lng;
    let lat = feature.lat;
    let opinion = feature["What would you rate this location?"];
    let message = feature["What makes this study spot good or bad for studying?"];
    let title = feature["Study Spot Location"];
    let coloring;

   if (opinion == "Bad"){
        coloring = "red";
        console.log("Bad found")
    }
    else if (opinion == "Ok") {
        coloring = "blue";
        console.log("Ok found")
    }
    else {
        coloring = "green";
        console.log("Good found")
    }
    let popup_message = `<h2>${title}</h2> <h3>${opinion}</h3> <h4>${message}</h4>`
    new maplibregl.Marker({
        color: coloring
    })
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,popup_message, opinion, title);
    return message
}

function createButtons(lat,lng,popup,opinion,title){
    let color;
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    if (opinion == "Bad"){
        color = "red";
    }
    else if (opinion == "Ok") {
        color = "blue";
    }
    else {
        color = "green";
    }
    newButton.style.background=color
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
            zoom: 17
        })
    })
    document.getElementById("contents").appendChild(newButton);
}

map.on('load', function() {
    // Use PapaParse to fetch and parse the CSV data from a Google Forms spreadsheet URL
    Papa.parse(dataUrl, {
        download: true, // Tells PapaParse to fetch the CSV data from the URL
        header: true, // Assumes the first row of your CSV are column headers
        complete: (results) => {
            processData(results.data);
        }
    });
});

function processData(results){
    //console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        console.log(feature) // for debugging: are we seeing each feature correctly?
        // assumes your geojson has a "title" and "message" attribute
        //let longitude = feature.lng;
        //let response = feature["What is your opinion of data centers?"];
        //let latitude = feature.lat;
       // let message = feature["What's your experience?"];
        addMarker(feature);
    });
};
