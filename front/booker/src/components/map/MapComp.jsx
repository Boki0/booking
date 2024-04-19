import Map from 'devextreme-react/map';

const MapComp = ({location}) => {

  const markerUrl = 'https://js.devexpress.com/Demos/RealtorApp/images/map-marker.png';
  const address = location.street + ', ' + location.city + ', ' + location.country;
  const mapAddress = [{
    location: address
  }];

  const keys = {
    bing:'AlstwBdODC4cBCSmxpr5dbIjtUjBm82ZQB06GswpmWD1AZDYBVgNzn4j1lsBlb4Y'
  }

  return (
        <Map
          defaultCenter={address}
          defaultZoom={11}
          apiKey={keys}
          height={250}
          width="100%"
          controls={true}
          markerIconSrc={markerUrl}
          markers={mapAddress}
          provider="bing">
        </Map>
  )
}

export default MapComp