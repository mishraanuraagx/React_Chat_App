import React, { useEffect, useRef, useState } from 'react'
import { auth, db } from '../firebase'
import {Button, Card, Input} from '@mui/material'
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
import SendMessage from './SendMessage'

function Chat({ user, signout }) {
    const scroll = useRef()
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
          <Button onClick={SignOut}>Sign out</Button>
          <div className="msgs">
          {messages.map((message) => (
              <div>
                  <div key={message.id} className={`msg ${message.senderId === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img src={message.photoURL} alt="" />
                            <p>{message.text}</p>
                        </div>
              </div>
          ))}
            </div>
          <div></div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
      </>
  )
}

export default Chat