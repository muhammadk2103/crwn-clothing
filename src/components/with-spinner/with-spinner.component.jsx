import React from "react";

import {
  SpinnerContainer, 
  SpinnerOverlay
} from './with-spinner.styles';

import { useLocation, matchPath } from 'react-router-dom';

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let { pathname } = useLocation();
    let match = matchPath( { path: "/shop/:collectionId" }, `${pathname}`);
    
    return (
      <Component
        {...props}
        pathname={pathname}
        match={match}
      />
    );
  }

  return ComponentWithRouterProp;
}

const WithSpinner = (WrappedComponent) => 
  ({ isLoading, ...otherProps }) => {
    return isLoading
      ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
      ) : (
      <WrappedComponent {...otherProps} />
      )
};

export default WithSpinner;