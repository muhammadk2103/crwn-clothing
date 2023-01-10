import ShopActionType from "./shop.types";
// import { selectCollections } from "./shop.selectors";

const INITIAL_STATE = {
  collections: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionType.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      }
    default: 
      return state;
  }
};

export default shopReducer;