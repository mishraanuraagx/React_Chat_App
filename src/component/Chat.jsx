import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import {Button} from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'
import { doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

function Chat({ user, signout }) {
    const [messages, setMessages] = useState([])
    const colletionRef = collection(db, 'messages');
    useEffect(() => {
        // const q = query(
        //     colletionRef,
        //     where('ReceiverID', '==', ""),
        // );
      
        const unsub = onSnapshot(colletionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setMessages(items);
        });
        return () => {
            unsub();
        };

        // eslint-disable-next-line
    }, []);


    function SignOut() {
        auth.signOut().then(() => { signout()})
    }
    var username, email, photoURL, userid
    if (user) {
        username = user.displayName;
        email = user.email
        photoURL = user.photoURL
        userid = user.uid
    }
    
  return (
      <>
          <div>Welcome, {username}</div>
          <div>Messages</div>
          {messages.map((message) => (
              <div>
                  <div>{message.text}</div>
              </div>
          ))}
          <div></div>
          <Button onClick={SignOut}>Sign out</Button>
      </>
  )
}

export default Chat