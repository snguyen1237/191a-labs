
// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID — matches <div id="map">
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // style URL
    center: [-118.44014, 34.07356], // starting position [lng, lat], middle of north campus
    zoom: 16 // starting zoom level
});

//let home_marker = [-118.44014, 34.07356];
//let home_marker_text = "UCLA North Campus -- the prettier half of campus :)";

let law_court = [-118.43896, 34.07308];
let law_court_text = "Shapiro Courtyard (i.e. the law school courtyard!)";

let sculpture = [-118.44007, 34.07489];
let sculpture_text = "Franklin D. Murphy Sculpture Garden";

let rolfe = [-118.44209, 34.07391];
let rolfe_text = "Rolfe Court";


new maplibregl.Marker() //law courtyard
    .setLngLat(law_court)
    .setPopup(new maplibregl.Popup({ offset: 25 })
        .setHTML(law_court_text))
    .addTo(map);

new maplibregl.Marker() //sculpture garden
    .setLngLat(sculpture)
    .setPopup(new maplibregl.Popup({ offset: 25 })
        .setHTML(sculpture_text))
    .addTo(map);

new maplibregl.Marker() //rolfe court
    .setLngLat(rolfe)
    .setPopup(new maplibregl.Popup({ offset: 25 })
        .setHTML(rolfe_text))
    .addTo(map);