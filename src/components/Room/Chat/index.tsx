import * as React from 'react';
import styled from 'types/styled-components';
import { format } from 'date-fns';

// components
import ChatInput from './Input';
import EmojiPicker from './EmojiPicker';
import { STUserNameTitle, media } from 'components/common/styled';

// types
import { IMessage } from 'store/Rooms/types';
import { EmojiData } from 'emoji-mart';

interface IProps {
  roomId: number;
  userId: string;
  socket: SocketIOClient.Socket | null;
  foundedMessages: IMessage[];
}

interface IState {
  caretPosition: number | null;
  serverError: string;
  messages: IMessage[];
  inputValue: string;
}

class Chat extends React.Component<IProps, IState> {
  state = {
    caretPosition: 0,
    serverError: '',
    inputValue: '',
    messages: this.props.foundedMessages || []
  };

  messagesBox: HTMLDivElement | any = null;

  inputRef: HTMLInputElement | any = React.createRef();

  componentDidMount() {
    this.inputRef.current.focus();

    if (this.props.socket) {
      this.subscribeToChatSocket(this.props.socket);
    }

    this.messagesBox.scrollTop = this.messagesBox.scrollHeight;
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.socket) {
      this.subscribeToChatSocket(nextProps.socket);
    }
  }

  componentWillUnmount() {
    const { socket } = this.props;

    if (socket) {
      socket.emit('close');
    }
  }

  handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      inputValue: e.currentTarget.value,
      caretPosition: e.currentTarget.selectionStart,
    });
  }

  handleInputBlur = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({caretPosition: e.currentTarget.selectionStart});
  }

  handleEmojiSelect = (emoji: EmojiData): void => {
    if ('native' in emoji) {
      this.setState(
        prevState => ({
          inputValue: [
            this.state.inputValue.slice(0, this.state.caretPosition),
            emoji.native,
            this.state.inputValue.slice(this.state.caretPosition),
          ].join(''),

          caretPosition: prevState.caretPosition as number + 1,
        }),

        () => {
          this.inputRef.current.input.focus();
          this.inputRef.current.input.setSelectionRange(this.state.caretPosition + 1, this.state.caretPosition + 1);
        },
      );
    }
  }

  subscribeToChatSocket = (socket: SocketIOClient.Socket) => {
    try {
      const { roomId, userId } = this.props;

      socket.emit('joinRoom', {
        roomId,
        userId
      });

      socket.on('error', (data: never) => {
        console.error('error', data);
      });

      socket.on('message', (message: any): void => console.log(message));

      socket.on('serverError', (error: string): void =>
        this.setState({ serverError: error })
      );

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

  sendMessage = () => {
    const { socket } = this.props;
    const isMessageEmpty = this.state.inputValue === '';

    if (socket && !isMessageEmpty) {
      socket.emit('newMessage', this.state.inputValue);
    }

    this.inputRef.current.focus();
    this.setState({ inputValue: '' })
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

        <ChatInput
          handleInputBlur={this.handleInputBlur}
          handleInputChange={this.handleInputChange}
          inputValue={this.state.inputValue}
          onMessageSend={this.sendMessage}
          inputRef={this.inputRef}
        />

        <EmojiPicker handleEmojiSelect={this.handleEmojiSelect} />
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

  ${media.mobile`
    padding: 0 5px 5px 5px;
  `};
`;

const STChatMessages = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  margin-bottom: 20px;
  flex-grow: 1;
  overflow-y: auto;

  ${media.mobile`
    margin-bottom: 10px;
  `};
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
