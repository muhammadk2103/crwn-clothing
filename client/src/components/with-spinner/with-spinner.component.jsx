import React from "react";

import Spinner from "../spinner/spinner.component";

import { useLocation, matchPath, useParams } from 'react-router-dom';

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams();
    let { pathname } = useLocation();
    let match = matchPath( { path: "/shop/:collectionId" }, `${pathname}`);
    
    return (
      <Component
        {...props}
        pathname={pathname}
        match={match}
        params={params}
      />
    );
  }

  return ComponentWithRouterProp;
}

const WithSpinner = (WrappedComponent) => 
  ({ isLoading, ...otherProps }) => {
    return isLoading
      ? (
      <Spinner/>
      ) : (
      <WrappedComponent {...otherProps} />
      )
};

export default WithSpinner;