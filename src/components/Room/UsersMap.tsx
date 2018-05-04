import * as React from 'react';
import styled from 'types/styled-components';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { connect } from 'react-redux';
import { IGlobalStore } from 'store/types';
import { IUserData } from 'store/Auth/types';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';
import SvgMarker from 'components/Room/SvgMarker';

interface IState {
  geolocation: {
    lat: number;
    lng: number;
  } | null;
  markers: IMarker[];
}

interface IProps {
  socketInstance: SocketIOClient.Socket;
  userData: IUserData;
}

interface IPosition {
  coords: {
    accuracy: number;
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}
interface ICoords {
  latitude: number;
  longitude: number;
}
interface IMarker extends ICoords {
  color: string;
  userId: string;
  displayName: string;
}
interface IPositionError {
  code: number;
  message: string;
}

class UsersMap extends React.Component<IProps, IState> {
  state: IState = {
    geolocation: null,
    markers: [
      {
        color: '#21fс20',
        latitude: 46.532236999999995,
        longitude: 34.998807899999996,
        userId: '5sdsaaeb443f832d18268a905030',
        displayName: 'TEST'
      }
    ]
  };

  ownerGeowatchId: number = 0;

  gmap = React.createRef();

  subscribeOnMapUpdates = (socket: SocketIOClient.Socket) => {
    socket.on('updateCoordinates', (data: IMarker) => {
      console.log(data, this.state);
      const markerIndex: number = this.state.markers.findIndex(
        (marker: IMarker) => data.userId === marker.userId
      );
      console.log('index', markerIndex);
      if (markerIndex > 0) {
        const newMarkers: IMarker[] = this.state.markers.map(
          (marker: IMarker) => {
            return { ...marker };
          }
        );

        newMarkers[markerIndex] = data;
        this.setState({
          markers: newMarkers
        });
      } else {
        const oldMarkers: IMarker[] = this.state.markers.map(
          (marker: IMarker) => {
            return { ...marker };
          }
        );

        const newMarkers: IMarker[] = [...oldMarkers, data];
        this.setState({ markers: newMarkers });
      }
    });
  };

  componentDidMount() {
    const options = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0
    };
    this.subscribeOnMapUpdates(this.props.socketInstance);

    this.ownerGeowatchId = navigator.geolocation.watchPosition(
      this.handleOwnerPositionChange,
      this.handleOwnerPositionError,
      options
    );
    setTimeout(() => {
      console.log(this.gmap);
    }, 3000);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.ownerGeowatchId);
  }

  handleOwnerPositionChange = (pos: IPosition) => {
    const { latitude, longitude } = pos.coords;
    const socket = this.props.socketInstance;
    this.setState({ geolocation: { lat: latitude, lng: longitude } });
    this.props.socketInstance.emit('newCoordinates', {
      latitude,
      longitude,
      color: this.props.userData.color,
      userId: this.props.userData.userId,
      displayName: this.props.userData.displayName
    });
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
          {this.state.markers.map((marker: IMarker) => (
            <STMarker key={marker.userId}>
              {/* <Marker
              position={geolocation}
              markerWithLabel={MarkerWithLabel}
              options={{ labelClass: 'custom-pin' }}
            />{' '} */}
              <MarkerWithLabel
                position={{ lat: marker.latitude, lng: marker.longitude }}
                labelAnchor={{ x: 21, y: 55 }}
                options={{ labelClass: 'custom-pin' }}
              >
                <SvgMarker color={marker.color} name={marker.displayName} />
              </MarkerWithLabel>
            </STMarker>
          ))}
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
const getPropsFromState = (state: IGlobalStore) => ({
  userData: state.auth.userData
});
export default withScriptjs(
  withGoogleMap(connect<any, any, any>(getPropsFromState)(UsersMap))
);
