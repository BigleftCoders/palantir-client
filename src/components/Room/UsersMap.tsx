import * as React from 'react';
import styled from 'types/styled-components';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { connect } from 'react-redux';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';
import SvgMarker from 'components/Room/SvgMarker';

// types
import { IGlobalStore } from 'store/types';
import { IUserData } from 'store/Auth/types';

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
    markers: []
  };

  ownerGeowatchId: number = 0;

  gmap = React.createRef();

  subscribeOnMapUpdates = (socket: SocketIOClient.Socket) => {
    socket.on('updateCoordinates', (data: IMarker) => {
      console.log(data, this.state);
      const { markers } = this.state;
      const markerIndex: number = markers.findIndex(
        (marker: IMarker) => data.userId === marker.userId
      );
      console.log('index', markerIndex);

      if (markerIndex > -1) {
        this.setState(({ markers: oldMarkers }) => ({
          markers: oldMarkers.map((marker, index) => {
            if (index === markerIndex) {
              return data;
            }
            return marker;
          })
        }));
      } else {
        this.setState(({ markers: oldMarkers }) => ({
          markers: oldMarkers.concat(data)
        }));
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
    const { socketInstance, userData } = this.props;
    const { latitude, longitude } = pos.coords;
    this.setState({ geolocation: { lat: latitude, lng: longitude } });

    socketInstance.emit('newCoordinates', {
      latitude,
      longitude,
      color: userData.color,
      userId: userData.userId,
      displayName: userData.displayName
    });
  };

  handleOwnerPositionError = (err: IPositionError) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  formatName = (displayName: string): string =>
    displayName
      .split(' ')
      .map((word: string) => word.replace('(', '')[0].toUpperCase())
      .join('');

  render() {
    const { geolocation, markers } = this.state;
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
          {markers.map(
            ({ userId, latitude, longitude, color, displayName }: IMarker) => {
              const cuttedName = this.formatName(displayName);

              return (
                <STMarker key={userId}>
                  <MarkerWithLabel
                    position={{ lat: latitude, lng: longitude }}
                    labelAnchor={{ x: 21, y: 55 }}
                    options={{ labelClass: 'custom-pin' }}
                  >
                    <SvgMarker color={color} name={cuttedName} />
                  </MarkerWithLabel>
                </STMarker>
              );
            }
          )}
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
