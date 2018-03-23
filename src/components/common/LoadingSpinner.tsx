import * as React from 'react';
import { Spin } from 'antd';

export interface ILoadingSpinnerProps {
  isLoading: boolean;
  spinnerSize?: 'default' | 'small' | 'large' | undefined;
  children?: any;
}

const LoadingSpinner: React.SFC<ILoadingSpinnerProps> = ({
  isLoading,
  spinnerSize = 'default',
  children
}) => {
  if (isLoading) {
    return <Spin size={spinnerSize} />;
  }

  return children;
};

export default LoadingSpinner;
