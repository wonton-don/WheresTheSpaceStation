let lat = 0;
let lon = 0;
let data;
let center;
let local;
let altitude;
let speed;
let distance;
const altText = document.querySelector('.altitude');
const speedSpan = document.querySelector('.speed');
const locationSpan = document.querySelector('.location');
const latLonText = document.querySelector('.latLon')
let markerCenter;
let geojson;
let locationData;
const lightSwitch = document.querySelector('.lightSwitch')
const h1 = document.querySelector('h1');
const body = document.querySelector('body')
const toggle = document.querySelector('input')
let iconClass;
let loopCount;

iconClass = 'marker light';
//get data and update most elements
setInterval(() => {
    axios.get('https://api.wheretheiss.at/v1/satellites/25544')
        .then(function (response) {
            data = response.data
            lat = data.latitude;
            lon = data.longitude;
            if (document.querySelector('.marker')) {
                document.querySelector('.marker').remove()
            }
            const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            speed = numberWithCommas((data.velocity / 1.609344).toFixed(2));
            altitude = data.altitude * 0.6214, 5;
            altText.innerText = `${altitude.toFixed(2)} Miles`;
            speedSpan.innerText = `${speed} MPH`;
            center = new mapboxgl.LngLat(lon, lat);
            geojson = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [lon, lat]
                        },
                    }
                ]
            };
            for (const feature of geojson.features) {
                // create a HTML element for each feature
                const el = document.createElement('div');
                el.className = iconClass;
                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
            }
            latLonText.innerText = `${lon.toFixed(2)}, ${lat.toFixed(2)}`;
            map.setCenter(center);
            local = `${locationData.country}, ${locationData.continent}`
            if (locationData._type === 'body_of_water') {
                locationSpan.innerText = locationData.body_of_water
            } else {
                locationSpan.innerText = local;
            }
        }).catch(function (error) {
            // handle error
        })
}, 1500)

//turning lat and lon to location
setInterval(() => {
    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=25c47c34b1e545d7afb0ea44be8049ae`)
        .then((response) => {
            locationData = response.data.results[0].components;
        })
}, 6000)


mapboxgl.accessToken = 'pk.eyJ1Ijoid29udG9uLWRvbiIsImEiOiJjbDA3Z3MxczgwMHM3M2JxZTJkN2lhMGdkIn0.Hq0gfETpy3T-eYzsV-ATFQ';
var map = new mapboxgl.Map({
    container: document.querySelector('.map'),
    style: 'mapbox://styles/mapbox/light-v10',
    center: [lat, lon],
    zoom: 3
});

map.addControl(new mapboxgl.NavigationControl());

//dark and light mode
h1.addEventListener('click', () => {
    if (body.style.color === 'white') {
        body.style.color = 'black';
        map.setStyle('mapbox://styles/mapbox/light-v10')
        iconClass = 'marker light'
    } else {
        body.style.color = 'white';
        map.setStyle('mapbox://styles/mapbox/dark-v10')
        iconClass = 'marker dark'
    }
})

toggle.addEventListener('click', () => {
    if (body.style.color === 'white') {
        body.style.color = 'black';
        map.setStyle('mapbox://styles/mapbox/light-v10')
        iconClass = 'marker light'
    } else {
        body.style.color = 'white';
        map.setStyle('mapbox://styles/mapbox/dark-v10')
        iconClass = 'marker dark'
    }
})

window.addEventListener("load", function () {
    setTimeout(() => {
        document.querySelector('.loading').style.opacity = 0;
        document.querySelector('.lds-hourglass').style.opacity = 0;
    }, 1600)
    setTimeout(() => {
        document.querySelector('.loading').remove()
    }, 1800)
});
