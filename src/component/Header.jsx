import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Tooltip } from '@mui/material'
import React from 'react'
import { auth } from '../firebase';

function Header({ userDetails, homePage }) {
    function SignOut() {
        auth.signOut().then(()=> homePage())
    }
  return (
      <div>
          <div className='is-sticky header'>
              {userDetails.displayName} |
              <Tooltip title="Sign Out"><Button onClick={SignOut}><LogoutIcon/></Button></Tooltip>
          </div>
      </div>
  )
}

export default Header