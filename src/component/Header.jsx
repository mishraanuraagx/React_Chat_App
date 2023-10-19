import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Tooltip } from '@mui/material'
import React from 'react'

function Header({ userDetails, SignOut}) {
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