import React from "react";
import { connect } from "react-redux";

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from "../../redux/shop/shop.selectors";

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer
} from './collection.styles';

const CollectionPage = ({ collection }) => {
  // useEffect(() => {
  //   console.log('I am subscribing');
  //   const collectionRef = collection(firestore, 'collections')
  //   const unsubscribeFromCollections = onSnapshot(
  //     collectionRef, 
  //     snapShot => console.log(snapShot)
  //   );
    
  //   return () => { 
  //     console.log('I am unsubscribing');
  //     unsubscribeFromCollections();
  //   }
  // }, []);

  const { title, items } = collection;

  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

function mapStateToProps(state, { address }) {
  return {
    collection: selectCollection(address)(state)
  }
}

export default connect(mapStateToProps)(CollectionPage);
