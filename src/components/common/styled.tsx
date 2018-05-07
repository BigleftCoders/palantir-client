import styled from 'types/styled-components';
import { Button } from 'antd';
import { css } from 'styled-components';

// constants
import { MEDIA_SIZES } from 'config/constants';

export const media: any = Object.keys(MEDIA_SIZES).reduce((acc, label) => {
  acc[label] = (strings: TemplateStringsArray, ...interpolations: any[]) => css`
    @media (max-width: ${MEDIA_SIZES[label]}) {
      ${css(strings, ...interpolations)};
    }
  `;

  return acc;
}, {});

export const STRoomsActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ hasBottomMargin }: any) =>
    hasBottomMargin ? '25px' : '10px'};

  ${media.mobile`
    margin-bottom: ${({ hasBottomMargin }: any) =>
      hasBottomMargin ? '15px' : '0'};
  `};
` as any;

export const STRoomsActionsWrap = styled.div`
  display: flex;
  flex-direction: row;
  > button:last-child {
    margin-right: 0;
  }

  ${media.mobile`
    padding-right: 20px;
  `};
`;

export const STActionButton = styled(Button)`
  border-style: dashed !important;
  font-size: 18px !important;
  margin-right: 15px;
`;

export const STUserNameTitle = styled.span`
  color: ${({ userColor }: any) => userColor};
  font-weight: 600;
` as any;
