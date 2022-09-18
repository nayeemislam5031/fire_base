
import './App.css';

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";

import firebaseConfig from './fairBaseConfig';
import { useState } from 'react';

const app = initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState({ 
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  })


  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleSign = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const {displayName,photoURL,email} = result.user;
    const signInUser ={
      isSignIn: true,
      name: displayName,
      email: email,
      photo: photoURL
    };
    setUser(signInUser);

    console.log({displayName,photoURL,email});
    
    
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  }


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        const signOutUser = {
          isSignIn: false,
          name:'',
          photo: '',
          email:''
        }
        setUser(signOutUser);
      })

      .catch((error) => {
        // An error happened.
      });
  }

  
  return (
    <div className="App">
      <h1>React app Firebase Authoraization</h1>

      {
        user.isSignIn ?<button onClick={handleSignOut}>Sign Out</button>:
        <button onClick={handleSign}>Sign In</button>
      }

      {user.isSignIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your mail: {user.email} </p>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
