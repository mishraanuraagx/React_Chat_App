import React from 'react'
import { signInWithPopup, setPersistence, browserSessionPersistence, GoogleAuthProvider } from "firebase/auth";
import {auth} from '../firebase'

function SignIn() {
  const user = auth.currentUser;
    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        setPersistence(auth, browserSessionPersistence).then(() =>        
        signInWithPopup(auth, provider))
    }
  return (
        <div>
          <div onClick={signInWithGoogle}>Sign In With Google</div>
          
        </div>
    )
}

export default SignIn