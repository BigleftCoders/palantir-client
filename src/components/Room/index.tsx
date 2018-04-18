import * as React from 'react';
// import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';

// store
import { getRoomData } from 'store/Rooms/actions';

// types
import { IGlobalStore } from 'store/types';
import { IRoom } from 'store/Rooms/types';
import { IUserData } from 'store/Auth/types';

import io from 'socket.io-client';

interface IProps extends RouteComponentProps<any> {
  roomData: IRoom;
  userData: IUserData;
  getRoomData: (roomId: number) => any;
}
interface IState {
  isLoadingRoomData: boolean;
  serverError: string;
  socket: SocketIOClient.Emitter | null;
}

class Room extends React.Component<IProps, IState> {
  state: IState = {
    isLoadingRoomData: true,
    serverError: '',
    socket: null
  };

  componentDidMount() {
    this.getRoomData();
    console.log('IO connected');

    const socket = io('http://localhost:1337/chat');
    this.setState({ socket });
    socket.on('connect', (): void => {
      console.log('DATA');
      socket.emit('joinRoom', {
        roomId: this.props.roomData.roomId,
        userId: this.props.userData.userId
      });
    });
    socket.on('message', (message: any): void => console.log(message));
    socket.on('serverError', (error: string): void =>
      this.setState({ serverError: error })
    );
    socket.on('joined', (data: any) => console.log('JOINED', data));
  }
  componentWillUnmount() {
    if (this.state.socket) {
      this.state.socket.emit('close');
    }
  }

  getRoomData = async () => {
    const { getRoomData, match } = this.props;
    const { id } = match.params;
    await getRoomData(id);
    this.setState({ isLoadingRoomData: false });
  };

  render() {
    const { roomData } = this.props;
    const { isLoadingRoomData } = this.state;
    const { roomName, description } = roomData;
    const serverErrorMessage = <p>{this.state.serverError}</p>;
    return (
      <div>
        <LoadingSpinner isLoading={isLoadingRoomData} alignOnCenter>
          {this.state.serverError && serverErrorMessage}
          <p>{roomName}</p>
          <p>{description}</p>
        </LoadingSpinner>
      </div>
    );
  }
}

const mapStateToProps = ({ rooms, auth }: IGlobalStore) => ({
  roomData: rooms.roomData,
  userData: auth.userData
});

export default connect<any, any, any>(mapStateToProps, { getRoomData })(Room);
