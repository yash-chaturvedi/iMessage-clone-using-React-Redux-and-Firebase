import React from 'react';
import './App.css';
import { login, logout, selectUser } from './features/userSlice';
import {useDispatch, useSelector} from 'react-redux'
import Imessage from './Imessage';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged( authUser => {
      if(authUser){
        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          email:authUser.email,
          displayName:authUser.displayName,
        }));
      }
      else{
        dispatch(logout())
      }
    })
  },[dispatch])

  return (
    <div className="app">
      {user ? <Imessage/> : <Login/>}
    </div>
  );
}

export default App;

