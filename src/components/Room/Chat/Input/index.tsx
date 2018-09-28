import * as React from 'react';
import styled from 'types/styled-components';
import { Input, Button } from 'antd';

interface IProps  {
  inputValue: string;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleInputBlur: (e: React.FormEvent<HTMLInputElement>) => void;
  onMessageSend: () => void;
  inputRef: React.RefObject<Input>;
}

const ChatInput = (props: IProps) => (
  <STChatInputWrapp>
    <Input
      value={props.inputValue}
      placeholder="Type a message..."
      onChange={props.handleInputChange}
      onPressEnter={props.onMessageSend}
      onBlur={props.handleInputBlur}
      ref={props.inputRef}

      suffix={
        <Button
          type="primary"
          icon="enter"
          onClick={props.onMessageSend}
        />
      }
    />
  </STChatInputWrapp>
);

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
