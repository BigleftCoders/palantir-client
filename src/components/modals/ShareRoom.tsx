import * as React from 'react';
import styled from 'types/styled-components';
import { Modal, Button, Input } from 'antd';
import { AxiosResponse } from 'axios';

// api
import roomsApi from 'api/rooms';

// components
import { STActionButton } from 'components/common/styled';
import LoadingSpinner from 'components/common/LoadingSpinner';

interface IProps {
  roomId: number;
}

interface IState {
  isVisible: boolean;
  isLoadingLink: boolean;
  inviteLink: string;
}

interface IResponse {
  inviteKey: string;
}

class ShareRoom extends React.Component<IProps, IState> {
  state = {
    isVisible: false,
    isLoadingLink: false,
    inviteLink: ''
  };

  inputRef: HTMLInputElement | any = React.createRef();

  handleModalOpen = async () => {
    const { roomId } = this.props;
    this.setState({ isVisible: true });
    const response: AxiosResponse<IResponse> = await roomsApi.createInvite(
      roomId
    );
    const { inviteKey } = response.data;
    const inviteLink = `${
      process.env.REACT_APP_BASE_URL
    }/?inviteKey=${inviteKey}`;

    this.setState({ isLoadingLink: false, inviteLink }, this.handleLinkCopy);
  };

  handleModalClose = () => {
    this.setState({ isVisible: false });
  };

  handleLinkCopy = () => {
    this.inputRef.current.input.select();
    document.execCommand('Copy'); // TODO: copy on first render
  };

  render() {
    const { isVisible, isLoadingLink, inviteLink } = this.state;

    return (
      <STShareModalWrapp>
        <STActionButton
          type="primary"
          ghost
          icon="share-alt"
          onClick={this.handleModalOpen}
        />
        <Modal
          title="Share room"
          visible={isVisible}
          footer={[
            <Button key="ok" onClick={this.handleModalClose}>
              Close
            </Button>
          ]}
          onOk={this.handleModalClose}
          onCancel={this.handleModalClose}
        >
          <LoadingSpinner isLoading={isLoadingLink} alignOnCenter>
            <STShareHeader>Share this link to your friends</STShareHeader>
            <STLinkInputWrapp>
              <Input
                value={inviteLink}
                ref={this.inputRef}
                suffix={
                  <Button type="primary" onClick={this.handleLinkCopy}>
                    Copy
                  </Button>
                }
              />
            </STLinkInputWrapp>
          </LoadingSpinner>
        </Modal>
      </STShareModalWrapp>
    );
  }
}

const STShareHeader = styled.p`
  margin-bottom: 10px;
`;

const STShareModalWrapp = styled.div`
  .ant-btn {
    margin-right: 0 !important;
  }
`;

const STLinkInputWrapp = styled.div`
  width: 100%;

  .ant-input-affix-wrapper .ant-input-suffix {
    right: 0 !important;
    .ant-btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

export default ShareRoom;
