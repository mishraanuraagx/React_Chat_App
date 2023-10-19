import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import { Button, Input } from '@mui/material';

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
        <form onSubmit={SendMessage}>
            <div className="sendMsg">
                  <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type='text' onChange={e => setMsg(e.target.value)} value={msg} />
                <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type='submit'>Send</Button>
            </div>
        </form>
    </div>
  )
}

export default SendMessage