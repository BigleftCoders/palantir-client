import * as React from 'react';
import styled from 'types/styled-components';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap
  // Marker
} from 'react-google-maps';

import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
// components
import LoadingSpinner from 'components/common/LoadingSpinner';
import SvgMarker from 'components/Room/SvgMarker';

interface IState {
  geolocation: {
    lat: number;
    lng: number;
  } | null;
}

interface IProps {
  socketInstance: SocketIOClient.Socket;
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

class UsersMap extends React.Component<IProps, IState> {
  state = {
    geolocation: null,
    markers: {},
    socket: null
  };

  ownerGeowatchId: number = 0;

  gmap = React.createRef();

  subscribeOnMapUpdates = (socket: SocketIOClient.Socket) => {
    socket.on('updateCoordinates', (data: any) => {
      console.log(data);
      navigator.geolocation.getCurrentPosition(
        (pos: IPosition) => {
          // debugger;
        },
        (err: IPositionError) => {
          console.log(err);
        }
      );
      // this.handleOwnerPositionChange(this.state.geolocation);
      // const oldMarkers = { ...this.state.markers };
    });
  };

  componentDidMount() {
    const options = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0
    };

    this.ownerGeowatchId = navigator.geolocation.watchPosition(
      this.handleOwnerPositionChange,
      this.handleOwnerPositionError,
      options
    );
    setTimeout(() => {
      console.log(this.gmap);
    }, 3000);
  }
  componentWillReceiveProps(nextProps: IProps) {
    // debugger;
    if (nextProps.socketInstance !== this.props.socketInstance) {
      console.log('has connection');
      this.subscribeOnMapUpdates(nextProps.socketInstance);
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.ownerGeowatchId);
  }

  handleOwnerPositionChange = (pos: IPosition) => {
    const { latitude, longitude } = pos.coords;
    const socket = this.props.socketInstance;
    this.setState({ geolocation: { lat: latitude, lng: longitude } });
    if (socket) {
      // console.log('emmited');
      this.props.socketInstance.emit('newCoordinates', pos);
    }
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
          <STMarker>
            {/* <Marker
              position={geolocation}
              markerWithLabel={MarkerWithLabel}
              options={{ labelClass: 'custom-pin' }}
            />{' '} */}
            <MarkerWithLabel
              position={geolocation}
              labelAnchor={{ x: 21, y: 55 }}
              options={{ labelClass: 'custom-pin' }}
            >
              <SvgMarker color="#13E7C9" name="AD" />
            </MarkerWithLabel>
          </STMarker>
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

const STMarker = styled.div`
  a[href^='http://maps.google.com/maps'] {
    display: none !important;
  }

  a[href^='https://maps.google.com/maps'] {
    display: none !important;
  }

  .gmnoprint a,
  .gmnoprint span,
  .gm-style-cc,
  .gm-fullscreen-control {
    display: none;
  }

  .gmnoprint div {
    background: none !important;
    display: none;
  }

  .gm-style-iw + div {
    display: none;
  }
`;

export default withScriptjs(withGoogleMap(UsersMap));
