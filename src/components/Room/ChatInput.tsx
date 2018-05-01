import * as React from 'react';
import styled from 'types/styled-components';
import { Input, Button } from 'antd';

interface IProps {
  onMessageSend: (messageText: string) => void;
}

interface IState {
  inputValue: string;
}

class ChatInput extends React.Component<IProps, IState> {
  state = {
    inputValue: ''
  };

  handleInputChange = (e: any) => {
    this.setState({ inputValue: e.target.value });
  };

  handleMessageSend = () => {
    const { onMessageSend } = this.props;
    const { inputValue } = this.state;
    onMessageSend(inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <STChatInputWrapp>
        <Input
          value={inputValue}
          placeholder="Type a message..."
          onChange={this.handleInputChange}
          onPressEnter={this.handleMessageSend}
          suffix={
            <Button
              type="primary"
              icon="enter"
              onClick={this.handleMessageSend}
            />
          }
        />
      </STChatInputWrapp>
    );
  }
}

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

export default ChatInput;
