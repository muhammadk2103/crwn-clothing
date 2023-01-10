import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { 
    matchPath, 
    useLocation, 
    Route, 
    Routes 
} from "react-router-dom";

import CollectiondOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from "../../pages/collection/collection.component";

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { collection, getDocs } from "firebase/firestore";
import { updateCollections } from "../../redux/shop/shop.actions";

const CollectiondOverviewWithSpinner = WithSpinner(CollectiondOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ updateCollections }) => {
    const { pathname } = useLocation();
    const address = matchPath( { path: "/shop/:collectionId" }, `${pathname}`);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const collectionRef = collection(firestore, 'collections');
        
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-e6549/databases/(default)/documents/collections')
        //     .then(response => response.json())
        //     .then(collections => console.log(collections))
        
        getDocs(collectionRef)
            .then(snapShot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
                updateCollections(collectionsMap);
                setLoading(false);
            })

        // onSnapshot(collectionRef, async snapShot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
        //     updateCollections(collectionsMap);
        //     setLoading(false);
        // });

    }, [updateCollections]);

    
    return (
        <div className="shop-page">
            <Routes>{
                address
                ? (<Route path={`${address.params.collectionId}`} element={<CollectionPageWithSpinner address={address.params.collectionId} isLoading={loading} />} />)
                : (<Route path="/" element={<CollectiondOverviewWithSpinner isLoading={loading} />} />)
            }</Routes>
        </div>
    );

};

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => 
        dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);