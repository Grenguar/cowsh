import Rebase from 're-base'
import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDvkf8mAclgtHXWuYlJjpoTxE9DioFnzJU',
  authDomain: 'kidswishlist-9638d.firebaseapp.com',
  databaseURL: 'https://kidswishlist-9638d.firebaseio.com',
  projectId: 'kidswishlist-9638d',
  storageBucket: 'kidswishlist-9638d.appspot.com',
  messagingSenderId: '609530696299',
  appId: '1:609530696299:web:471bd856acb08c4f97d72e',
}

const firebaseApp = firebase.initializeApp(config)
const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base
