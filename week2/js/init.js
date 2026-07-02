// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.4430,34.0691], // Starting position [lng, lat]
    zoom: 15 // Starting zoom level
});


function idiot(p1, p2){
    console.log("idiot 1 is: " + p1, "and idiot 2 is: " + p2);
}



function addMarker(lat,lng,title,message){
    let popup_message = `<h2>${title}</h2> <h3>${message}</h3>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup().setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title);
    return message
}


function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    document.getElementById("contents").appendChild(newButton);
}


function init(){
    addMarker(34.07089198374384, -118.4382362706527, "UCLA", "Where I lived on campus")
    addMarker(34.05811237642655, -118.44350206574538, "Westwood", "Where I lived in Westwood off campus")
    addMarker(34.06135445908777, -118.30375584669582, "Koreatown", "Where I currently live.")
};

init();

