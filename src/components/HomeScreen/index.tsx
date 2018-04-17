import * as React from 'react';
import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, Avatar } from 'antd';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';
import CreateRoom from 'components/modals/CreateRoom';
import { STActionButton } from 'components/common/styled';

// store
import { fetchRooms } from 'store/Rooms/actions';

// types
import { IRoom } from 'store/Rooms/types';
import { IGlobalStore } from 'store/types';

const chatLogo = require('../../static/images/chat.svg');

interface IProps extends RouteComponentProps<any> {
  rooms: IRoom[];
  fetchRooms: () => Promise<any>;
}

interface IState {
  isFetchingRooms: boolean;
}

class HomeScreen extends React.Component<IProps, IState> {
  state = {
    isFetchingRooms: true
  };

  componentDidMount() {
    this.getRooms();
  }

  getRooms = async () => {
    await this.props.fetchRooms();
    this.setState({ isFetchingRooms: false });
  };

  render() {
    const { rooms } = this.props;
    const { isFetchingRooms } = this.state;

    return (
      <div>
        <STRoomsActions>
          <STListDescrip>Joined rooms</STListDescrip>
          <STRoomsActionsWrap>
            <CreateRoom />
            <STActionButton type="primary" ghost icon="link" />
            <STActionButton type="primary" ghost icon="scan" />
          </STRoomsActionsWrap>
        </STRoomsActions>
        <LoadingSpinner isLoading={isFetchingRooms} alignOnCenter>
          <STListWrap>
            <List
              itemLayout="horizontal"
              dataSource={rooms}
              renderItem={({ roomName, description, roomId }: IRoom) => {
                const linkToRoom = `/room/${roomId}`;

                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <STRoomLink to={linkToRoom}>
                          <Avatar src={chatLogo} />
                        </STRoomLink>
                      }
                      title={<Link to={linkToRoom}>{roomName}</Link>}
                      description={
                        description && (
                          <STRoomLink to={linkToRoom}>{description}</STRoomLink>
                        )
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </STListWrap>
        </LoadingSpinner>
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

const STListWrap = styled.div`
  height: calc(100vh - 130px);
  overflow-y: auto;
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

const mapStateToProps = ({ rooms }: IGlobalStore) => ({
  rooms: rooms.roomsItems
});

export default connect<any, any, any>(mapStateToProps, { fetchRooms })(
  HomeScreen
);
