import React, { useEffect, useRef, useState } from 'react'
import { auth, db } from '../firebase'
import {Button} from '@mui/material'
import {onSnapshot, collection, query, orderBy ,} from 'firebase/firestore'
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
      
        const unsub = onSnapshot(query(colletionRef, orderBy("createdAt")), (querySnapshot) => {
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
    let username
    // var email, photoURL, userid
    if (user) {
        username = user.displayName;
        // email = user.email
        // photoURL = user.photoURL
        // userid = user.uid
    }
    
  return (
      <>
          {/* <div>Welcome, {username}</div>
          <Button onClick={SignOut}>Sign out</Button> */}
          <div className="msgs">
          {messages.map((message) => (
              <div key={message.id}>
                  <div key={message.id} className={`msg ${message.senderId === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img src={message.photoURL} alt="" />
                      <p style={{ align: 'right' }}>{message.text}</p>
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