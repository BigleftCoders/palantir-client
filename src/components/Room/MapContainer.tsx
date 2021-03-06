import * as React from 'react';
import styled from 'types/styled-components';
import { Spin } from 'antd';

// components
import UsersMap from './UsersMap';

// utils
import { media } from 'components/common/styled';

// constants
import { GOOGLE_MAPS_LINK } from 'config/constants';

interface IProps {
  socketInstance: SocketIOClient.Socket | null;
}

const MapContainer: React.StatelessComponent<IProps> = (props: IProps) => (
  <UsersMap
    socketInstance={props.socketInstance}
    googleMapURL={GOOGLE_MAPS_LINK}
    loadingElement={
      <STMapContainer>
        <STMapSpinnerWrapp>
          <Spin size="large" />
        </STMapSpinnerWrapp>
      </STMapContainer>
    }
    containerElement={<STMapContainer />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);

const STMapSpinnerWrapp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const STMapContainer = styled.div`
  position: relative;
  height: 400px;

  ${media.mobile`
    height: 280px;
  `};
`;

export default MapContainer;
