import * as React from 'react';
import styled from 'types/styled-components';
import { Spin } from 'antd';

// components
import UsersMap from './UsersMap';

// constants
import { GOOGLE_MAPS_LINK } from 'config/constants';

const MapContainer: React.SFC<any> = () => (
  <UsersMap
    googleMapURL={GOOGLE_MAPS_LINK}
    loadingElement={
      <STMapContainer>
        <Spin />
      </STMapContainer>
    }
    containerElement={<STMapContainer />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);

const STMapContainer = styled.div`
  position: relative;
  height: 400px;
  margin-bottom: 50px;
`;

export default MapContainer;
