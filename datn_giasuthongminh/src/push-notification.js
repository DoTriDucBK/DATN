import firebase from 'firebase';
import { reactLocalStorage } from 'reactjs-localstorage';
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "685472279954"
  });
  const messaging = firebase.messaging();
  messaging.onMessage(function(payload) {
      alert(payload.notification.body)
  });
  askForPermissioToReceiveNotifications(messaging)
}
export const askForPermissioToReceiveNotifications = async (messaging) => {
  try {
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token do usuário:', token);
    reactLocalStorage.set("tokenFirebase", token)
    return token;
  } catch (error) {
    console.error(error);
  }
}