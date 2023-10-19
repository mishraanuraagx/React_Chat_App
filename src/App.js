import './App.css';
import SignIn from './component/SignIn';
import Chat from './component/Chat';
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import Header from './component/Header';

function App() {
  // comment2
  const [user, setUser] = useState(auth.currentUser)
  // Keep a check if the current user is already logged in then on refresh auth.currentUser gets first reset. OnAuthStateChanged will make sure to check it again once after auth.currentUser is set back again by firebase.
  onAuthStateChanged(auth, (user)=> { 
    setUser(auth.currentUser)
  })
  function updateUser() {
    setUser(auth.currentUser)
  }

  function SignOut() {
    auth.signOut().then(() => {setUser() })
  }


  if (user) { console.log(user.displayName) }
  return (
    <div className='app'>
      {user ? <div> <Header userDetails={user} SingOut={SignOut} /> <Chat user={user} signout={ updateUser} /> </div> : <SignIn updateHomePage={updateUser} />}
      
    </div>
  );
}

export default App;
