import * as React from 'react';
import styled from 'types/styled-components';
import { Spin } from 'antd';

export interface ILoadingSpinnerProps {
  isLoading: boolean;
  spinnerSize?: 'default' | 'small' | 'large' | undefined;
  alignOnCenter?: boolean;
  children?: any;
}

const LoadingSpinner: React.SFC<ILoadingSpinnerProps> = ({
  isLoading,
  spinnerSize = 'default',
  alignOnCenter,
  children
}) => {
  if (isLoading) {
    return (
      <STSpinnerWrap alignOnCenter={alignOnCenter}>
        <Spin size={spinnerSize} />
      </STSpinnerWrap>
    );
  }

  return children;
};

const STSpinnerWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ alignOnCenter }: any) => (alignOnCenter ? 'center' : 'flex-start')};
` as any;

export default LoadingSpinner;
