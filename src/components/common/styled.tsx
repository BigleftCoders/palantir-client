import styled from 'types/styled-components';
import { Button } from 'antd';

export const STRoomsActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const STRoomsActionsWrap = styled.div`
  display: flex;
  flex-direction: row;
  > button:last-child {
    margin-right: 0;
  }
`;

export const STActionButton = styled(Button)`
  border-style: dashed !important;
  font-size: 18px !important;
  margin-right: 15px;
`;
