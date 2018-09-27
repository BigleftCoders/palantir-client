import * as React from 'react';
import styled from 'types/styled-components';
import { connect } from 'react-redux';

// components
import AppHeader from 'components/AppHeader';
import LoadingSpinner from 'components/common/LoadingSpinner';

// types
import { IGlobalStore } from 'store/types';

// utils
import { media } from 'components/common/styled';

interface IProps {
  isUserLoaded: boolean;
  children?: any;
}

class AppLayout extends React.Component<IProps, any> {
  render() {
    const { children, isUserLoaded } = this.props;

    if (!isUserLoaded) {
      return (
        <STCenterer>
          <LoadingSpinner isLoading spinnerSize="large" alignOnCenter />
        </STCenterer>
      );
    }

    return (
      <STAppWrapper>
        <AppHeader />
        {children}
      </STAppWrapper>
    );
  }
}

const STAppWrapper = styled.div`
  position: relative;
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;

  ${media.mobile`
    width: 100%;
  `};
`;

const STCenterer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const mapStateToProps = ({ auth }: IGlobalStore) => ({
  isUserLoaded: auth.isUserLoaded
});

export default connect<any, any, any>(mapStateToProps, null)(AppLayout);
