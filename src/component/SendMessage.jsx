import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import { Button, Input } from '@mui/base';

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')
    function SendMessage(e) {
        e.preventDefault()
        const { uid, photoURL } = auth.currentUser
        const colletionRef = collection(db, 'messages');

        const newMessage = {
            id: uuidv4(),
            photoURL: photoURL,
            text: msg,
            senderId: uid,
            createdAt: serverTimestamp(),
            lastUpdate: serverTimestamp(),
            receiverId: ''
        };

        try {
            const messageRef = doc(colletionRef, newMessage.id);
            setDoc(messageRef, newMessage);
        } catch (error) {
            console.error(error);
        }
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
        
    }

  return (
      <div>
          <div className="sendMsg">
              <form onSubmit={SendMessage}>
                  <Input className="sendMessageInput" onChange={e => setMsg(e.target.value)} value={msg}/>
                  <Button className="sendMessageButton" type='submit'>Send</Button>
              </form>
      </div>
    </div>
  )
}

export default SendMessage