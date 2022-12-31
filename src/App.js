import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { onSnapshot} from 'firebase/firestore';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './components/shop/shop.components';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, creaeteUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component{

  unSubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await creaeteUserProfileDocument(userAuth);
        onSnapshot(userRef, (snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } 
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth(); 
  }
  
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/checkout' element={<CheckoutPage />} /> 
          <Route path="/signin" element={
              this.props.currentUser 
                ? <Navigate to="/"/> 
                : <SignInAndSignUpPage/>
          }/>
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
