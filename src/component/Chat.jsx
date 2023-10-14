import React from 'react'
import { auth } from '../firebase'

function Chat() {
    const user = auth.currentUser;
    var username = user.displayName;
    var email = user.email
    var photourl = user.photoURL
    var userid = user.uid
    
  return (
      <>
        <div>Welcome, { username}</div>
        <div>Sign out</div>
      </>
  )
}

export default Chat