import * as React from 'react';
import { Button, Modal, Form, Input } from 'antd';

interface IProps {
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

  render() {
    const { isVisible, isSavingRoom } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Button
          type="primary"
          ghost
          icon="plus"
          style={{ borderStyle: 'dashed', fontSize: '18px', marginRight: '15px' }}
          onClick={this.handleCreateModalVisibility}
        />
        <Modal
          title="Create room"
          visible={isVisible}
          onOk={this.handleCreateModalVisibility}
          confirmLoading={isSavingRoom}
          onCancel={this.handleCreateModalVisibility}
        >
          <Form /*onSubmit={this.handleSubmit}*/>
            <Form.Item label="Title" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
              {getFieldDecorator('Title', {
                rules: [{ required: true, message: 'Please input room title' }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
              {getFieldDecorator('Description', {})(<Input.TextArea autosize={true} />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(CreateRoom);
