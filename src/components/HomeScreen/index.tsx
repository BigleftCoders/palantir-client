import * as React from 'react';
import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, List, Avatar, Modal, Form, Input } from 'antd';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';

// store
import { fetchRooms } from 'store/Rooms/actions';
import { IRoomsState, IRoom } from 'store/Rooms/types';

interface IProps extends RouteComponentProps<any> {
  rooms: IRoom[];
  form: any;
  fetchRooms: () => Promise<any>;
}

class HomeScreen extends React.Component<IProps, any> {
  state = {
    isFetchingRooms: true,
    isCreateModalVisible: false,
    isSavingRoom: false
  };

  componentDidMount() {
    this.getRooms();
  }

  getRooms = async () => {
    await this.props.fetchRooms();
    this.setState({ isFetchingRooms: false });
  };

  handleCreateModalShow = () => {
    this.setState({ isCreateModalVisible: true });
  };

  handleCreateModalHide = () => {
    this.setState({ isCreateModalVisible: false });
  };

  render() {
    const { rooms, form } = this.props;
    const { getFieldDecorator } = form;
    const { isFetchingRooms, isCreateModalVisible, isSavingRoom } = this.state;
    const buttonStyles = { borderStyle: 'dashed', fontSize: '18px', marginRight: '15px' };

    return (
      <div>
        <STRoomsActions>
          <STListDescrip>Joined rooms</STListDescrip>
          <STRoomsActionsWrap>
            <Button
              type="primary"
              ghost
              icon="plus"
              style={buttonStyles}
              onClick={this.handleCreateModalShow}
            />
            <Button type="primary" ghost icon="link" style={buttonStyles} />
            <Button type="primary" ghost icon="scan" style={buttonStyles} />
          </STRoomsActionsWrap>
        </STRoomsActions>
        <LoadingSpinner isLoading={isFetchingRooms} alignOnCenter>
          <List
            itemLayout="horizontal"
            dataSource={rooms}
            renderItem={({ roomName, description }: IRoom) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <STRoomLink to="/">
                      <Avatar src="https://svgshare.com/i/66t.svg" />
                    </STRoomLink>
                  }
                  title={<Link to="/">{roomName}</Link>}
                  description={<STRoomLink to="/">{description}</STRoomLink>}
                />
              </List.Item>
            )}
          />
        </LoadingSpinner>

        <Modal
          title="Create room"
          visible={isCreateModalVisible}
          onOk={this.handleCreateModalHide}
          confirmLoading={isSavingRoom}
          onCancel={this.handleCreateModalHide}
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

const STRoomsActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const STRoomsActionsWrap = styled.div`
  display: flex;
  flex-direction: row;
  > button:last-child {
    margin-right: 0;
  }
`;

const STListDescrip = styled.h4`
  padding-left: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #4496d8;
`;

const STRoomLink = styled(Link)`
  text-decoration: none;
  color: #9e9e9e;
`;

const mapStateToProps = ({ rooms }: IRoomsState) => ({ rooms });

export default connect<any, any, any>(mapStateToProps, { fetchRooms })(
  Form.create()<any>(HomeScreen)
);
