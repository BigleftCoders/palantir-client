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
      <STMapWrapp>
        <Spin />
      </STMapWrapp>
    }
    containerElement={<STMapContainer />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);

const STMapWrapp = styled.div`
  height: 100%;
`;

const STMapContainer = styled.div`
  height: 400px;
`;

export default MapContainer;
