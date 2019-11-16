import Rebase from 're-base'
import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBWcBybsR59VjbwqbPx0p75gYImb5429Tk',
  authDomain: 'wishwalt.firebaseapp.com',
  databaseURL: 'https://wishwalt.firebaseio.com',
  projectId: 'wishwalt',
  storageBucket: 'wishwalt.appspot.com',
  messagingSenderId: '690037218768',
  appId: '1:690037218768:web:c30eb7e62ce28ffc03edd5',
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base
