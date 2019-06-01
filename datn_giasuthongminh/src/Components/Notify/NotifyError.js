import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import './NotifyAlert.css'
import React from 'react'


const NotifyError = (title, message ) =>{confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: 'OK',
        onClick: () => {
            
        }
      }
    ]
  })
}
export default NotifyError;