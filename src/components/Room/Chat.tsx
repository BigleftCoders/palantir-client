import * as React from 'react';
import styled from 'types/styled-components';
import { format } from 'date-fns';

// components
import ChatInput from './ChatInput';
import { STUserNameTitle } from 'components/common/styled';

// types
import { IMessage } from 'store/Rooms/types';

interface IProps {
  roomId: number;
  userId: string;
  socket: SocketIOClient.Socket;
  foundedMessages: IMessage[];
}

interface IState {
  serverError: string;
  messages: IMessage[];
}

class Chat extends React.Component<IProps, IState> {
  state = {
    serverError: '',
    messages: this.props.foundedMessages || []
  };

  messagesBox: HTMLDivElement | any = null;

  inputRef: HTMLInputElement | any = React.createRef();

  componentDidMount() {
    console.log('cdm', this.props.socket);
    this.subscribeToChatSocket();
    this.messagesBox.scrollTop = this.messagesBox.scrollHeight;
  }
  componentWillReceiveProps(nextProps: IProps) {
    console.log('cwrp', this.props.socket, nextProps.socket);
  }

  componentWillUnmount() {
    const { socket } = this.props;

    if (socket) {
      socket.emit('close');
    }
  }

  subscribeToChatSocket = () => {
    try {
      const { socket } = this.props;
      console.log('subscribe', socket);
      socket.on('connect', (): void => {
        const { roomId, userId } = this.props;
        console.log('joinRoom', roomId, userId);
        socket.emit('joinRoom', {
          roomId,
          userId
        });
      });
      socket.on('error', (data: never) => {
        console.error('error', data);
      });

      // window.onbeforeunload = () => socket.close();
      socket.on('message', (message: any): void => console.log(message));

      socket.on('serverError', (error: string): void =>
        this.setState({ serverError: error })
      );

      // socket.on('joined', (data: any) => console.log('JOINED', data));
      socket.on('updateChat', (data: IMessage | any) => {
        console.log('updateChat event', data);
        if (data === 'SERVER') return;

        const newArr: IMessage[] = this.state.messages.slice();
        newArr.push(data);

        const isNeedToScrollDown =
          this.messagesBox.scrollHeight - this.messagesBox.scrollTop ===
          this.messagesBox.clientHeight;

        this.setState({ messages: newArr }, () => {
          if (isNeedToScrollDown) {
            this.messagesBox.scrollTop = this.messagesBox.scrollHeight;
          }
        });
      });
    } catch (error) {
      throw error;
    }
  };

  sendMessage = (messageText: string) => {
    const { socket } = this.props;
    const isMessageEmpty = messageText === '';

    if (socket && !isMessageEmpty) {
      socket.emit('newMessage', messageText);
    }
    this.inputRef.current.focus();
  };

  render() {
    const { serverError, messages } = this.state;

    return (
      <STChatGroup>
        {serverError && <p>{serverError}</p>}

        <STChatMessages
          innerRef={(messagesBox: any) => (this.messagesBox = messagesBox)}
        >
          {messages.map(({ userName, message, createdAt, color }: IMessage) => {
            return (
              <STChatMessageItem key={createdAt}>
                <STMessageItemHeader>
                  <STUserNameTitle userColor={color}>
                    {userName}
                  </STUserNameTitle>
                  <STMessageItemTime>
                    {format(createdAt, 'HH:mm')}
                  </STMessageItemTime>
                </STMessageItemHeader>
                <p>{message}</p>
              </STChatMessageItem>
            );
          })}
        </STChatMessages>

        <ChatInput onMessageSend={this.sendMessage} ref={this.inputRef} />
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
  overflow: hidden;
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

const STMessageItemHeader = styled.p`
  span:first-child {
    margin-right: 6px;
  }
`;

const STMessageItemTime = styled.span`
  color: #9e9e9e;
`;

export default Chat;
