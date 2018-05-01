import * as React from 'react';
import styled from 'types/styled-components';
import io from 'socket.io-client';
import { Input, Button } from 'antd';

// types
import { IMessage } from 'store/Rooms/types';

interface IProps {
  roomId: number;
  userId: string;
}

interface IState {
  serverError: string;
  messages: IMessage[];
}

class Chat extends React.Component<IProps, IState> {
  state: IState = {
    serverError: '',
    messages: []
  };

  socket: SocketIOClient.Socket = io('http://localhost:1337/chat', {
    forceNew: false
  });

  messagesBox: any = null;

  async componentDidMount() {
    try {
      console.log('IO connected');

      this.socket.on('connect', (): void => {
        console.log('CHAT PROPS', this.props);
        const { roomId, userId } = this.props;
        this.socket.emit('joinRoom', {
          roomId,
          userId
        });
      });

      // window.onbeforeunload = () => socket.close();
      this.socket.on('message', (message: any): void => console.log(message));

      this.socket.on('serverError', (error: string): void =>
        this.setState({ serverError: error })
      );

      // socket.on('joined', (data: any) => console.log('JOINED', data));
      this.socket.on('updateChat', (data: IMessage) => {
        console.log('updateChat event', data);
        const newArr = this.state.messages.slice();
        newArr.push(data);
        this.setState({ messages: newArr }, () => {
          this.messagesBox.scrollTop = this.messagesBox.scrollHeight;
        });
      });
    } catch (error) {
      throw error;
    }
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.emit('close');
    }
  }

  sendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.socket) {
      const text: string = event.currentTarget.value;
      this.socket.emit('newMessage', text);
    }
  };

  render() {
    const { serverError } = this.state;

    return (
      <STChatGroup>
        {serverError && <p>{serverError}</p>}

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
    );
  }
}

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

export default Chat;
