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

function mapStateToProps(state, ownProps) { 
  const { address } = ownProps
  return {
    collection: selectCollection(address)(state)
  }
}

export default connect(mapStateToProps)(CollectionPage);
