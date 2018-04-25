import * as React from 'react';
import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
// import { Button } from 'antd';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';
import RoomInfo from 'components/modals/RoomInfo';
import {
  STRoomsActions,
  STRoomsActionsWrap,
  STActionButton
} from 'components/common/styled';
import MapContainer from './MapContainer';

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
  socket: SocketIOClient.Socket | null;
  messages: IMessage[];
}
interface IMessage {
  createdAt: number;
  userName: string;
  message: string;
}

class Room extends React.Component<IProps, IState> {
  state: IState = {
    isLoadingRoomData: true,
    serverError: '',
    socket: null,
    messages: [
      { createdAt: 32313123, userName: 'System Jopa', message: ' hello' }
    ]
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
    // socket.on('joined', (data: any) => console.log('JOINED', data));
    socket.on('updateChat', (data: IMessage) => {
      console.log('updateChat event', data);
      const newArr = this.state.messages.slice();
      newArr.push(data);
      this.setState({ messages: newArr });
    });
  }

  componentWillUnmount() {
    if (this.state.socket) {
      this.state.socket.emit('close');
      this.state.socket.close();
    }
  }

  sendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.state.socket && event.keyCode === 13) {
      const text: string = event.currentTarget.value;
      this.state.socket.emit('newMessage', text);
    }
  };
  getRoomData = async () => {
    try {
      const { getRoomData, match } = this.props;
      const { id } = match.params;
      await getRoomData(id);
      this.setState({ isLoadingRoomData: false });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { roomData } = this.props;
    const { isLoadingRoomData } = this.state;
    const { roomName } = roomData;
    const serverErrorMessage = <p>{this.state.serverError}</p>;

    return (
      <LoadingSpinner isLoading={isLoadingRoomData} alignOnCenter>
        {this.state.serverError && serverErrorMessage}
        <STRoomsActions>
          <STTitleWrapp>
            <RoomInfo roomData={roomData} />
            <STRoomTitle>{roomName}</STRoomTitle>
          </STTitleWrapp>
          <STRoomsActionsWrap>
            <STActionButton type="primary" ghost icon="share-alt" />
          </STRoomsActionsWrap>
        </STRoomsActions>
        <MapContainer />
        <input
          type="text"
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
            this.sendMessage(e)
          }
        />
        {this.state.messages.map((data: IMessage, i: number) => {
          return (
            <p key={i}>
              <span>{data.userName}</span>
              <br />
              <span>{data.message}</span>
            </p>
          );
        })}
      </LoadingSpinner>
    );
  }
}

const STTitleWrapp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const STRoomTitle = styled.h2`
  max-width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 600;
  color: #212121;
`;

const mapStateToProps = ({ rooms, auth }: IGlobalStore) => ({
  roomData: rooms.roomData,
  userData: auth.userData
});

export default connect<any, any, any>(mapStateToProps, { getRoomData })(Room);
