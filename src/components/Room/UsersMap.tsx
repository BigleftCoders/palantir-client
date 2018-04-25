import * as React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

interface IState {
  geolocation: {
    lat: number;
    lng: number;
  };
}

interface IPosition {
  coords: {
    accuracy: number;
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

class UsersMap extends React.Component<any, IState> {
  state = {
    geolocation: {
      lat: 0,
      lng: 0
    }
  };

  ownerGeowatchId: number = 0;

  componentDidMount() {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    this.ownerGeowatchId = navigator.geolocation.watchPosition(
      this.handleOwnerPositionChange,
      this.handleOwnerPositionError,
      options
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.ownerGeowatchId);
  }

  handleOwnerPositionChange = (pos: IPosition) => {
    console.log(pos);
    const { latitude, longitude } = pos.coords;
    this.setState({ geolocation: { lat: latitude, lng: longitude } });
  };

  handleOwnerPositionError = (err: any) => {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  render() {
    const { geolocation } = this.state;

    return (
      <div>
        <GoogleMap defaultZoom={8} defaultCenter={geolocation}>
          <Marker position={geolocation} />
        </GoogleMap>
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(UsersMap));
