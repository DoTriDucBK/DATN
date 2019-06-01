import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import './NotifyAlert.css'
import React from 'react'
const NotifyAlert = (title, message ) =>{confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: 'OK',
        onClick: () => {
            
        }
      }
    ],
    closeOnEscape: true,
  closeOnClickOutside: true,
  timeOut:5000
  })
}
export default NotifyAlert;