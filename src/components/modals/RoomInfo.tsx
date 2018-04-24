import * as React from 'react';
import styled from 'types/styled-components';
import { Modal, Button, Icon } from 'antd';

// types
import { IRoom } from 'store/Rooms/types';

interface IProps {
  roomData: IRoom;
}

interface IState {
  isVisible: boolean;
}

class RoomInfo extends React.Component<IProps, IState> {
  state = {
    isVisible: false
  };

  handleModalVisibility = () => {
    this.setState(prevState => ({ isVisible: !prevState.isVisible }));
  };

  render() {
    const { roomName, description } = this.props.roomData;
    const { isVisible } = this.state;

    return (
      <div>
        <STRoomInfoBtn
          type="primary"
          shape="circle"
          size="small"
          icon="info"
          onClick={this.handleModalVisibility}
        />
        <Modal
          title="Room info"
          visible={isVisible}
          footer={[
            <Button
              key="ok"
              type="primary"
              onClick={this.handleModalVisibility}
            >
              Ok
            </Button>
          ]}
          onOk={this.handleModalVisibility}
          onCancel={this.handleModalVisibility}
        >
          <STRoomName>{roomName}</STRoomName>
          <STDescription>{description}</STDescription>
          <STMembersBox>
            <p>
              <STMembersIcon type="user" />
              <STBoldText>Members:</STBoldText>
            </p>
          </STMembersBox>
        </Modal>
      </div>
    );
  }
}

const STRoomInfoBtn = styled(Button)`
  margin-right: 8px;
  background-color: #4496d8 !important;
`;

const STRoomName = styled.p`
  font-weight: 600;
  font-size: 16px;
`;

const STDescription = styled.p`
  font-size: 14px;
`;

const STBoldText = styled.span`
  font-weight: 500;
`;

const STMembersBox = styled.div`
  margin-top: 15px;
`;

const STMembersIcon = styled(Icon)`
  font-size: 16px !important;
  margin-right: 4px;
`;

export default RoomInfo;
