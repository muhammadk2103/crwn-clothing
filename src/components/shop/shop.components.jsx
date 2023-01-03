import React from "react";
import { matchPath, useRoutes } from "react-router-dom";

import CollectiondOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from "../../pages/collection/collection.component";

const ShopPage = () => {
    // eslint-disable-next-line no-restricted-globals
    const match = matchPath({ path: "/shop/:categoryId" }, `${location.pathname}`);
    
    let element = useRoutes([
        {path: `${match ? match.params.categoryId : `/nothing`}`, element: <CollectionPage />},
        {path: `/`, element: <CollectiondOverview />}
    ]);

    console.log(match);
    return (
        <div className="shop-page">
            {element}
        </div>
    )

};

export default ShopPage;