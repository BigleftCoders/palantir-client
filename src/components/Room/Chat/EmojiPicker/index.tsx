import * as React from 'react';
import styled from 'types/styled-components';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, EmojiData } from 'emoji-mart';

interface IProps {
  handleEmojiSelect: (emoji: EmojiData) => void;
}

interface IState {
  isPickerShown: boolean;
}

class EmojiPicker extends React.Component<IProps, IState> {
  state = {
    isPickerShown: false,
  }

  togglePicker = () => this.setState(prevState => ({
    isPickerShown: !prevState.isPickerShown,
  }))

  render() {
    return (
      <React.Fragment>
        {this.state.isPickerShown && <STEmojiPicker>
          <Picker
            native
            title=""
            onSelect={this.props.handleEmojiSelect}
            custom={[]}
          />
        </STEmojiPicker>}

        <STEmojiToggle onClick={this.togglePicker}>
          😊
        </STEmojiToggle>
      </React.Fragment>
    );
  }
}

const STEmojiPicker = styled.div`
  position: absolute;
  bottom: 65px;
  right: 0;
`;

const STEmojiToggle = styled.div`
  cursor: pointer;
  bottom: 21px;
  right: 38px;
  font-size: 22px;
  z-index: 10;
  width: 26px;
  position: absolute;
`;

export default EmojiPicker;
