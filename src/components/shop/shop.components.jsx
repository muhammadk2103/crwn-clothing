import React from "react";
import { matchPath, useLocation, Route, Routes } from "react-router-dom";

import CollectiondOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from "../../pages/collection/collection.component";

const ShopPage = () => {
    const { pathname } = useLocation();
    const address = matchPath( { path: "/shop/:collectionId" }, `${pathname}`);

    return (
        <div className="shop-page">
            <Routes>{
                address
                ? (<Route path={`${address.params.collectionId}`} element={<CollectionPage address={address.params.collectionId} />} />)
                : (<Route path="/" element={<CollectiondOverview />} />)
            }</Routes>
        </div>
    );

};

export default ShopPage;