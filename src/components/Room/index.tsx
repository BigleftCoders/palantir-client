import * as React from 'react';
// import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';

// store
import { getRoomData } from 'store/Rooms/actions';

// types
import { IGlobalStore } from 'store/types';
import { IRoom } from 'store/Rooms/types';

interface IProps extends RouteComponentProps<any> {
  roomData: IRoom;
  getRoomData: (roomId: number) => any;
}

class Room extends React.Component<IProps, any> {
  state = {
    isLoadingRoomData: true
  };

  componentDidMount() {
    this.getRoomData();
  }

  getRoomData = async () => {
    const { getRoomData, match } = this.props;
    const { id } = match.params;
    await getRoomData(id);
    this.setState({ isLoadingRoomData: false });
  };

  render() {
    const { roomData } = this.props;
    const { isLoadingRoomData } = this.state;
    const { roomName, description } = roomData;

    return (
      <div>
        <LoadingSpinner isLoading={isLoadingRoomData} alignOnCenter>
          <p>{roomName}</p>
          <p>{description}</p>
        </LoadingSpinner>
      </div>
    );
  }
}

const mapStateToProps = ({ rooms }: IGlobalStore) => ({
  roomData: rooms.roomData
});

export default connect<any, any, any>(mapStateToProps, { getRoomData })(Room);
