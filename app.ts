const mapContainerNode = document.getElementById("map");

let map: google.maps.Map;

interface LocationType {
  id: string;
  name: string;
  locations: string;
}

interface Location {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  }
}

function initMap(position: GeolocationPosition) {
  map = new google.maps.Map(mapContainerNode, {
    center: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    },
    zoom: 15,
  });
}

function getMyPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        resolve(position);
      },
      function (error) {
        reject(error);
      }
    );
  });
}

function addMarkers(locations: Location[]) {
  for (let location of locations) {
    new google.maps.Marker({
      position: {
        lat: location.location.latitude,
        lng: location.location.longitude
      },
      map: map,
      label: location.name
    })
  }
}

function getLocationTypes(): Promise<LocationType[]> {
  return fetch('https://www.vullum.io/academy/oslo.json')
  .then((response) => response.json());
}

function getLocations(url: string): Promise<Location[]> {
  return fetch(url)
  .then((response) => response.json())
}

function getFlattenedLocations() {
  return getLocationTypes()
  .then((locationTypes) => {
    let locationUrls = locationTypes
    .map((locationType) => locationType.locations);

    let locationPromises = locationUrls
    .map((url) => getLocations(url));

    let locations = Promise.all(locationPromises)
    .then((locationCollection) => {
      return locationCollection.flat();
    })
    
    return locations;
  })
}

async function main() {
  try {
    const myPosition = await getMyPosition();
    initMap(myPosition);
    const locations = await getFlattenedLocations();
    addMarkers(locations);
  } catch (error) {
    console.log(error);
  }
}

main();