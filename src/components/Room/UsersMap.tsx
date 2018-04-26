import * as React from 'react';
import styled from 'types/styled-components';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';

interface IState {
  geolocation: {
    lat: number;
    lng: number;
  } | null;
}

interface IPosition {
  coords: {
    accuracy: number;
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

interface IPositionError {
  code: number;
  message: string;
}

class UsersMap extends React.Component<any, IState> {
  state = {
    geolocation: null
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

  handleOwnerPositionError = (err: IPositionError) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  render() {
    const { geolocation } = this.state;
    const isLoadingGeo = !geolocation;

    if (isLoadingGeo) {
      return (
        <STLoaderWrapp>
          <LoadingSpinner isLoading alignOnCenter spinnerSize="large" />
        </STLoaderWrapp>
      );
    }

    return (
      <div>
        <GoogleMap defaultZoom={12} defaultCenter={geolocation}>
          <Marker position={geolocation} />
        </GoogleMap>
      </div>
    );
  }
}

const STLoaderWrapp = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default withScriptjs(withGoogleMap(UsersMap));
