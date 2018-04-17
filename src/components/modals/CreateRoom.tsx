import * as React from 'react';
import styled from 'types/styled-components';
import { Modal, Form, Input } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';

// components
import { STActionButton } from 'components/common/styled';

// api
import Rooms from 'api/rooms';

interface IProps extends RouteComponentProps<any> {
  form: any;
}

interface IState {
  isVisible: boolean;
  isSavingRoom: boolean;
}

class CreateRoom extends React.Component<IProps, IState> {
  state = {
    isSavingRoom: false,
    isVisible: false
  };

  handleCreateModalVisibility = () => {
    this.setState(prevState => ({ isVisible: !prevState.isVisible }));
  };

  handleRoomCreate = () => {
    const { form, history } = this.props;

    form.validateFields(async (err: any, values: any) => {
      if (err) return;

      this.setState({ isSavingRoom: true });
      const { title, description } = form.getFieldsValue();

      try {
        const response: any = await Rooms.createRoom({
          roomName: title,
          description
        });
        const { roomId } = response.data;
        history.push(`/room/${roomId}`);
      } catch (error) {
        throw error;
      }
    });
  };

  render() {
    const { isVisible, isSavingRoom } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <STActionButton
          type="primary"
          ghost
          icon="plus"
          onClick={this.handleCreateModalVisibility}
        />
        <Modal
          title="Create room"
          visible={isVisible}
          onOk={this.handleRoomCreate}
          confirmLoading={isSavingRoom}
          onCancel={this.handleCreateModalVisibility}
        >
          <STFormWrap>
            <Form layout="vertical">
              <Form.Item label="Title">
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      max: 100,
                      message: 'Please input room title (max 100 characters)'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                  rules: [
                    {
                      max: 1000,
                      message: 'Max 1000 characters'
                    }
                  ]
                })(<Input.TextArea autosize={{ minRows: 3 }} />)}
              </Form.Item>
            </Form>
          </STFormWrap>
        </Modal>
      </div>
    );
  }
}

const STFormWrap = styled.div`
  .ant-form-item:last-child {
    margin-bottom: 0;
  }
`;
export default Form.create()(withRouter(CreateRoom));
