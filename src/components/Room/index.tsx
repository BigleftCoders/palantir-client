import * as React from 'react';
import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Collapse } from 'antd';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';
import RoomInfo from 'components/modals/RoomInfo';
import {
  STRoomsActions,
  STRoomsActionsWrap,
  STActionButton
} from 'components/common/styled';
import MapContainer from './MapContainer';
import Chat from './Chat';

// store
import { getRoomData } from 'store/Rooms/actions';

// types
import { IGlobalStore } from 'store/types';
import { IRoom } from 'store/Rooms/types';
import { IUserData } from 'store/Auth/types';

interface IProps extends RouteComponentProps<any> {
  roomData: IRoom;
  userData: IUserData;
  getRoomData: (roomId: number) => any;
}

interface IState {
  isLoadingRoomData: boolean;
}

class Room extends React.Component<IProps, IState> {
  state = {
    isLoadingRoomData: true
  };

  componentDidMount() {
    this.getRoomData();
  }

  getRoomData = async () => {
    try {
      const { getRoomData, match } = this.props;
      const { id } = match.params;
      await getRoomData(id);
      console.log(this.props.roomData);
      this.setState({ isLoadingRoomData: false });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { roomData, userData } = this.props;
    const { isLoadingRoomData } = this.state;
    const { roomName, roomId } = roomData;
    const { userId } = userData;

    return (
      <LoadingSpinner isLoading={isLoadingRoomData} alignOnCenter>
        <STRoomsActions>
          <STTitleWrapp>
            <RoomInfo roomData={roomData} />
            <STRoomTitle>{roomName}</STRoomTitle>
          </STTitleWrapp>
          <STRoomsActionsWrap>
            <STActionButton type="primary" ghost icon="share-alt" />
          </STRoomsActionsWrap>
        </STRoomsActions>

        <STFlexer>
          <STCollapserWrapp>
            <Collapse bordered={false} defaultActiveKey={['1']}>
              <Collapse.Panel header="Map" key="1">
                <MapContainer />
              </Collapse.Panel>
            </Collapse>
          </STCollapserWrapp>

          <Chat roomId={roomId} userId={userId} />
        </STFlexer>
      </LoadingSpinner>
    );
  }
}

const STTitleWrapp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const STRoomTitle = styled.h2`
  max-width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 600;
  color: #212121;
`;

const STFlexer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100vh - 115px);
`;

const STCollapserWrapp = styled.div`
  margin-bottom: 30px;

  .ant-collapse-header {
    padding-left: 33px !important;
    .arrow {
      left: 6px !important;
    }
  }
  .ant-collapse-content {
    padding: 0 !important;
    border-radius: 0 !important;
    .ant-collapse-content-box {
      padding: 0 !important;
    }
  }
`;

const mapStateToProps = ({ rooms, auth }: IGlobalStore) => ({
  roomData: rooms.roomData,
  userData: auth.userData
});

export default connect<any, any, any>(mapStateToProps, { getRoomData })(Room);
