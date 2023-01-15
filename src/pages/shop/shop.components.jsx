import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const ShopPage = ({ match, fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);
  
  return (
    <div className="shop-page">
      <Routes>
        {
          match
          ? (<Route 
            path={`${match.params.collectionId}`} 
            element={<CollectionPageContainer
            address={match.params.collectionId} />} 
          />)

          : (<Route 
            path="/" 
            element={<CollectionsOverviewContainer/>} 
          />)
        }
      </Routes>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);