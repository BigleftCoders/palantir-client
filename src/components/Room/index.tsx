import * as React from 'react';
import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Collapse, Input, Button } from 'antd';

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

  messagesBox: any = null;

  async componentDidMount() {
    try {
      await this.getRoomData();
      console.log('IO connected');

      const socket = io('http://localhost:1337/chat', {
        forceNew: false
      });
      this.setState({ socket });

      socket.on('connect', (): void => {
        console.log('DATA', this.props.roomData);
        socket.emit('joinRoom', {
          roomId: this.props.roomData.roomId,
          userId: this.props.userData.userId
        });
      });
      // window.onbeforeunload = () => socket.close();
      socket.on('message', (message: any): void => console.log(message));

      socket.on('serverError', (error: string): void =>
        this.setState({ serverError: error })
      );

      // socket.on('joined', (data: any) => console.log('JOINED', data));
      socket.on('updateChat', (data: IMessage) => {
        console.log('updateChat event', data);
        const newArr = this.state.messages.slice();
        newArr.push(data);
        this.setState({ messages: newArr }, () => {
          console.log(this.messagesBox.scrollTop);
          this.messagesBox.scrollTop = this.messagesBox.scrollHeight;
        });
      });
    } catch (error) {
      throw error;
    }
  }

  componentWillUnmount() {
    if (this.state.socket) {
      this.state.socket.emit('close');
    }
  }

  sendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.state.socket) {
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

        <STFlexer>
          <STCollapserWrapp>
            <Collapse bordered={false} defaultActiveKey={['1']}>
              <Collapse.Panel header="Map" key="1">
                <MapContainer />
              </Collapse.Panel>
            </Collapse>
          </STCollapserWrapp>

          <STChatGroup>
            <STChatMessages
              innerRef={(messagesBox: any) => (this.messagesBox = messagesBox)}
            >
              {this.state.messages.map((data: IMessage, i: number) => {
                return (
                  <p key={i}>
                    <span>{data.userName}</span>
                    <br />
                    <span>{data.message}</span>
                  </p>
                );
              })}
            </STChatMessages>
            <STChatInputWrapp>
              <Input
                onPressEnter={this.sendMessage}
                suffix={<Button type="primary" icon="enter" />}
              />
            </STChatInputWrapp>
          </STChatGroup>
        </STFlexer>
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

const STFlexer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100vh - 115px);
`;

const STCollapserWrapp = styled.div`
  margin-bottom: 50px;

  .ant-collapse-header {
    padding-left: 33px !important;
    .arrow {
      left: 6px !important;
    }
  }
  .ant-collapse-content {
    padding: 0 !important;
    border-radius: 0 !important;
    .ant-collapse-content-box {
      padding: 0 !important;
    }
  }
`;

const STChatGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  padding-bottom: 20px;
`;

const STChatMessages = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  margin-bottom: 20px;
  flex-grow: 1;
  overflow-y: auto;
`;

const STChatInputWrapp = styled.div`
  width: 100%;

  .ant-input-affix-wrapper .ant-input-suffix {
    right: 0 !important;
    .ant-btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

const mapStateToProps = ({ rooms, auth }: IGlobalStore) => ({
  roomData: rooms.roomData,
  userData: auth.userData
});

export default connect<any, any, any>(mapStateToProps, { getRoomData })(Room);
