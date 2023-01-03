import React from "react";
import { connect } from "react-redux";
import { matchPath } from "react-router-dom";

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from "../../redux/shop/shop.selectors";

import './collection.styles.scss';

// eslint-disable-next-line no-restricted-globals
const match = matchPath({ path: "/shop/:categoryId" }, `${location.pathname}`);

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;

  return (
    <div className="collection-page">
      <h2 className="title">{ title }</h2>
      <div className="items">
        {
          match.params.categoryId === collection.routeName
          ?  items.map(item => <CollectionItem key={item.id} item={item} />)
          :  window.location.reload()
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps = match.params.categoryId) => ({
  collection: selectCollection(ownProps)(state)
})

export default connect(mapStateToProps)(CollectionPage);
