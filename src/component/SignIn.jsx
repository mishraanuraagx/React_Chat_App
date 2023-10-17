import React from 'react'
import { signInWithPopup, setPersistence, browserSessionPersistence, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase'
import {Button} from '@mui/material'

function SignIn({ updateHomePage}) {
  const user = auth.currentUser;
    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        setPersistence(auth, browserSessionPersistence).then(() =>        
            signInWithPopup(auth, provider)).then(() => {updateHomePage()}
            )
            
    }
  return (
        <>
          <Button onClick={signInWithGoogle}>Sign In With Google</Button>
          
        </>
    )
}

export default SignIn