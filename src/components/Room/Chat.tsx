import * as React from 'react';
import styled from 'types/styled-components';
import io from 'socket.io-client';

// components
import ChatInput from './ChatInput';

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
  state = {
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

        const newArr: IMessage[] = this.state.messages.slice();
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

  sendMessage = (messageText: string) => {
    if (this.socket) {
      this.socket.emit('newMessage', messageText);
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
          {this.state.messages.map(
            ({ userName, message, createdAt }: IMessage) => {
              return (
                <STChatMessageItem key={createdAt}>
                  <p>{userName}</p>
                  <p>{message}</p>
                </STChatMessageItem>
              );
            }
          )}
        </STChatMessages>

        <ChatInput onMessageSend={this.sendMessage} />
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

const STChatMessageItem = styled.div`
  margin-bottom: 10px;
`;

export default Chat;
