import './App.css';
import SignIn from './component/SignIn';
import Chat from './component/Chat';
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

function App() {
  // comment2
  const [user, setUser] = useState(auth.currentUser)
  // onAuthStateChanged(auth, (user)=> { 
  //   setUser(auth.currentUser)
  // })
  function updateUser() {
    setUser(auth.currentUser)
  }
  if (user) { console.log(user.displayName) }
  return (
    <div className="App">
      {user ? <Chat user={user} signout={ updateUser} /> : <SignIn updateHomePage={updateUser} />}
      
    </div>
  );
}

export default App;
